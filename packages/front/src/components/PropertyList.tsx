import React from 'react';
import { CircularProgress, Paper, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home'; // Example icon for property data
import { EstateTokenData } from '../hooks/useGraphMetaData';


interface Props {
  loading: boolean;
  error: boolean;
  data?: EstateTokenData[] | null;
}

export const PropertyList: React.FC<Props> = ({ loading, error, data }) => {
  const router = useRouter();

  const handleCardClick = (tokenId: string) => {
    router.push(`/properties/${tokenId}`); // Navigate to property detail page
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {loading && <CircularProgress />}
      {error && <Typography>No properties owned</Typography>}
      {!loading && !error && data && data.map((estate, index) => (
        <Paper
          key={index}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            borderRadius: '16px',
            cursor: 'pointer',
            border: '1px solid #ccc',
            width: '100%',
          }}
          onClick={() => handleCardClick(estate.tokenId)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HomeIcon />
            <Typography variant="h6">Token ID: {estate.tokenId}</Typography>
          </Box>
          <Typography variant="body2">Token URI: {estate.tokenURI}</Typography>
        </Paper>
      ))}
    </Box>
  );
};
