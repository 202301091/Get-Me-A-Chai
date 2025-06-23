import React from 'react'
import PaymentPage from '@/component/PaymentPage'
import { notFound } from 'next/navigation'
import connectDb from '@/db/connectDb'
import User from '@/models/User'
export default async function Page({ params }) {

    // Handle case where username is not defined
    const checkUser = async () => {
        await connectDb()
        let u = await User.findOne({ username: params.username })
        if (!u) {
            return notFound()
        }
    }
    await checkUser()


    return <PaymentPage username={params.username} />

}

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me A Chai`,
  }
}

