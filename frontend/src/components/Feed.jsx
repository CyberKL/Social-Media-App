import React from 'react'
import { ethers } from 'ethers';
import { postContractABI, postContractAddress } from '@/utils/constants';
import { Post } from '@/components/Post'

const getPostContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const postContract = new ethers.Contract(postContractAddress, postContractABI, signer);

    return postContract;
}

export default async function Feed() {
    let posts = [];
    const getPosts = async () => {
        const postContract = await getPostContract();
        posts = postContract.getPosts();
    }

  return (
    <div>
        {posts.map((post) => (
            <Post post={post} />
            ))}
    </div>
  )
}
