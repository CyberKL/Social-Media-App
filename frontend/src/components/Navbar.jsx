import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            <p>social media</p>
          </Link>
        </div>
        <div className="space-x-4">
          <Link href="/login">
            <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">Login</button>
          </Link>
          <Link href="/signup">
            <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">Signup</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
