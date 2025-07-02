import { NextResponse } from 'next/server'
import connectDb from '@/db/connectDb'
import User from '@/models/User'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')

    await connectDb()
    const user = await User.findOne({ username })

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

   
    return NextResponse.json({ user })
}
