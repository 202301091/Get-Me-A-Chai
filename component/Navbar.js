"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [toggle, setToggle] = useState(false)
  const [username, setUsername] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const search = async () => {
    try {
      const res = await fetch(`/api/search-user?username=${username}`)
      setUsername("")
      setShowSearch(false)

      if (res.status === 404) {
        router.push("/404") // fallback to 404 route
        return
      }

      const data = await res.json()
      router.push(`/${data.user.username}`)
    } catch (err) {
      console.error("Search failed:", err)
    }
  }

  return (
    <div className='px-3 py-1 bg-blue-950'>
      <nav className=' text-white flex flex-col gap-2 sm:flex-row justify-between px-4 sm:h-16 items-center'>
        <div className="logo font-bold text-lg flex gap-2 justify-center items-center">
          <Link className="flex gap-2 items-center" href="/">
            <img className='invertImg' src="/tea.gif" width={50} alt="Logo" />
            <span>Get Me A Chai</span>
          </Link>
        </div>

        <div className='relative items-center flex flex-col sm:flex-row'>
          {session && (
            <>
              <button
                onClick={() => setToggle(!toggle)}
                onBlur={() => setTimeout(() => setToggle(false), 2000)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center mx-4 my-2"
              >
                Welcome {session.user.name}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div className={`z-10 ${toggle ? "" : "hidden"} absolute top-[55px] left-[20px] bg-white divide-y rounded-lg shadow-sm w-44`}>
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  </li>
                  <li>
                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100">Your Page</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >Sign out</button>
                  </li>
                </ul>
              </div>
            </>
          )}

          <div className='flex gap-3'>
            <button
              onClick={() => setShowSearch(true)}
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            {!session && (
              <Link href="/login">
                <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 font-medium rounded-lg text-sm px-5 py-2.5">Login</button>
              </Link>
            )}

            {session && (
              <button
                onClick={() => signOut()}
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </nav>

      {showSearch && (
        <div className="bg-white z-30 absolute rounded-xl left-[10vw] sm:left-[20vw] text-black gap-4 flex flex-col p-5 w-[80vw] sm:w-[60vw]">
          <div className="flex flex-col sm:flex-row justify-between">
            <h1 className="text-xl sm:text-2xl font-bold">Find Your Favourite Creator</h1>
            <div className='flex gap-3'>
              <button
                onClick={search}
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 font-medium rounded-lg text-sm px-5 py-2.5"
              >Search</button>
              <button
                onClick={() => setShowSearch(false)}
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 font-medium rounded-lg text-sm px-5 py-2.5"
              >Cancel</button>
            </div>
          </div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-500 text-white p-2 rounded-[5px]"
            type="text"
            placeholder="Enter username"
          />
        </div>
      )}
    </div>
  )
}

export default Navbar