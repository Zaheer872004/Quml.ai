import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name, role } = req.body;

    

    try {

        if(!email || !password || !name || !role){
            res
            .status(201)
            .json(
                { 
                    success: false,
                    message : 'Please provide the full credentials' 
                }
            );
        }

      // Hash the password
      const hashedPassword = await hash(password, 12);

      // Create a new user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
        },
      });

      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to create user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
