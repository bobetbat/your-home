import { useQuery } from '@tanstack/react-query';
import { Estate } from '../components/types';
import { EstateToken } from './useGraph';

export type EstateTokenData = EstateToken & Estate;

async function fetchMetadata(tokenId: string, tokenURI: string): Promise<Estate> {
  const ipfsUrl = `https://${process.env.NEXT_PUBLIC_IPFS_PINATA_GATEWAY}/ipfs/${tokenURI.split('ipfs://')[1]}`;

  try {
    const metadataResponse = await fetch(ipfsUrl);
    if (!metadataResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const metadata: Estate = await metadataResponse.json();
    return metadata;
  } catch (error) {
    console.error('Failed to fetch metadata for token', { tokenId, tokenURI }, error);
    throw error;
  }
}

export const useMetadata = (tokenId: string, tokenURI: string) => {
  return useQuery({
    queryKey: ['estateMetadata', tokenId, tokenURI],
    queryFn: () => fetchMetadata(tokenId, tokenURI),
    enabled: !!tokenId && !!tokenURI,  // Only run the query if tokenId and tokenURI are provided
  });
};
