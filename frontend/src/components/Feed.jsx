'use client'

import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { postContractABI, postContractAddress } from '@/utils/constants';
import Post from '@/components/Post'

const getPostContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const postContract = new ethers.Contract(postContractAddress, postContractABI, signer);

    return postContract;
}

export default function Feed() {
    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    const getPosts = async () => {
      try {
          const postContract = await getPostContract();
          const fetchedPosts = await postContract.getPosts();

          // Convert BigNumber timestamps to numbers
          const postsWithTimestamps = fetchedPosts.map(post => ({
              author: post.author,
              authorUsername: post.authorUsername,
              content: post.content,
              timestamp: parseInt(post.timestamp.toString(), 10)
          }));

          // Sort posts by timestamp (latest first)
          const sortedPosts = postsWithTimestamps.sort((a, b) => b.timestamp - a.timestamp);
          setPosts(sortedPosts);
          setLoading(false);
      } catch (error) {
          console.error("Error fetching posts:", error);
      }
  }
    useEffect(() => {
      getPosts();
    }, [])

  return (
    <div>
        {loading && (<p>Loading</p>)}
        {!loading && posts.length === 0 && (<p>No posts available</p>)}
        {!loading && posts.length > 0 && (
            posts.map((post, index) => (
                <Post key={index} post={post} />
            )))}
    </div>
  )
}
