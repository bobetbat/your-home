import React, { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import EstateContract from '../../../contracts/artifacts/contracts/EstateContract.sol/EstateContract.json'; // Adjust the path according to your project structure
import { Hash } from '../types';


interface Apartment {
  id: number;
  address: string;
  rooms: number;
  size: number; // in square meters
  isFurnished: boolean;
  amenities: string[];
}


type MintEstateTokenHook = {
  mint: (tokenURI: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const useMintEstateToken = (): MintEstateTokenHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnecting, isDisconnected } = useAccount()
  const { writeContractAsync } = useWriteContract();
  console.log('address', address)
  const mint = async (tokenURI: string) => {
    setLoading(true);
    console.log('MINT START:', tokenURI)
    setError(null);
    console.log('process.env.NEXT_PUBLIC_ESTATE_TOKEN_ADDRESS', process.env.NEXT_PUBLIC_ESTATE_TOKEN_ADDRESS)
    try {
      const res = await writeContractAsync({
        abi: EstateContract.abi,
        address: process.env.NEXT_PUBLIC_ESTATE_TOKEN_ADDRESS as Hash, // Replace with your contract address
        functionName: 'mint',
        args: [
          address,
          tokenURI
        ],
      });
      console.log("MINT RES", res)
      setLoading(false);
    } catch (err: any) {
      setError(err?.message ?? '');
      console.log('MINT ERROR', err)

      setLoading(false);
    }
  };

  return { mint, loading, error };
};
