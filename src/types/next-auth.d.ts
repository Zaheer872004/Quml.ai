import 'next-auth';
import { DefaultSession } from 'next-auth';

export enum Role {
  RECRUITER = "RECRUITER",
  STUDENT = "STUDENT",
}

declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        name?: string;
        role?: Role;
        email?: string;
    }

    interface Session {
        user: {
            _id?: string;
            isVerified?: boolean;
            name?: string;
            role?: Role;
            email?: string;
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        name?: string;
        role?: Role;
        email?: string;
    }
}





















declare module '@react-email/components' {
    import * as React from 'react';
  
    export const Html: React.FC<{ children?: React.ReactNode }>;
    export const Body: React.FC<{ children?: React.ReactNode; className?: string }>;
    export const Button: React.FC<{ children?: React.ReactNode; className?: string; href?: string }>;
    export const Column: React.FC<{ children?: React.ReactNode; className?: string }>;
    export const Container: React.FC<{ children?: React.ReactNode; className?: string }>;
    export const Head: React.FC<{ children?: React.ReactNode }>;
    export const Heading: React.FC<{ children?: React.ReactNode; className?: string }>;
    export const Hr: React.FC<{ children?: React.ReactNode; className?: string }>;
    export const Img: React.FC<{ src: string; width?: number; height?: number; alt?: string; className?: string }>;
    export const Link: React.FC<{ children?: React.ReactNode; href?: string; className?: string }>;
    export const Preview: React.FC<{ children?: React.ReactNode }>;
    export const Row: React.FC<{ children?: React.ReactNode; className?: string }>;
    export const Section: React.FC<{ children?: React.ReactNode; className?: string }>;
    export const Text: React.FC<{ children?: React.ReactNode; className?: string }>;
    export const Tailwind: React.FC<{ children?: React.ReactNode }>;
  }
  