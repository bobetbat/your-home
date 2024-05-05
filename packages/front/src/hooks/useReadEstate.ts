import { useReadContract } from 'wagmi';
import { ethers } from 'ethers';
import React, { useEffect, useState,useCallback } from 'react';
import { CID } from 'multiformats/cid'

// Your contract ABI and address
import EstateTokenABI from '../../abi/EstateToken.json';
import { Hash } from '../types';
import { json } from '@helia/json';
import { createHelia } from 'helia';
// import { CID } from 'ipfs-http-client/dist/src';
import { getCIDFromIPFSLink } from '../utils/string';

interface EstateData {
  // Define the structure of your estate data here
  // For example:
  // owner: string;
  // id: number;
  // name: string;
}

const parseCid = () => {
  return
}
export const useReadEstate = (estateId: ethers.BigNumberish) => {
  // Adjust the contract read for your specific use case
  // For instance, if you're reading a property by its ID
  const [data, setData] = useState<Record<string,any>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data:tokenURI, isError, isLoading } = useReadContract({
    address: process.env.NEXT_PUBLIC_ESTATE_TOKEN_ADDRESS as Hash,
    abi: EstateTokenABI.abi,
    functionName: 'tokenURI', // Replace with the actual function name
    args: [estateId],
  });
  
 const getData = useCallback(async (tokenURI: string) => {
  setLoading(true);
  console.log('getData START',tokenURI)
  setError(null);
  try {
  //   const helia = await createHelia()
  //   const j = json(helia)
  //   const cidString = getCIDFromIPFSLink(tokenURI)
  // console.log('getData cidString',cidString)

  //   if (!cidString) {
  //     throw Error('NO cid')
  //   }
  //   console.log('cid')
  //   const cid = CID.parse(cidString)
  //   console.log('cid 2')
  //   const storedData = await j.get(cid)
  //   console.log('storedData',storedData)

  //   setData(storedData as Record<string,any>)
  } catch (err:any) {
    setError(err?.message ?? '');
    console.log('MINT ERROR',err)

  } finally {
    setLoading(false);

  }
},[]);

useEffect(()=>{
  if (tokenURI) {
    console.log('tokenURI',tokenURI)
    getData(tokenURI as string)
  }
},[tokenURI])
console.log('isLoading',isLoading)
console.log('loading',loading)
  // Transform the data into a more convenient format if necessary
  // const transformedData: EstateData | undefined = data ? {
  //   // Map the raw data to your data structure
  //   // For example: owner: data.owner, id: data.id, name: data.name
  // } : undefined;

  return { data: data, error:isError || error, loading:isLoading ||loading };
}
