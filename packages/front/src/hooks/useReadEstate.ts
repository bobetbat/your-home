import { useReadContract } from 'wagmi';
import { ethers } from 'ethers';
import React, { useEffect, useState, useCallback } from 'react';
import { CID } from 'multiformats/cid'

// Your contract ABI and address
// import EstateTokenABI from '../../abi/EstateToken.json';
import { Hash } from '../types';
import { json } from '@helia/json';
import { createHelia } from 'helia';
// import { CID } from 'ipfs-http-client/dist/src';
import { getCIDFromIPFSLink } from '../utils/string';
import { contracts } from '../config/contract';
import { sepolia } from 'wagmi/chains';

export const useReadEstate = (estateId: ethers.BigNumberish) => {
  // Adjust the contract read for your specific use case
  // For instance, if you're reading a property by its ID
  const [data, setData] = useState<Record<string, any>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: tokenURI, isError, isLoading } = useReadContract({
    address: contracts[sepolia.id].estate as unknown as Hash,
    // abi: EstateTokenABI.abi,
    functionName: 'tokenURI', // Replace with the actual function name
    args: [estateId],
  });

  const getData = useCallback(async (tokenURI: string) => {
    setLoading(true);
    console.log('getData START', tokenURI)
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
    } catch (err: any) {
      setError(err?.message ?? '');
      console.log('MINT ERROR', err)

    } finally {
      setLoading(false);

    }
  }, []);

  useEffect(() => {
    if (tokenURI) {
      console.log('tokenURI', tokenURI)
      getData(tokenURI as string)
    }
  }, [tokenURI])
  console.log('isLoading', isLoading)
  console.log('loading', loading)

  return { data: data, error: isError || error, loading: isLoading || loading };
}
