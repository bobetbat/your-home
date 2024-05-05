import React from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router';
import { useContract } from '../hooks/useContract';
import { contractAddress, localContractAddress } from '../mocks';
import RentContract from '../../abi/RentContract.json';
import { useContractWrite, usePrepareContractWrite, useProvider } from "wagmi";
import { BigNumber } from 'ethers';

export const AddPropertyButton: React.FC = () => {

  const { config } = usePrepareContractWrite({
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: [
      {
        name: 'addProperty',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { internalType: 'uint256', name: '_pricePerMonth', type: 'uint256' },
          { internalType: 'uint256', name: '_collateral', type: 'uint256' },
        ],
        outputs: [],
      },
    ],
    args: [BigNumber.from(10), BigNumber.from(100)],
    enabled: Boolean(true),
    functionName: 'addProperty',
  })
  //Mint Function
  const {
    data,
    write: addProperty,
    isLoading: loading,
    isSuccess: isMintStarted,
    error,
  } = useContractWrite(config);

  return (
      <Container>
        <Typography variant="h1">{loading}</Typography>
        <Typography variant="h1">{error?.message ?? ''}</Typography>
        <Typography variant="h1">{data?.hash ?? 'no hash'}</Typography>
        <Stack mt='2rem' gap={1} direction='row' justifyContent='space-evenly'>
          <Button size='large' variant='contained' onClick={addProperty}>Add Property</Button>
        </Stack>
      </Container>
  );
}

