import React, { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ProgressBar } from '../components/ProgressBar';
import { useQuery } from '@apollo/client';
import { GET_TENANT_PROPOSALS_BY_TENANT } from '../config/query';
import { useAccount } from 'wagmi';
// import { useMintEstateToken } from '../../hooks/useMintEstate';
import { CircularProgress } from '@mui/material';
import { getItems, useGraph } from '../hooks/useGraph';
import { PropertyList } from '../components/PropertyList';


const Dashboard: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useGraph(getItems)
  return (
    <Layout header footer>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant='h3'>Properties</Typography>
        <Button onClick={() => router.push('/properties/create')}>Add Property</Button>
      </Stack>
      <PropertyList loading={loading} error={error} data={data} />

      <Typography variant='h3'>Offers</Typography>
      <Paper sx={{ p: 2, display: 'flex' }}>
        {loading ? <CircularProgress /> : null}
        {error ? error : null}
      </Paper>
      <Paper>

      </Paper>
    </Layout>
  )
}

export default Dashboard
