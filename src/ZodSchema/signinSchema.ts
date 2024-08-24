import {z} from 'zod'

// Define the validation schema for sign-in
export const signinSchema = z.object({
    identifier: z
        .string()
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .length(6,{message:`Password must be atleast 6 character`}),
  });