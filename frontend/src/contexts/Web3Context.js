'use client';

import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { userContractABI, userContractAddress } from '@/utils/constants';

const Web3Context = createContext();

const getUserContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userContract = new ethers.Contract(userContractAddress, userContractABI, signer);

    return userContract;
}

export const Web3Provider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState("")
    const [formData, setFormData] = useState({ username:'', bio:'' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticating, setAuthenticating] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const login = async (address) => {
        try {
            const userContract = await getUserContract();
            const userData = await userContract.getUser(address);
            setIsAuthenticated(true);
        } catch (error) {
            if(!'User not registered' in error)
                console.error(error);
            else
                setIsAuthenticated(false);
        }
    }

    const isWalletConnected = async () => {
        try {
            if(!window.ethereum) return alert('Please install metamask');
        
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if(accounts.length) {
                setConnectedAccount(accounts[0])
                await login(accounts[0]);
            }
            setAuthenticating(false);
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object")
        }
    }

    const connectWallet = async () => {
        try {
            if(!window.ethereum) return alert('Please install metamask');

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
            setConnectedAccount(accounts[0]);
            await login(accounts[0]);
        } catch(error) {
            console.error(error);
            throw new Error("No ethereum object")
        }
    }

    const registerUser = async () => {
        try {
            if(!window.ethereum) return alert('Please install metamask');

            const { username, bio } = formData;
            const userContract = await getUserContract();

            const tx = await userContract.register(username, bio);
            await tx.wait();
            setIsAuthenticated(true);
            alert("User registered!");
            
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object")
        }
    }

    const handleAccountChange = (accounts) => {
        if (accounts.length > 0) {
            setConnectedAccount(accounts[0]);
            login(accounts[0]);
        } else {
            setConnectedAccount(null);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        isWalletConnected();

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountChange);
            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountChange);
            };
        }
    }, []);
    
    return (
        <Web3Context.Provider value={{ connectWallet, connectedAccount, formData, handleChange, registerUser, isAuthenticated, authenticating }}>
            {children}
        </Web3Context.Provider>
    )
}

export {Web3Context};