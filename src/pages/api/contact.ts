import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { Resend } from 'resend';
import { sendEmailFromContact } from '../../helpers/sendVerificationEmail';
import { validateConfig } from 'next/dist/server/config-shared';

const resend = new Resend(process.env.RESEND_API_KEY);

// Define Zod schema for validation
const contactSchema = z.object({
    fullName: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    subject: z.string().min(5, "Subject must be at least 5 characters long"),
    message: z.string().min(5, "Message must be at least 5 characters long"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Validate the request body
            // const validatedData = contactSchema.parse(req.body);
            const { email } = await req.body;

            // Send the email using sendEmailFromContact function
            // const { success, message } = await sendEmailFromContact(
            //     validatedData.email,
            //     validatedData.fullName,
            //     process.env.CONTACT_RECEIVER_EMAIL!,
            //     validatedData.phone || 'N/A',
            //     validatedData.email,
            //     validatedData.subject,
            //     validatedData.message
            // );

            // if (success) {
            //     res.status(200).json({ success: true, message: 'Message sent successfully' });
            // } else {
            //     res.status(500).json({ success: false, message });
            // }



            await resend.emails.send({
                from : email,
                to: 'onboarding@resend.dev',
                subject: 'Test Email',
                text: 'This is a test email to verify if the Resend API works correctly.',
            });
            

        } catch (error) {
            if (error instanceof z.ZodError) {
                // Handle Zod validation errors
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }

            // Handle other errors
            console.error('Error processing the request:', error);
            return res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
