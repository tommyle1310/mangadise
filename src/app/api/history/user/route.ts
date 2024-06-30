import { parse } from 'url'
import { connectToDB } from '@/database'; // Adjust path as per your project structure
import User from '../../../../models/user'; // Adjust path as per your project structure
import History, { HistoryDocument } from '../../../../models/history'; // Adjust path as per your project structure
import { NextApiRequest, NextApiResponse } from 'next';



export const GET = async (req: Request,) => {
    try {
        const url = new URL(req.url)
        const searchParams = new URLSearchParams(url.searchParams)
        const userEmail = searchParams.get('email')

        // Connect to the database
        await connectToDB();
        const history = await History.findOne({ owner: userEmail })
        // Check if the history entry already exists


        return new Response(JSON.stringify({ history }), { status: 201 });
    } catch (error) {
        console.error('Error updating history:', error);
        return new Response('Failed to update history', { status: 500 });
    }
};


