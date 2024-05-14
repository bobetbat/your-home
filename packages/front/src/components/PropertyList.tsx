import React from 'react';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface Estate {
  tokenId: string;
  tokenURI: string;
}

interface Props {
  loading: boolean;
  error: boolean;
  data: Estate[] | null;
}

export const PropertyList: React.FC<Props> = ({ loading, error, data }) => {
  const router = useRouter();

  const handleRowClick = (tokenId: string) => {
    router.push(`/properties/${tokenId}`); // Navigate to property detail page
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {loading && <CircularProgress />}
      {error && <Typography>No properties owned</Typography>}
      {!loading && !error && data && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>Token ID</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>Token URI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((estate, index) => (
              <TableRow key={index} sx={{ cursor: 'pointer' }} onClick={() => handleRowClick(estate.tokenId)}>
                <TableCell>{estate.tokenId}</TableCell>
                <TableCell>{estate.tokenURI}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};
