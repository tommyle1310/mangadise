import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/database'; // Adjust path as per your project structure
import User from '../../../../models/user'; // Adjust path as per your project structure
import History, { HistoryDocument } from '../../../../models/history'; // Adjust path as per your project structure

export const POST = async (req: Request, res: Response) => {
    try {
        const data = await req.json();
        const { owner, chapterNum, chapterId, slug } = data;

        // Validate the request body
        if (!owner || !chapterNum || !slug || !chapterId) {
            return new Response('Missing required fields', { status: 400 });
        }

        const response = await fetch(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`);
        const responseJson = await response.json();
        const manga = responseJson.data.seoOnPage.titleHead;

        // Connect to the database
        await connectToDB();

        // Check if the history entry already exists
        const history = await History.findOne({ owner });

        if (history) {
            const duplicatedChapterId = history.all.find(item => item.manga === manga);

            await History.updateOne(
                { owner },
                {
                    $push: {
                        all: {
                            manga,
                            chapterId,
                            chapterNum,
                            date: new Date()
                        },
                    },
                    $set: {
                        last: { manga, chapterId, chapterNum, date: new Date() }
                    }
                }
            )
        }
        else {
            // Create new history entry
            const newHistory = new History({
                owner,
                all: [{
                    manga,
                    chapterId,
                    chapterNum,
                    date: new Date()
                }],
                last: { manga, chapterId, chapterNum, date: new Date() }
            });

            await newHistory.save();
        }

        return new Response(JSON.stringify({ history }), { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response('Failed to retrieve prompt data', { status: 500 });
    }
};


