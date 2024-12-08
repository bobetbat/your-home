// import React from 'react';
// import { Container, Typography, Button, Stack } from '@mui/material';
// import { Layout } from './Layout';
// import { useNavigate } from 'react-router';
// import { useContract } from '../hooks/useContract';
// import { contractAddress, localContractAddress } from '../mocks';
// import RentContract from '../../abi/RentContract.json';
// import { useContractWrite, usePrepareContractWrite, useProvider } from "wagmi";
// import { BigNumber } from 'ethers';

// export const GetPropertiesButton: React.FC = () => {

//   const { config } = usePrepareContractWrite({
//     address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
//     abi: [
//       {
//         name: 'getNumberOfProperties',
//         type: 'function',
//         stateMutability: 'nonpayable',
//         inputs: [
//           { internalType: 'uint256', name: '_landlord', type: 'uint256' },
//         ],
//         outputs: [],
//       },
//     ],
//     args: ['0x577dD1DC79A13e02b07581BF1D31D3C585f9B4E7'],
//     enabled: Boolean(true),
//     functionName: 'getNumberOfProperties',
//   })
//   //Mint Function
//   const {
//     data,
//     write: getNumberOfProperties,
//     isLoading: loading,
//     isSuccess: isMintStarted,
//     error,
//   } = useContractWrite(config);
//   // console.log('data', data)
//   return (
//     <Container>
//       <Typography variant="h1">{loading}</Typography>
//       <Typography variant="h1">{error?.message ?? ''}</Typography>
//       <Typography variant="h1">{data?.hash ?? 'no hash'}</Typography>
//       <Stack mt='2rem' gap={1} direction='row' justifyContent='space-evenly'>
//         <Button size='large' variant='contained' onClick={getNumberOfProperties}>getNumberOfProperties</Button>
//       </Stack>
//     </Container>
//   );
// }

