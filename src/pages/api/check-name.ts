// pages/api/check-username.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../helpers/dbConnect';
import { UserModel } from '../../models/User';
import { UserFullName } from '../../ZodSchema/signupSchema';
import { z } from 'zod';

// Validating the username with our custom Zod schema
const UserFullNameVerificationQuerySchema = z.object({
  name: UserFullName,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  await dbConnect();

  try {
    const { name } = req.query;

    // Ensure 'name' is a string and validate it
    const queryParam = { name: name as string };
    const result = UserFullNameVerificationQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const nameError = result.error.format().name?._errors || [];

      return res.status(400).json({
        success: false,
        message: nameError.length > 0 ? nameError.join(', ') : 'Invalid query parameter',
      });
    }

    const validatedName = result.data?.name;

    // Check if the name is already taken by a verified user
    const existingVerifiedUser = await UserModel.findOne({ name: validatedName, isVerified: true });

    if (existingVerifiedUser) {
      return res.status(400).json({
        success: false,
        message: 'Name already taken',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Name is unique',
    });

  } catch (error) {
    console.error('Error checking name', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking name',
    });
  }
}
