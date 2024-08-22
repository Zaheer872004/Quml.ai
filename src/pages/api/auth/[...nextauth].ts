import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";

import CredentialsProvider from "next-auth/providers/credentials";



import bcrypt from 'bcryptjs'
import dbConnect from '../../../helpers/dbConnect';
import { UserModel } from "../../../models/User";
import { JWT as NextAuthJWT} from "next-auth/jwt";
import { Session as NextAuthSession } from 'next-auth';
import { Role } from '../../../types/next-auth'


// User schema or type 
interface User {
    _id?: string;
    isVerified?: boolean;
    name?: string;
    role?: Role;
    email?: string;
  }


const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id : "credentials",
            name : "Credentials",

            credentials : {
                email : {
                    label : "Email",
                    type : "text",
                    placeholder :"Mohammad Zaheer"
                },
                password : {
                    label : "Password",
                    type : "password",
                    placeholder : "******"
                },
                // here you can add the role also.
            },
            async authorize(credentials : any): Promise<any>{
                // firstly connect to the db
                await dbConnect()
                


                try {

                    // const { username,email,password} = credentials

                    const user = await UserModel.findOne({
                        $or : [
                            {email : credentials.identifier},
                            {username : credentials.identifier}
                        ] 
                    })

                    if(!user){
                        throw new Error("No user found with this email | username")
                    }

                    if(!user.isVerified){
                        throw new Error("please verify your account before login")
                    
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);

                    if(isPasswordCorrect){
                        // if all thing okay, return the user successfully login
                        return user;

                    }
                    else{

                        throw new Error('Incorrect password')
                    }

                } catch (error : any) {
                    
                    throw new Error(`login server error ${error}`);
                }
            }
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID as string,
        //     clientSecret: process.env.GOOGLE_SECRET as string
        // }),
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string
        // }),
        // LinkedInProvider({
        //     clientId: process.env.LINKEDIN_CLIENT_ID as string,
        //     clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string
        // }),

    ],

    callbacks: {
        
        async jwt({ token, user  } : {token: NextAuthJWT; user?: User}) {
            if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.name = user.name
                token.role = user.role
                token.email = user.email;
            }

          return token
        },
        async session({ session , token }:{session: NextAuthSession; token?: NextAuthJWT}) {
            if(token){

            session.user._id = token._id as string | undefined;
            session.user.name = token.name as string | undefined;
            session.user.isVerified = token.isVerified as boolean | undefined;
            session.user.role = token.role as Role | undefined;
            session.user.email = token.email as string | undefined;

            }
          
          
            return session
        },

    },

    pages : {
        signIn : '/sign-in'
    },
    session : {
        strategy : "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET
}


const handler = NextAuth(authOptions);


export { 
    handler as GET, 
    handler as POST
}
























// providers: [
//     LinkedInProvider({
//       clientId: process.env.LINKEDIN_CLIENT_ID,
//       clientSecret: process.env.LINKEDIN_CLIENT_SECRET
//     })
// ]

// providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET
//     })
//   ]




