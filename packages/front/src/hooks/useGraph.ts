import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// import { providers } from 'ethers';
// import { useProvider } from "wagmi";
// import Lock from '../../abi/Lock.json';

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
}

export const useGraph = (graphqlQuery: Query) => {
  const [data, setData] = useState<EstateTokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          "method": "POST",
          "headers": headers,
          "body": JSON.stringify(graphqlQuery)
        };
        const response = await fetch(endpoint, options);
        const data = await response.json();

        setData(data.data.estateMints);
        console.log("fetch data:", data);
      } catch (error) {
        console.log("error Contract:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
};

