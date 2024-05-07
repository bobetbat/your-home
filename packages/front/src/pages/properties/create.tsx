import React from 'react';
import { Layout } from '../../components/Layout';
import { Paper, Typography } from '@mui/material';
import { MintEstateForm } from '../../components/MintEstateForm';


const CreateProperty: React.FC = () => {
  return (
    <Layout header footer>
      <Typography variant='h3'>
        Add property
      </Typography>
      <Paper sx={{ p: 2 }}>
        <MintEstateForm />
      </Paper>
    </Layout>
  )
}

export default CreateProperty
