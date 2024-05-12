import React, { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import EstateToken from '../../../contracts/artifacts/contracts/EstateToken.sol/EstateToken.json'; // Adjust the path according to your project structure
import { Estate } from '../components/MintEstateForm';
import { contracts } from '../config/contract';


type MintEstateTokenHook = {
  mint: (estateMetadata: Estate) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const useMintEstateToken = (): MintEstateTokenHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnecting, isDisconnected, chainId } = useAccount()
  const { writeContractAsync } = useWriteContract();

  const mint = async (estateMetadata: Estate) => {
    setLoading(true);
    console.log('MINT START:', estateMetadata)
    setError(null);
    try {
      if (!chainId) {
        throw Error('chainId is undefined')
      }
      console.log('NEXT_PUBLIC_ESTATE_TOKEN_ADDRESS', contracts[chainId].estate)

      const data = new FormData();
      console.log('data', data)
      // TODO: change empty blob to 3d object
      data.append("file", new Blob());

      const metadata = JSON.stringify(estateMetadata);
      data.append("keyvalues", metadata);

      // const options = JSON.stringify({
      //   cidVersion: 0,
      // });
      // formData.append("pinataOptions", options);

      const ipfsResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "post",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_IPFS_PINATA_JWT}`,
        },
        body: data,
      });

      const { IpfsHash } = await ipfsResponse.json();
      console.log('IpfsHash', IpfsHash);

      const tokenURI = "ipfs://" + String(IpfsHash)

      const res = await writeContractAsync({
        abi: EstateToken.abi,
        address: contracts[chainId].estate, // Replace with your contract address
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
