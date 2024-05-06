import React, { useMemo, useState } from 'react';
import { Layout } from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { incrementByAmount } from '../../store/reducers/counter';
// import { useParams } from 'react-router-dom';
import { Box, Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ProgressBar } from '../../components/ProgressBar';
import { useQuery } from '@apollo/client';
import { GET_TENANT_PROPOSALS_BY_PROPERTY_ID } from '../../config/query';
import { useAccount } from 'wagmi';
import { MintEstateForm } from '../../components/MintEstateForm';


const Contract: React.FC = () => {

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

export default Contract
