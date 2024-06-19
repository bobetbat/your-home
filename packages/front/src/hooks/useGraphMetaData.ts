// TODO: refactor, query not managed properly
import { useQuery } from '@tanstack/react-query';
import { EstateTokenData } from '../config/types';

const endpoint = 'https://api.studio.thegraph.com/query/22641/estate/0.0.2';

const headers = {
  "content-type": "application/json",
  // "Authorization": "<token>"
};

const graphqlQuery = {
  "query": `{
    estateMints {
      to
      tokenId
      tokenURI
    }
  }`,
};

async function fetchGraphData() {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(graphqlQuery)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function fetchMetadata(tokens: EstateTokenData[]): Promise<EstateTokenData[]> {
  const results = await Promise.allSettled(tokens.map(async token => {
    const ipfsUrl = `https://${process.env.NEXT_PUBLIC_IPFS_PINATA_GATEWAY}/ipfs/${token.tokenURI.split('ipfs://')[1]}`;

    try {
      const metadataResponse = await fetch(ipfsUrl);
      const metadata: EstateTokenData = await metadataResponse.json();
      console.log('metadata:', metadata);
      return { ...token, ...metadata };  // Merge metadata with token data
    } catch (error) {
      console.error('Failed to fetch metadata for token', token, error);
      throw error;  // Re-throw to mark this promise as rejected
    }
  }));

  // Filter out the results to only include successfully resolved promises
  return results.filter(result => result.status === 'fulfilled')
    .map((result:any) => result.value);
}

export const useGraphMetaData = () => {
  return useQuery({
    queryKey: ['graphData'], queryFn: async () => {
      const data = await fetchGraphData();
      const tokensWithMetadata = await fetchMetadata(data.data.estateMints);
      console.log('tokensWithMetadata', tokensWithMetadata)
      return tokensWithMetadata;
    }
  });
};
