'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button'; // ShadCN Button
import { Input } from '@/components/ui/input'; // ShadCN Input
import { Textarea } from '@/components/ui/textarea'; // ShadCN Textarea
import { useToast } from '@/components/ui/use-toast'; // ShadCN Toast
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

// Define Zod schema for validation
const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
});

const Contact1 = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    // Use React Hook Form with Zod validation
    const form = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/contact', data);

            if (response.status === 200) {
                toast({
                    title: 'Message Sent',
                    description: 'Your message was sent successfully!',
                    variant: 'success',
                });
                form.reset();
            }
        } catch (error) {
            toast({
                title: 'Failed to send message',
                description: error.response?.data.message || 'Something went wrong',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact__area-6">
            <div className="container g-0 line pt-120 pb-110">
                <span className="line-3"></span>
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                        <div className="sec-title-wrapper">
                            <h2 className="sec-title-2 animation__char_come">
                                Let’s get in touch
                            </h2>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                        <div className="contact__text">
                            <p>
                                {
                                    "Great! We're excited to hear from you and let's start something special together. Call us for any inquiry."
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row contact__btm">
                    <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                        <div className="contact__info">
                            <h3 className="sub-title-anim-top">
                                {"Don't be afraid man! "}
                                <br />
                                say hello
                            </h3>
                            <ul>
                                <li>
                                    <a href="tel:+(2)578365379">+(2) 578 - 365 - 379</a>
                                </li>
                                <li>
                                    <a href="mailto:hello@example.com">hello@example.com</a>
                                </li>
                                <li>
                                    <span>
                                        230 Norman Street New York, <br /> QC (USA) H8R 1A1
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                        <div className="contact__form">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Phone" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Subject" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Message" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact1;
