import { useState, useEffect } from 'react';

const endpoint = 'https://api.studio.thegraph.com/query/22641/zk-estate/0.0.3';
const headers = {
  "content-type": "application/json",
  // "Authorization": "<token>"
};
interface Query {
  query: string;
}
export const getItems: Query = {
  "query": `{
    estateMints {
      to
      tokenId
      tokenURI
    }
  }`,
};
export interface EstateTokenData {
  tokenURI: string;
  to: string;
  tokenId: string;
  metadata?: any;  // Optional field to store metadata
}

export const useGraphMetaData = (graphqlQuery: any) => {
  const [data, setData] = useState<EstateTokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(graphqlQuery)
        };
        const response = await fetch(endpoint, options);
        const data = await response.json();

        // Additional function to fetch metadata for each token
        const fetchMetadata = async (tokens: EstateTokenData[]) => {
          return Promise.all(tokens.map(async token => {
            // TODO: do not fetch old tokens metadata
            if (Number(token.tokenId) > 4) {
              const ipfsUrl = `https://${process.env.NEXT_PUBLIC_IPFS_PINATA_GATEWAY}/ipfs/${token.tokenURI.split('ipfs://')[1]}`;
              const metadataResponse = await fetch(ipfsUrl);
              const metadata = await metadataResponse.json();
              if (metadata) {
                return { ...token, ...metadata };  // Merge metadata with token data
              }
            }
            return { ...token };
          }));
        };

        // Fetch and update state with metadata
        const tokensWithMetadata = await fetchMetadata(data.data.estateMints);
        setData(tokensWithMetadata);
        console.log("fetch data with metadata:", tokensWithMetadata);
      } catch (error) {
        console.error("error fetching contract data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
