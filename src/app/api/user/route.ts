import { connectToDB } from "@/database";

import User from "@/models/user"

export async function GET(request: Request) {
    try {
        const users = await User.find()
        return new Response(JSON.stringify(users), { status: 201 })

    } catch (e) {
        console.log(e)
        return new Response('Failed to retrieve prompt data', { status: 500 })
    }
}

