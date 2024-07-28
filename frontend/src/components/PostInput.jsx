"use client";

import React, { useContext, useState } from "react";
import { Web3Context } from "@/contexts/Web3Context";
import { HiOutlinePhotograph } from "react-icons/hi";
import { ethers } from 'ethers';
import { postContractABI, postContractAddress } from '@/utils/constants';


const getPostContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const postContract = new ethers.Contract(postContractAddress, postContractABI, signer);

  return postContract;
}

export default function PostInput() {
  const { isAuthenticated, authenticating, username } = useContext(Web3Context);
  const [text, setText] = useState('')
  const [postLoading, setPostLoading] = useState(false)

  const handleSubmit = async () => {
    setPostLoading(true);
    const postContract = getPostContract();
    const tx = await postContract.createPost(text, username);
  }

  if (!isAuthenticated || authenticating) return null;
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <div className="w-full divide-y divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min0h-[50px] text-white"
          rows="2"
          placeholder="What's happening"
          value={text}
          onChange={(e) => {setText(e.target.value)}}
        ></textarea>
        <div className="flex items-center justify-between pt-2.5">
          <HiOutlinePhotograph className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
          <button disabled={text.trim() === '' || postLoading} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
