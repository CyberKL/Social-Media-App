import Link from 'next/link'
import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'

export default function Post({ post }) {
  return (
    <div className='flex p-3 border-b border-gray-200'>
        <img src={post?.userImg} alt="user-img" className='h-11 w-11 rounded-full mr-4' />
        <div className='flex-1'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-1 whitespace-nowrap'>
                    <h4 className='font-bold text-xs truncate'>{post?.authorUsername}</h4>
                </div>
                <HiDotsHorizontal className='text-sm' />
            </div>
            <Link href=''>
                <p className='text-white text-sm my-3'>{post?.content}</p>
            </Link>
            <Link href=''>
                <img src={post?.image} className='rounded-2xl mr-2' />
            </Link>
        </div>
    </div>
  )
}
