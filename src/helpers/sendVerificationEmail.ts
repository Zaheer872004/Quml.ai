import { Resend } from 'resend';

import VerificationEmailTemplate from '../lib/VerificationEmailTemplate';
// import VerificationEmailTemplate from '@/lib/VerificationEmailTemplate';

// import {ApiResponse} from '@/types/ApiResponse'


const resend = new Resend(process.env.RESEND_API_KEY);

enum Role{
    'STUDENT',
    'RECRUITER'
}

export async function sendVerificationEmail(
    email: string,
    name : string,
    verifyCode : string,
    role : Role
)  {

    try {
        await resend.emails.send({
            from : 'onboarding@resend.dev',
            to: email,
            subject:'Feedback Application | Verification Code',
            react: VerificationEmailTemplate({
                name , 
                otp: verifyCode,
                role,
            }),
        });
        


        return {
            success: true,
            message:`Email send successfully to ${name} from Feedback Application `,

        }
    } catch (emailError) {
        console.log("Error sending verification email",emailError);
        return {success:false,message:`Failed to send verification email`}

        
    }
}


