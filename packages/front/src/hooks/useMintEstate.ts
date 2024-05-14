import React, { useCallback, useState } from 'react';
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

  const mint = useCallback(
    async (estateMetadata: Estate) => {
      setLoading(true);
      console.log('MINT START:', estateMetadata)
      setError(null);
      try {
        if (!chainId) {
          throw Error('chainId is undefined')
        }
        console.log('NEXT_PUBLIC_ESTATE_TOKEN_ADDRESS', contracts[chainId].estate)

        const rawData = {
          pinataOptions: {
            cidVersion: 1
          },
          pinataMetadata: {
            name: "estate.json"
          },
          pinataContent: estateMetadata
        }

        const data = JSON.stringify(rawData)
        const ipfsResponse = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
          method: "post",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_IPFS_PINATA_JWT}`,
            'Content-Type': "application/json"
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
    },
    [address],
  );

  return { mint, loading, error };
};
