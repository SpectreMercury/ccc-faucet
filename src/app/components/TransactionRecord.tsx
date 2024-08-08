"use client"

import { formatLongString } from '@/utils/tools';
import { ccc } from '@ckb-ccc/connector-react';
import React, { useState, useEffect } from 'react';
import { FaClipboard, FaExternalLinkAlt } from 'react-icons/fa';

interface Transaction {
  txHash: string;
  address: string;
  timestamp: string;
  amount: number;
  status: string;
}

const TransactionRecord: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [address, setAddress] = useState<string>('');

  const signer = ccc.useSigner();

  useEffect(() => {
    if(signer) {
      (async() => {
        setAddress(await signer.getRecommendedAddress())
      })()
    }
  },[signer])
  

  useEffect(() => {
    // 模拟获取数据
    const fetchData = async () => {
      const data: Transaction[] = [
        {
          txHash: '0x080448302733295a45a8a8939035ab2fdbf44e7ee5a8a59888d9fa3f67c2dd',
          address: 'ckt1qrejrmlar3r452tcg57gvq8pattcgy8a...cfz7vjajv7fhh8yk4luf8wktvne6lqq36xzwj',
          timestamp: '2024/08/05 21:24:10',
          amount: 10000.0,
          status: 'commited',
        },
        {
          txHash: '0x61a6448d48d83b22599fe80aa2e554fac5b5d3676336b01d9a466b129ce0daba',
          address: 'ckt1qrejrmlar3r452tcg57gvq8pattcgy8a...cfz7vjajv7fhh8yk4luf8wktvne6lqq36xzwj',
          timestamp: '2024/08/05 21:16:22',
          amount: 10000.0,
          status: 'process',
        },
        // ... (更多的模拟数据)
      ];
      setTransactions(data);
    };

    fetchData();
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.txHash.includes(searchQuery) ||
      transaction.address.includes(searchQuery)
  );

  return (
    <div className="bg-white w-full rounded-lg mx-auto px-4 py-6 sm:px-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-text mb-6 text-center">Claims</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search Address or Transaction Hash"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-neutral rounded"
        />
        <button className='px-4 py-2 border rounded shrink-0 hover:bg-black hover:text-white hover:border-b'>
          Search by address
        </button>
        <button 
          className='px-4 py-2 border rounded shrink-0 hover:bg-black hover:text-white hover:border-b'
          onClick={() => {
            setSearchQuery(address);   
          }}
        >
          Search my address
        </button>
      </div>

      <div className="space-y-4">
        {filteredTransactions.map((transaction, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 text-black p-4 rounded-lg">
            <div className="flex flex-col gap-1 w-full sm:w-auto text-center">
              <div className="text-sm text-gray-400">TX Hash</div>
              <div className="text-sm">{formatLongString(transaction.txHash)}</div>
            </div>
            <div className="flex flex-col text-center gap-1 w-full sm:w-auto">
              <div className="text-sm text-gray-400">Amount</div>
              <div className="text-sm">{transaction.amount.toFixed(4)} CKB</div>
            </div>
            <div className="flex flex-col text-center gap-1 w-full sm:w-auto">
              <div className="text-sm text-gray-400">Type</div>
              <div className="text-sm">CKB</div>
            </div>
            <div className="flex flex-col text-center gap-1 w-full sm:w-auto">
              <div className="text-sm text-gray-400">Status</div>
              <div className={`px-2 py-1 text-sm rounded text-white ${transaction.status === 'commited' && 'bg-green-500'} ${transaction.status === 'process' && 'bg-orange-400'} `}>
                {transaction.status}
              </div>
            </div>
            <div className="flex flex-col text-center gap-1 w-full sm:w-auto">
              <div className="text-sm text-gray-400">Address</div>
              <div className="text-sm">{formatLongString(transaction.address)}</div>
            </div>
            <div className="flex flex-col text-center gap-1 w-full sm:w-auto">
              <div className="text-sm text-gray-400">Timestamp</div>
              <div className="text-sm">{transaction.timestamp}</div>
            </div>
            <div className="flex flex-col text-center gap-1 w-full sm:w-auto">
              <button className="text-sm p-2 rounded-full border-2 border-gray-200 hover:bg-gray-200 mt-2 sm:mt-0">
                <FaExternalLinkAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionRecord;