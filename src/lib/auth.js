import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import LinkedInProvider from 'next-auth/providers/linkedin';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    // Credentials Provider
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error('No user found with this email');
          }

          // Validate password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error('Incorrect password');
          }

          return user;
        } catch (err) {
          throw new Error(err.message);
        }
      },
    }),

    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // GitHub Provider
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // LinkedIn Provider
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Attach additional properties to the JWT token
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role; // Attach user role to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Attach token properties to the session object
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role; // Attach role to the session
      }
      return session;
    },
    async signIn({ user, account }) {
        if (account.provider === 'google' || account.provider === 'github' || account.provider === 'linkedin') {
          let userInDb = await prisma.user.findUnique({
            where: { email: user.email },
          });
  
          if (userInDb) {
            if (userInDb.role === 'RECRUITER') {
              // Redirect to sign-up page if the user is a recruiter but not found in DB
              return '/sign-up'; // Redirect URL
            }
          } else {
            // Automatically create a default student role if the user does not exist
            userInDb = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                role: 'STUDENT', // Default role for OAuth users
              },
            });
          }
  
          user.role = userInDb.role;
          user.save();
        }
        return true;
      },
    
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    error: '/auth/error'
  },
};
