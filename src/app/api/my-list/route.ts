import User from "@/models/user"
import UserList from "@/models/userList"


export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const searchParams = new URLSearchParams(url.searchParams)
        const owner = searchParams.get('owner')
        const users = await UserList.find({ owner })
        const sortedUsers = users.map(user => {
            user.dropped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            user.stalled.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            user.wantToRead.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            user.wontRead.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            return user;
        });
        return new Response(JSON.stringify(sortedUsers), { status: 201 })

    } catch (e) {
        console.log(e)
        return new Response('Failed to retrieve my-list data', { status: 500 })
    }
}
