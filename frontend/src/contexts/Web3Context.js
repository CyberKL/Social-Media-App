'use client';

import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '@/utils/constants';

const Web3Context = createContext();

const getContract = () => {
    const provider = new ethers.provider.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
}

export const Web3Provider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState("")

    const isWalletConnected = async () => {
        try {
            if(!window.ethereum) return alert('Please install metamask');
        
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if(accounts.length) {
                setConnectedAccount(accounts[0])
            }
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object")
        }
    }

    const connectWallet = async () => {
        try {
            if(!window.ethereum) return alert('Please install metamask');

            const accounts = await window.ethereum.request({ method: 'eth_reqAccounts'});
            setConnectedAccount(accounts[0]);
        } catch(error) {
            console.error(error);
            throw new Error("No ethereum object")
        }
    }

    useEffect(() => {
        isWalletConnected();
    }, [])
    
    return (
        <Web3Context.Provider value={{ connectWallet, connectedAccount }}>
            {children}
        </Web3Context.Provider>
    )
}