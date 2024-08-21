import { z } from "zod";

// Define the validation schema for sign-up
export const UserFullName = z
    .string()
    .min(3,{message:`Name must be more than 3 character`})
    .max(50,{message:"Name must be less than 100 character"})



export const signupSchema = z.object({
  name: UserFullName,
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: z
    .enum(["RECRUITER", "STUDENT"], { required_error: "Role is required" }),
});


// export type SignupSchema = z.infer<typeof signupSchema>;