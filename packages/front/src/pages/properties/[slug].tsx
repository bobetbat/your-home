import React from 'react';
import { Layout } from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { incrementByAmount } from '../../store/reducers/counter';
import { useRouter } from 'next/router';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Tooltip,
  IconButton,
  Stack,
} from '@mui/material';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ConciergeIcon from '@mui/icons-material/Person';
import ElectricityIcon from '@mui/icons-material/Bolt';
import WaterIcon from '@mui/icons-material/Opacity';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const mockdata = {
  id: "1234",
  title: "123 Main St, City, State Zip",
  images: ['/logo-dark.svg'],
  area: { size: 1000, unit: "sqft" },
  building: {
    name: "The Tower",
    address: "123 Main St, City, State Zip",
    yearBuilt: 2015,
    floors: 20,
    amenities: [
      { icon: <PoolIcon />, text: "Swimming Pool" },
      { icon: <FitnessCenterIcon />, text: "Fitness Center" },
      { icon: <ConciergeIcon />, text: "24-Hour Concierge" },
    ],
  },
  consumption: {
    electricity: { usage: 200, unit: "kWh" },
    water: { usage: 500, unit: "gal" }
  },
  price: { amount: 2500, currency: "USD", period: "month" }
};

const offers = [
  { id: 1, address: '0x2093jr2094j0924j2049k193e3290', starting: '2024-07-01', ending: '2025-06-30' },
  { id: 2, address: '0x2093jr2094j0924j2049k193e3290', starting: '2024-08-01', ending: '2025-07-31' },
  { id: 3, address: '0x2093jr2094j0924j2049k193e3290', starting: '2024-09-01', ending: '2025-08-31' },
];

const Contract: React.FC = () => {
  const counter = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(incrementByAmount(1));
    router.push('/contract/0x123');
  };

  const handleApprove = () => {
    alert('Approved tenant');
  };

  const handleDecline = () => {
    alert('Declined tenant');
  };

  return (
    <Layout header footer>
      <Paper sx={{ p: 2, mb: 4, borderRadius: 2, border: '1px solid #ccc', width: '100%', height: 'auto' }}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} sm={3}>
            <Box component="img" src={mockdata.images[0]} alt={mockdata.title} sx={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 1 }}>
              Building Details
            </Typography>
            <Typography variant="body1" textAlign="start">
              Name: {mockdata.building.name}
            </Typography>
            <Typography variant="body1" textAlign="start">
              Address: {mockdata.building.address}
            </Typography>
            <Typography variant="body1" textAlign="start">
              Year Built: {mockdata.building.yearBuilt}
            </Typography>
            <Typography variant="body1" textAlign="start">
              Floors: {mockdata.building.floors}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 1 }}>
              Amenities
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, marginTop: 1 }}>
              {mockdata.building.amenities.map((amenity, index) => (
                <Tooltip title={amenity.text} key={index}>
                  {amenity.icon}
                </Tooltip>
              ))}
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
              Consumption
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Tooltip title="Electricity Usage">
                  <ElectricityIcon />
                </Tooltip>
                <Typography variant="body1" textAlign="start">
                  {mockdata.consumption.electricity.usage} {mockdata.consumption.electricity.unit}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Tooltip title="Water Usage">
                  <WaterIcon />
                </Tooltip>
                <Typography variant="body1" textAlign="start">
                  {mockdata.consumption.water.usage} {mockdata.consumption.water.unit}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 1 }}>
                Status
              </Typography>
              <Typography variant="body1" textAlign="start">
                Active
              </Typography>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 1 }}>
                Price
              </Typography>
              <Typography variant="body1" textAlign="start">
                {mockdata.price.amount} {mockdata.price.currency} per {mockdata.price.period}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton aria-label="edit" color="primary">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="list" color="primary">
                <ListIcon />
              </IconButton>
              <IconButton aria-label="delete" color="secondary">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box>
        <Stack pb={3}>
          <Typography variant='h3'>Applications:</Typography>
        </Stack>
        {offers.map((offer) => (
          <Paper key={offer.id} sx={{ p: 2, mb: 2, borderRadius: 2, border: '1px solid #ccc' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" fontWeight="bold">Address:</Typography>
                <Typography variant="body1">{offer.address}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1">Starting: {offer.starting}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1">Ending: {offer.ending}</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Accept">
                    <IconButton aria-label="accept" color="primary" onClick={handleApprove}>
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Decline">
                    <IconButton aria-label="decline" color="secondary" onClick={handleDecline}>
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="More>">
                    <IconButton aria-label="more" color="primary" onClick={handleApprove}>
                      <ListIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </Layout>
  );
};

export default Contract;
