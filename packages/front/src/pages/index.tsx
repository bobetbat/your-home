import type { NextPage } from 'next';
import React from 'react';
import { Grid, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { Layout } from '../components/Layout';

import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  const handleSearchQueryChange = (value: string) => {
    router.push(`/offers?location=${value}`);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    router.query[filterName] = value;
    router.push(router);
  };

  return (
    <Layout header footer>
      <Grid container spacing={2} pt={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center">
            Find Your Dream Apartment
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SearchBar onChange={handleSearchQueryChange} />
        </Grid>
        <Grid item xs={12}>

        </Grid>
      </Grid>
    </Layout>
  );
};
export default Home
