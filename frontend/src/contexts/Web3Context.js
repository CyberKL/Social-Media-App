'use client';

import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
//import Users from '../artifacts/contracts/Users.sol/Users.json';

const Web3Context = createContext();

const Web3Provider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);

                const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';
                const contract = new ethers.Contract(contractAddress, Users.abi, provider);
                setContract(contract);
            }
        };
        init();
    }, []);

    const connectWallet = async () => {
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        const signer = provider.getSigner();
        setSigner(signer);
        setContract(contract.connect(signer));

        const isRegistered = await contract.isRegisteredUser(accounts[0]);
        setIsAuthenticated(isRegistered);
    };

    return (
        <Web3Context.Provider value={{ provider, signer, contract, account, isAuthenticated, connectWallet }}>
            {children}
        </Web3Context.Provider>
    );
};

export { Web3Context, Web3Provider };
