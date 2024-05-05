// import React, { useState } from 'react';
// import { useAccount, useWriteContract } from 'wagmi';
// import EstateTokenABI from '../abi/EstateToken.json'; // Adjust the path according to your project structure
// import { Hash } from '../types';
// import { createHelia } from 'helia'
// import { json } from '@helia/json'
// import IPFS from 'ipfs-core';

// /**
// // * Gets data from the IPFS
// // * @param id - IPFS CID of the file
// // */
// // const ipfsId = await   ('QmXJJ6UF5WkF4WTJvsdhiA1etGwBLfpva7Vr9AudGMe3pj');
// // /**
// // * Upload file to the IPFS storage.
// // * @param file - data buffer of the file. Content Type: multipart/form-data
// // * @returns ipfsHash - IPFS hash of the file
// // */
// // const ipfsHash = await ipfsUpload('logo.jpg', 'fileName');

// interface Apartment {
//   id: number;
//   address: string;
//   rooms: number;
//   size: number; // in square meters
//   isFurnished: boolean;
//   amenities: string[];
// }


// type MintEstateTokenHook = {
//  mint: (amount: number) => Promise<void>;
//  loading: boolean;
//  error: string | null;
// };

// export const useMintEstateToken = (): MintEstateTokenHook => {
//  const [loading, setLoading] = useState(false);
//  const [error, setError] = useState<string | null>(null);
//  const { address, isConnecting, isDisconnected } = useAccount()
//  const { writeContractAsync } = useWriteContract();

//  const mint = async (amount: number) => {
//     setLoading(true);
//     console.log('MINT START')
//     setError(null);
//     try {

//       const json = JSON.stringify(apartment)
//       const ipfs = await IPFS.create()
//       const { cid } = await ipfs.add(json)
//       console.log('CID',cid)

//       const res = await writeContractAsync({
//         abi: EstateTokenABI.abi,
//         address: process.env.NEXT_PUBLIC_ESTATE_TOKEN_ADDRESS as Hash, // Replace with your contract address
//         functionName: 'mint', // Assuming your contract has a mint function
//         args: [address,`ipfs://${cid}`],
//         // inputs: ,
//       });
//       console.log("MINT RES",res)
//       setLoading(false);
//     } catch (err:any) {
//       setError(err?.message ?? '');
//     console.log('MINT ERROR',err)

//       setLoading(false);
//     }
//  };

//  return { mint, loading, error };
// };
