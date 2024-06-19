import React from 'react';
import { Layout } from '../../components/Layout';
import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { PropertyList } from '../../components/PropertyList';
import { useGraphMetaData } from '../../hooks/useGraphMetaData';
import { useGraph } from '../../hooks/useGraph';
import { useMetadata } from '../../hooks/useMetadata';


const Properties: React.FC = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGraphMetaData() // todo: do not use, query not managed create 3rd hook that uses useGraph and useMetadata
  // const { data: graphData, error: graphError, isLoading: graphLoading } = useGraph();
  // const { data: tokenMetadata, error: tokenError, isLoading: tokenLoading } = useMetadata(
  //   graphData?.[0]?.tokenId ?? '',
  //   graphData?.[0]?.tokenURI ?? ''
  // );
  // console.log('graphData:', graphData)
  // console.log('tokenMetadata:', tokenMetadata)

  return (
    <Layout header footer>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant='h3'>Properties</Typography>
        <Button onClick={() => router.push('/properties/create')}>Add Property</Button>
      </Stack>
      <PropertyList loading={isLoading} error={isError} data={data} />
    </Layout>
  )
}

export default Properties
