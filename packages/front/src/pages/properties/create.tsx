import React from 'react';
import { Layout } from '../../components/Layout';
import { Paper, Typography } from '@mui/material';
import { MintEstateForm } from '../../components/MintEstateForm';
import { useRouter } from 'next/router';


const CreateProperty: React.FC = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/properties')
  }

  return (
    <Layout header footer>
      <Typography variant='h3'>
        Add property
      </Typography>
      <Paper sx={{ p: 2 }}>
        <MintEstateForm onSubmit={handleSubmit} />
      </Paper>
    </Layout>
  )
}

export default CreateProperty
