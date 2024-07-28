import { Web3Context } from '@/contexts/Web3Context';
import React, { useContext } from 'react'

export default function Modal({ isVisible, onClose }) {
    const { formData, handleChange, registerUser } = useContext(Web3Context);
    
    const handleSubmit = (e) => {
        const { username, bio } = formData;

        e.preventDefault();

        if(!username || ! bio) return;

        registerUser();
    }

    if(!isVisible) return null;
    return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[600px]'>
            <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
            <div className='bg-white p-2 rounded'>
                <h2 className="text-2xl text-black font-bold text-center">Sign Up</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={handleChange}
                        className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                        <input
                        type="text"
                        name="bio"
                        id="bio"
                        onChange={handleChange}
                        className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                        />
                    </div>
                    <div>
                        <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleSubmit}
                        >
                        Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
