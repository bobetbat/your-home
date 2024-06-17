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
import { styled } from '@mui/material/styles';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ConciergeIcon from '@mui/icons-material/Person';
import ElectricityIcon from '@mui/icons-material/Bolt';
import WaterIcon from '@mui/icons-material/Opacity';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';

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
  { id: 1, title: 'Offer 1', description: 'Description for offer 1' },
  { id: 2, title: 'Offer 2', description: 'Description for offer 2' },
  { id: 3, title: 'Offer 3', description: 'Description for offer 3' },
];

const Image = styled('img')({
  // width: '200px',
  // height: '200px',
  objectFit: 'cover',
});

const AmenitiesWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  marginTop: '10px',
});

const ConsumptionWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  marginTop: '10px',
});

const TitleTypography = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1rem',
  marginBottom: '8px',
});

const ContentTypography = styled(Typography)({
  fontSize: '0.875rem',
  marginBottom: '8px',
});

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

  return (
    <Layout header footer>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Paper sx={{ p: 2, mb: 4, borderRadius: '16px', border: '1px solid #ccc', width: '100%', height: 'auto' }}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} sm={3}>
              <Image src={mockdata.images[0]} alt={mockdata.title} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TitleTypography variant="h6">
                Building Details
              </TitleTypography>
              <ContentTypography variant="body1" textAlign="start">
                Name: {mockdata.building.name}
              </ContentTypography>
              <ContentTypography variant="body1" textAlign="start">
                Address: {mockdata.building.address}
              </ContentTypography>
              <ContentTypography variant="body1" textAlign="start">
                Year Built: {mockdata.building.yearBuilt}
              </ContentTypography>
              <ContentTypography variant="body1" textAlign="start">
                Floors: {mockdata.building.floors}
              </ContentTypography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TitleTypography variant="h6">
                Amenities
              </TitleTypography>
              <AmenitiesWrapper>
                {mockdata.building.amenities.map((amenity, index) => (
                  <Tooltip title={amenity.text} key={index}>
                    {amenity.icon}
                  </Tooltip>
                ))}
              </AmenitiesWrapper>
              <TitleTypography variant="h6" sx={{ mt: 2 }}>
                Consumption
              </TitleTypography>
              <Stack >
                <Stack direction='row'>
                  <Tooltip title="Electricity Usage">
                    <ElectricityIcon />
                  </Tooltip>
                  <ContentTypography variant="body1" textAlign="start">
                    {mockdata.consumption.electricity.usage} {mockdata.consumption.electricity.unit}
                  </ContentTypography>
                </Stack>
                <Stack direction='row'>
                  <Tooltip title="Water Usage">
                    <WaterIcon />
                  </Tooltip>
                  <ContentTypography variant="body1" textAlign="start">
                    {mockdata.consumption.water.usage} {mockdata.consumption.water.unit}
                  </ContentTypography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ mb: 2 }}>
                <TitleTypography variant="h6">
                  Status
                </TitleTypography>
                <ContentTypography variant="body1" textAlign="start">
                  Active
                </ContentTypography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <TitleTypography variant="h6">
                  Price
                </TitleTypography>
                <ContentTypography variant="body1" textAlign="start">
                  {mockdata.price.amount} {mockdata.price.currency} per {mockdata.price.period}
                </ContentTypography>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px' }}>
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
          {offers.map((offer) => (
            <Paper key={offer.id} sx={{ p: 2, mb: 2, borderRadius: '16px', border: '1px solid #ccc' }}>
              <TitleTypography variant="h6">{offer.title}</TitleTypography>
              <ContentTypography variant="body1">{offer.description}</ContentTypography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Contract;
