import React from 'react'
import Link from 'next/link';
import { FiHome } from "react-icons/fi";

export default function Sidebar() {
  return (
    <div className='flex flex-col gap-4 p-3'>
        <Link href='/' className='flex items-center p-3 gap-2 w-fit hover:text-blue-600'>
            <FiHome className='w-7 h-7'/>
            <span className='font-bold hidden xl:inline'>Home</span>
        </Link>
    </div>
  )
}
