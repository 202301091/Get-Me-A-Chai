"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react'
import Link from 'next/link'
const Navbar = () => {
  const { data: session } = useSession()
  const [toogle, settoogle] = useState(false)
  return (
    <div>
      <nav className='bg-blue-950 text-white flex flex-col sm:flex-row justify-between px-4 sm:h-16  items-center'>
        <div className="logo font-bold text-lg  sm:flex gap-2 justify-center items-center">
         <Link  className="logo font-bold text-lg flex gap-2 justify-center items-center" href={"/"}> <img className='invertImg' src="/tea.gif" width={50} alt="" />
          <span>Get Me A Chai</span>
          </Link>
        </div>
        {/* <ul className='flex justify-between gap-4'>
          <Link href={"/"}><li>Home</li></Link>
          <Link href={"/about"}><li>About</li></Link>
          <Link href={"/login"}><li>Login</li></Link>
        </ul> */}

        <div className='relative items-center flex flex-col sm:block'>

          {session && <><button onClick={() => { settoogle(!toogle) }} onBlur={() => {
            setTimeout(() => {
              settoogle(false)
            }, 2000);
          }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-4 my-2" type="button">Welcome {session.user.name} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
           
          </svg>
          </button>

            <div id="dropdown" className={`z-10 ${toogle ? "" : "hidden"} absolute left-[123px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href={"/dashboard"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                <li>
                  <Link onClick={()=>{signOut()}} href={"#"}  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div></>
          }
         {!session && <Link href={"/login"}> <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Login</button></Link>}
         {session && <Link href={"/login"}> <button type="button"  onClick={()=>{signOut()}} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Signout</button></Link>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
