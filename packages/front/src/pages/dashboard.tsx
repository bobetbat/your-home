import React from 'react';
import { Layout } from '../components/Layout';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { PropertyList } from '../components/PropertyList';
import { useGraphMetaData, getItems } from '../hooks/useGraphMetaData';


const Dashboard: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useGraphMetaData(getItems)

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
