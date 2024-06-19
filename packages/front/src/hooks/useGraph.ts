import { useQuery } from '@tanstack/react-query';

const endpoint = 'https://api.studio.thegraph.com/query/22641/estate/0.0.2';

const headers = {
  "content-type": "application/json",
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

export interface EstateToken {
  tokenURI: string;
  to: string;
  tokenId: string;
}

async function fetchGraphData(): Promise<EstateToken[]> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(graphqlQuery)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const result = await response.json();
  return result.data.estateMints;
}

export const useGraph = () => {
  return useQuery<EstateToken[]>({
    queryKey: ['estates'],
    queryFn: fetchGraphData,
  });
};
