import { connectToDB } from '@/database'; // Adjust path as per your project structure
import User from '../../../../models/user'; // Adjust path as per your project structure
import History, { HistoryDocument } from '../../../../models/history'; // Adjust path as per your project structure
import { historyType } from '@/@types';

export const POST = async (req: Request, res: Response) => {
    try {
        const data: historyType = await req.json();
        const { owner, chapterNum, chapterId, slug } = data;

        // Validate the request body
        if (!owner || !chapterNum || !slug || !chapterId) {
            return new Response('Missing required fields', { status: 400 });
        }

        const response = await fetch(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`);
        const responseJson = await response.json();
        const manga = responseJson.data.seoOnPage.titleHead;
        const poster = responseJson.data.seoOnPage.seoSchema.image;

        // Connect to the database
        await connectToDB();

        // Find the history entry for the owner
        const history = await History.findOne({ owner });

        if (history) {
            // Check if the chapter already exists in the history
            const duplicatedChapter = history.all.find(item => item.chapterId === chapterId && item.manga === manga);

            if (duplicatedChapter) {
                return new Response('Duplicate chapter ID', { status: 200 });
            }

            // Update the existing history
            await History.updateOne(
                { owner },
                {
                    $push: {
                        all: {
                            manga,
                            chapterId,
                            chapterNum,
                            slug,
                            poster,
                            date: new Date()
                        }
                    },
                    $set: {
                        last: { manga, chapterId, slug, poster, chapterNum, date: new Date() }
                    }
                }
            );
        } else {
            // Create new history document
            const newHistory = new History({
                owner,
                last: { manga, chapterId, chapterNum, poster, slug, date: new Date() },
                all: [{ manga, chapterId, chapterNum, poster, slug, date: new Date() }]
            });

            await newHistory.save();
        }

        return new Response(JSON.stringify({ message: 'History updated successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error updating history:', error);
        return new Response('Failed to update history', { status: 500 });
    }
}


