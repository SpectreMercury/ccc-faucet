"use client"

import React, { useEffect, useState } from 'react';
import { ccc } from '@ckb-ccc/connector-react';
import { formatLongString } from '@/utils/tools';

const Header: React.FC = () => {
  const signer = ccc.useSigner();
  const { wallet, open, setClient, client } = ccc.useCcc();
  const [address, setAddress] = useState<string>();
  const [internalAddress, setInternalAddress] = useState<string>("");
  const [balance, setBalance] = useState<bigint>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if(signer) {
      (async () => {
        setInternalAddress(await signer.getInternalAddress());
        setAddress(await signer.getRecommendedAddress());
        setBalance(await signer.getBalance());
      })();
    }
  }, [wallet, signer])

  return (
    <header className="bg-primary text-secondary p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">CKB Faucet</div>
      <nav className="hidden md:flex space-x-4 items-center">
        <a href="#" className="hover:underline text-text">Home</a>
        <a href="#" className="hover:underline text-text">About</a>
        <button 
          className=' px-4 py-1 rounded-lg border-2 hover:bg-black hover:text-white hover:border-b'
          onClick={open}
        >
          {
            address ?  formatLongString(address) : 'Connect Wallet'
          }
        </button>
      </nav>
      <button
        className="md:hidden text-2xl text-text"
        onClick={toggleMobileMenu}
      >
        ☰
      </button>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-primary bg-opacity-95 flex flex-col items-center justify-center space-y-4 z-50">
          <button
            className="absolute top-4 right-4 text-3xl text-secondary"
            onClick={toggleMobileMenu}
          >
            ✕
          </button>
          <a href="#" className="text-2xl hover:underline text-secondary">Home</a>
          <a href="#" className="text-2xl hover:underline text-secondary">About</a>
          <a href="#" className="text-2xl hover:underline text-secondary">Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;