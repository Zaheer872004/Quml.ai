
import dbConnect from '../../helpers/dbConnect'
// import dbConnect from "@/helpers/dbConnect";

import { UserModel } from '../../models/User';
// import { UserModel } from "@/models/User";

// import bcrypt from 'bcryptjs'
import bcrypt from 'bcryptjs'

import { sendVerificationEmail } from '../../helpers/sendVerificationEmail'

import { signupSchema } from '../../ZodSchema/signupSchema'

import { z } from "zod";
import { NextApiRequest, NextApiResponse } from 'next';


const signUpVerificationQuerySchema = z.object({
  userData: signupSchema
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  await dbConnect();

  try {
    // Extracting user data from request body
    const { name, email, password, role } = req.body;

    console.log(req.body);

    const userData = { name, email, password, role }

    const result = signUpVerificationQuerySchema.safeParse({ userData });

    console.log(result);

    if (!result.success) {
      console.log('Validation errors :', result.error.errors)

      return res.status(400).json({
        success: false,
        message: `Validation failed: ${result.error.errors.map(err => err.message).join(', ')}`
      });
    }

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: `Please provide full credentials`
      });
    }

    // Check if username exists and is verified
    const existingUserVerifiedByUserName = await UserModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      isVerified: true,
    });

    if (existingUserVerifiedByUserName) {
      return res.status(400).json({
        success: false,
        message: `Name already exists | Name is taken by someone else`,
      });
    }

    // Generate verification code (OTP)
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if email exists
    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);

        existingUserByEmail.password = hashPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        existingUserByEmail.role = role;

        console.log(hashPassword)

        await existingUserByEmail.save();

      }
    } else {
      // Create new user
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        name,
        email,
        password: hashPassword,
        verifyCode,
        verifyCodeExpiry: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        isVerified: false,
        role,
      });

      console.log(hashPassword)

      await newUser.save();

    }

    console.log(existingUserByEmail?.verifyCode);
    // Send verification email
    const emailResponse = await sendVerificationEmail(email, name, verifyCode, role);

    console.log(`Email response: `, emailResponse);

    if (!emailResponse.success) {
      return res.status(500).json({
        success: false,
        message: emailResponse.message,
      });
    }

    console.log(`Verification code: `, existingUserByEmail?.verifyCode);
    return res.status(201).json({
      success: true,
      message: `User registered successfully. Please verify your email.`,
    });

  } catch (error) {
    console.error(`Error registering user`, error);

    return res.status(500).json({
      success: false,
      message: "Error registering user",
    });
  }

}