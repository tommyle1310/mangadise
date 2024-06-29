import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/database'; // Adjust path as per your project structure
import User from '../../../../models/user'; // Adjust path as per your project structure

export const POST = async (req: Request, res: Response) => {
    try {
        const data = await req.json()
        const { email, name, avatar } = data;


        // Validate the request body
        if (!email || !name || !avatar) {
            return new Response('Failed to retrievssssssse prompt data', { status: 500 })

        }

        // Connect to the database
        await connectToDB();

        // Check if the user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return new Response(JSON.stringify({ userExists, asd: 'already exist' }), { status: 201 })

        }

        // Create a new user
        const newUser = await User.create({
            email,
            username: name.replace(" ", ""), // Ensure username is formatted
            image: avatar,
        });
        const existingUsers = await User.find({ email: newUser.email });
        if (existingUsers.length > 1) {
            const idsToDelete = existingUsers.slice(1).map(user => user._id);
            await User.deleteMany({ _id: { $in: idsToDelete } });
        }


        return new Response(JSON.stringify(newUser), { status: 201 })


    } catch (error) {
        console.error('Error creating user:', error);
        return new Response('Failed to retrieve prompt data', { status: 500 })

    }
};
