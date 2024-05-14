import React from 'react';
import { CircularProgress, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material';

interface Estate {
  tokenId: string;
  tokenURI: string;
}

interface Props {
  loading: boolean;
  error: boolean;
  data: Estate[] | null;
}

export const PropertyList: React.FC<Props> = ({ loading, error, data }) => (
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
    {loading && <CircularProgress />}
    {error && <Typography>No properties owned</Typography>}
    {!loading && !error && data && (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Token ID</TableCell>
            <TableCell>Token URI</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((estate, index) => (
            <TableRow key={index}>
              <TableCell>{estate.tokenId}</TableCell>
              <TableCell>{estate.tokenURI}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" color="primary">Edit</Button>
                  <Button variant="outlined" color="secondary">Delete</Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </Paper>
);

