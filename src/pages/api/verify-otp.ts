






import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../helpers/dbConnect'

import { UserModel } from '../../models/User'

import { UserFullName } from '../../ZodSchema/signupSchema'

import { verifyCodeSchema } from '../../ZodSchema/verifySchema';

import { z } from "zod";

const verifyCodeQuerySchema = z.object({
  code: verifyCodeSchema,
  name: UserFullName,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  await dbConnect();

  try {
    const { code, name } = req.body;
    const result = verifyCodeQuerySchema.safeParse({ code, name });

    // console.log(req.body)

    // if (!result.success) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Provide valid verification code and name',
    //     errors: result.error.errors,
    //   });
    // }

    const user = await UserModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return res.status(200).json({ success: true, message: 'User verified successfully' });
    }

    if (!isCodeValid) {
      return res.status(401).json({ success: false, message: 'Invalid verification code' });
    }

    if (!isCodeNotExpired) {
      return res.status(401).json({ success: false, message: 'Verification code expired' });
    }
  } catch (error) {
    console.error('Error during verification', error);
    return res.status(500).json({ success: false, message: 'Server error during verification' });
  }
}
    // const checkCodeExpiry = new Date(user?.verifyCodeExpiry as Date) >= new Date();
    // if(!checkCodeExpiry){
    //     return Response.json(
    //         {
    //             success : false,
    //             message : `Your code expired | Please sign-up again `
    //         },{
    //             status : 401
    //         }
    //     )
    // }



//   } catch (error) {
//     console.error(`Something went wrong in codeVerification time`, error);
//     return Response.json(
//       {
//         success: false,
//         message: `Error while verify verificationCode `,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }












