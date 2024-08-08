"use client"

import { ccc } from '@ckb-ccc/connector-react';
import React, { useState } from 'react';

const FaucetForm: React.FC = () => {
  const signer = ccc.useSigner();
  const { wallet, open, setClient, client } = ccc.useCcc();
  const [address, setAddress] = useState<string>();
  const [internalAddress, setInternalAddress] = useState<string>("");
  const [useOwnAddress, setUseOwnAddress] = useState(true);
  const [tokenType, setTokenType] = useState('ckb');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetAddress = useOwnAddress ? 'userLoggedInAddress' : address;
    console.log('Claim Address:', targetAddress);
    console.log('UDT Type:', tokenType);
  };

  return (
    <div className="relative z-50 bg-background w-full rounded-lg mx-auto px-8">
      <h2 className="text-2xl font-bold text-text mb-4">Nervos Testnet Faucet</h2>
      <div className="mb-4 flex gap-4 items-center">
        <label className="block text-gray-700 font-medium">Assets Type</label>
        <label className="flex items-center">
          <input
            type="radio"
            name="tokenType"
            value="ckb"
            checked={tokenType === 'ckb'}
            onChange={() => setTokenType('ckb')}
            className="mr-2"
          />
          <span className="text-text">CKB</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="tokenType"
            value="udt"
            checked={tokenType === 'udt'}
            onChange={() => setTokenType('udt')}
            className="mr-2"
          />
          <span className="text-text">UDT</span>
        </label>
        {/* <label className="flex items-center">
          <input
            type="radio"
            name="tokenType"
            value="dob"
            checked={tokenType === 'dob'}
            onChange={() => setTokenType('dob')}
            className="mr-2"
          />
          <span className="text-text">DOB</span>
        </label> */}
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 mb-2 font-medium">
          address
        </label>
        <input
          type="text"
          id="address"
          className="w-full px-4 py-2 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required={!useOwnAddress}
        />
      </div>
     <div className=''>
      <button
        onClick={handleSubmit}
        className="bg-primary border-2 hover:bg-black hover:border-black hover:text-white text-secondary px-4 py-2 rounded mt-4 w-32"
      >
        Claim
      </button>
     </div>
    </div>
  );
};

export default FaucetForm;