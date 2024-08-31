import { Resend } from 'resend';

import VerificationEmailTemplate from '../lib/VerificationEmailTemplate';
import ContactEmailTemplate from "../lib/contactMessageTemplate"
// import VerificationEmailTemplate from '@/lib/VerificationEmailTemplate';

// import {ApiResponse} from '@/types/ApiResponse'


const resend = new Resend(process.env.RESEND_API_KEY);

// lib/sendEmailFromContact.ts
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendEmailFromContact(
    from: string,
    fullName: string,
    to: string,
    phone: string,
    email: string,
    subject: string,
    message: string
): Promise<{ success: boolean; message: string }> {
    try {
        // Send the email using the Resend API
        await resend.emails.send({
            from,
            to: 'onboarding@resend.dev', // Fixed recipient for the contact form
            subject: 'Feedback Application | Query',
            react: ContactEmailTemplate({
                from,
                name: fullName,
                email,
                phone,
                subject,
                message,
            }),
        });

        return {
            success: true,
            message: 'Email sent successfully',
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            success: false,
            message: 'Failed to send email',
        };
    }
}




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


