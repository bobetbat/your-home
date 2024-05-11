import React, { useRef, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Paper, Typography } from '@mui/material';
import { MintEstateForm } from '../../components/MintEstateForm';
import { useMintEstateToken } from '../../hooks/useMintEstate';


const CreateProperty: React.FC = () => {
  const { mint, loading, error } = useMintEstateToken()



  return (
    <Layout header footer>
      <Typography variant='h3'>
        Add property
      </Typography>
      <Paper sx={{ p: 2 }}>
        <MintEstateForm onSubmit={mint} />
      </Paper>
    </Layout>
  )
}

export default CreateProperty
