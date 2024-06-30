import User from "@/models/user"
import UserList from "@/models/userList"


export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const searchParams = new URLSearchParams(url.searchParams)
        const owner = searchParams.get('owner')
        const users = await UserList.find({ owner })
        return new Response(JSON.stringify(users), { status: 201 })

    } catch (e) {
        console.log(e)
        return new Response('Failed to retrieve my-list data', { status: 500 })
    }
}
