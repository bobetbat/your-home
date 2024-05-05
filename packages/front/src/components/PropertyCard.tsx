import React from 'react';
import { Button, Card, CardContent, CardHeader, CardMedia, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { incrementByAmount } from '../store/reducers/counter';

export const PropertyCard: React.FC = () => {
  const counter = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(incrementByAmount(2))
  }

  return (
    <Card>
      <CardContent>
        <Stack gap={2}>
          <Typography textAlign='start' variant='h4'>Accommodations {counter}</Typography>
          <Stack gap={2} mt={1}>
            <TextField id="outlined-basic" label="Address" variant="outlined" />
            <Button onClick={handleClick} variant='contained' color='primary'> click me </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
