'use client';

import React, { useContext, useState } from 'react'
import Link from 'next/link'
import Modal from "@/components/Modal";
import { Web3Context } from '@/contexts/Web3Context';

export default function Navbar() {
  const { connectWallet, connectedAccount, isAuthenticated, authenticating } = useContext(Web3Context);

  const [showModal, setShowModal] = useState(false);

  const signUp = () => {
    if(!connectedAccount)
      connectWallet();
    setShowModal(true);
  }

  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            <p>social media</p>
          </Link>
        </div>
        {!isAuthenticated && !authenticating && (
          <div className="space-x-4">
            <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700" onClick={connectWallet}>Login</button>
            <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700" onClick={signUp}>Signup</button>
          </div>
        )}
      </div>
      <Modal isVisible={showModal && !isAuthenticated} onClose={() => setShowModal(false)}  />
    </nav>
    
  )
}
