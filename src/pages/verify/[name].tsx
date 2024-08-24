'use client';

import { useToast } from '@/components/ui/use-toast';
import { verifyCodeSchema } from '@/ZodSchema/verifySchema'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

function Page() {
    const router = useRouter();
    const params = useSearchParams();
    const { toast } = useToast();

    // Zod implementation schema checking
    const form = useForm<z.infer<typeof verifyCodeSchema>>({
        resolver: zodResolver(verifyCodeSchema),
    });

    const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
        try {
            const response = await axios.post(`/api/verify-otp`, {
                name: params.get('name'),
                code: data.code
            });
            toast({
                title: 'Success',
                description: response.data.message,
            });
            console.log('Redirecting to the sign-in page.....')
            router.replace('/sign-in');
        } catch (error) {
            console.error('Error in verification', error);
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: 'Verification failed',
                description: axiosError.response?.data.message,
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Verify Your Account
                </h1>
                <p className="mb-4">
                    Enter the Verification code sent to your email
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter code" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please enter the OTP
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Page;
