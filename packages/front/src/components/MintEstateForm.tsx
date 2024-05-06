import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { useMintEstateToken } from '../hooks/useMintEstate';

type FormValues = {
  area: string;
  rooms: string;
  yearBuilt: string;
  material: string;
  ipfs3DModelLink: string;
  owner: string;
};

export const MintEstateForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const { mint, loading, error } = useMintEstateToken()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
  console.log('MintEstateForm:data', data)
    
    mint(data); // Here you would call your mint function

  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Area (sq meters)"
          variant="outlined"
          {...register("area", { required: true })}
          error={Boolean(errors.area)}
          helperText={errors.area ? "Area is required" : ""}
        />
        <TextField
          label="Number of Rooms"
          variant="outlined"
          {...register("rooms", { required: true })}
          error={Boolean(errors.rooms)}
          helperText={errors.rooms ? "Number of rooms is required" : ""}
        />
        <TextField
          label="Year Built"
          variant="outlined"
          {...register("yearBuilt", { required: true })}
          error={Boolean(errors.yearBuilt)}
          helperText={errors.yearBuilt ? "Year Built is required" : ""}
        />
        <TextField
          label="Building Material"
          variant="outlined"
          {...register("material", { required: true })}
          error={Boolean(errors.material)}
          helperText={errors.material ? "Material is required" : ""}
        />
        <TextField
          label="IPFS Link to 3D Model"
          variant="outlined"
          {...register("ipfs3DModelLink", { required: true })}
          error={Boolean(errors.ipfs3DModelLink)}
          helperText={errors.ipfs3DModelLink ? "IPFS Link is required" : ""}
        />
        <Button type="submit" variant="contained">Mint Estate</Button>
      </Box>
    </form>
  );
};
