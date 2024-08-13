// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth'; 
// Assuming authOptions is exported from this path

export default NextAuth(authOptions);
