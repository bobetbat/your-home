import React, { useMemo, useState } from 'react';
import { Layout } from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { incrementByAmount } from '../../store/reducers/counter';
// import { useParams } from 'react-router-dom';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ProgressBar } from '../../components/ProgressBar';
import { useQuery } from '@apollo/client';
import { GET_TENANT_PROPOSALS_BY_TENANT } from '../../config/query';
import { useAccount } from 'wagmi';
// import { useMintEstateToken } from '../../hooks/useMintEstate';
import { CircularProgress } from '@mui/material';
import { useReadEstate } from '../../hooks/useReadEstate';

const apartment
// : Apartment 
= {
  id: 1,
  address: "123 Main St, Anytown, AN",
  rooms: 3,
  size: 120, // square meters
  isFurnished: true,
  amenities: ["pool", "gym", "parking"],
};

const Contracts: React.FC = () => {
  const dispatch = useDispatch()
  const { address, isConnecting, isDisconnected } = useAccount()
    const router = useRouter();

  const [tokenId, setTokenId] = useState(0)
  const [propertyId, setPropertyId] = useState(0)
  const stage = useMemo(() => router.query.stage, [router.query.stage])
  // const { mint,loading:loadingMint,error:errorMint} =useMintEstateToken()
  // console.log('address', address)
  const {data,loading,error} = useReadEstate(12)
  // console.log('data',data)

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const response = await fetch('/api/submitApartment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apartment }),
    });
    const data = await response.json();
    console.log(data);
 };


  return (
    <Layout header footer>
      <Typography variant='h2'>Mint</Typography>
      <Button onClick={handleSubmit}>MINT</Button>

      {/* <Paper sx={{ p: 2,display:'flex' }}>
        {loadingMint ? <CircularProgress /> : null}
        {errorMint ? errorMint : null }
        <Button onClick={(e) => mint(11)}> MINT</Button>
      </Paper> */}
      <Typography variant='h2'>Properties</Typography>
      <Paper sx={{ p: 2,display:'flex' }}>
        {loading ? <CircularProgress /> : null}
        {error ? error : null }
      </Paper>
      <Paper>
         {/* <List>
          {(data && data.tenantProposalSubmitteds) ? data.tenantProposalSubmitteds.map((proposal: any) => <ListItemButton onClick={() => router.push(`/contract/${proposal.propertyId}`)} key={proposal.proposalId}>
            <ListItemText primary={short(proposal.id)} />
          </ListItemButton>) : null}
        </List> */}
      </Paper>
    </Layout>
  )
}

export default Contracts
