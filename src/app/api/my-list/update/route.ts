import { connectToDB } from '@/database';  // adjust the path according to your project structure
import UserList from '@/models/userList';  // adjust the path according to your project structure
import { myListConstants } from '@/lib/constants';  // adjust the path according to your project structure

interface ExtendedHistoryType {
    owner: string;
    slug: string;
    type: string;  // Assuming 'type' is a string, adjust according to your actual type
}

export const PATCH = async (req: Request, res: Response) => {
    try {
        const data: ExtendedHistoryType = await req.json();
        const { owner, slug, type } = data;

        // Validate the request body
        if (!owner || !slug || !type) {
            return new Response('Failed to update my-list data', { status: 400 });
        }

        const response = await fetch(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`);
        const responseJson = await response.json();
        const manga = responseJson.data.seoOnPage.titleHead;
        const poster = responseJson.data.seoOnPage.seoSchema.image;

        // Connect to the database
        await connectToDB();

        // Find the user's list
        const myList = await UserList.findOne({ owner });

        const newEntry = {
            manga,
            slug,
            poster,
            date: new Date()
        };

        if (myList) {
            let update;
            let existingEntryIndex;

            switch (type) {
                case myListConstants.DROPPED:
                    existingEntryIndex = myList.dropped.findIndex(item => item.slug === slug);
                    if (existingEntryIndex !== -1) {
                        update = { $pull: { dropped: { slug } } };
                    } else {
                        update = { $push: { dropped: newEntry } };
                    }
                    break;
                case myListConstants.STALLED:
                    existingEntryIndex = myList.stalled.findIndex(item => item.slug === slug);
                    if (existingEntryIndex !== -1) {
                        update = { $pull: { stalled: { slug } } };
                    } else {
                        update = { $push: { stalled: newEntry } };
                    }
                    break;
                case myListConstants.WANT_TO_READ:
                    existingEntryIndex = myList.wantToRead.findIndex(item => item.slug === slug);
                    if (existingEntryIndex !== -1) {
                        update = { $pull: { wantToRead: { slug } } };
                    } else {
                        update = { $push: { wantToRead: newEntry } };
                    }
                    break;
                case myListConstants.WONT_READ:
                    existingEntryIndex = myList.wontRead.findIndex(item => item.slug === slug);
                    if (existingEntryIndex !== -1) {
                        update = { $pull: { wontRead: { slug } } };
                    } else {
                        update = { $push: { wontRead: newEntry } };
                    }
                    break;
                default:
                    return new Response(JSON.stringify({ message: 'Invalid type' }), { status: 400 });
            }

            await UserList.updateOne({ owner }, update);
        } else {
            // Create new user list document
            const newUserList = new UserList({
                owner,
                [type]: [newEntry]
            });

            await newUserList.save();
        }

        return new Response(JSON.stringify({ message: 'Update successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error updating history:', error);
        return new Response('Failed to update my-list data', { status: 500 });
    }
};
