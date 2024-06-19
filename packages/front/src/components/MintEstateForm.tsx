import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import { SelectInput, SelectInputProps } from './inputs/Select';
import { TextInput } from './inputs/Text';
import { useMintEstateToken } from '../hooks/useMintEstate';

// Using previously defined enums and interfaces
import { PropertyType, BuildingType, ConstructionType, Estate, AmenityType } from '../config/types';

const propertyOptions: SelectInputProps<Estate>['options'] = [
  { label: 'Residential', value: PropertyType.Residential },
  { label: 'Commercial', value: PropertyType.Commercial },
  { label: 'Agricultural', value: PropertyType.Agricultural }
];

const buildingOptions: SelectInputProps<Estate>['options'] = [
  { label: 'House', value: BuildingType.House },
  { label: 'Apartment', value: BuildingType.Apartment },
  { label: 'Commercial Building', value: BuildingType.CommercialBuilding }
];

const constructionOptions: SelectInputProps<Estate>['options'] = [
  { label: 'Concrete', value: ConstructionType.Concrete },
  { label: 'Wood', value: ConstructionType.Wood },
  { label: 'Steel Frame', value: ConstructionType.SteelFrame }
];
export const mockdata: Estate = {
  id: "1234",
  images: ['/logo-dark.svg', '/logo-dark.svg', '/logo-dark.svg'],
  area: 1000,
  building: {
    address: "123 Main St, City, State Zip",
    yearBuilt: 2015,
    floors: 20,
    amenities: [
      AmenityType.SwimmingPool,
      AmenityType.FitnessCenter,
      AmenityType.Concierge
    ]
  },
  electricityUsage: 200,
  waterUsage: 500,
  propertyType: PropertyType.Residential,
  buildingType: BuildingType.Apartment,
  constructionType: ConstructionType.Concrete,
};

export const MintEstateForm: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const { mint, loading, error } = useMintEstateToken();
  const { control, register, handleSubmit: submit, formState: { isSubmitting } } = useForm<Estate>({
    defaultValues: mockdata // Use mockdata as default values
  });

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSubmit = useCallback(
    async (data: Estate) => {
      setOpen(true);
      try {
        await mint(data);
        setSuccess(true);
        onSubmit();
      } catch (e) {
        console.error(e);
        setSuccess(false);
      }
    },
    [mint, onSubmit],
  );

  const handleClose = () => {
    setOpen(false);
    setSuccess(null);
  };

  return (
    <>
      <form onSubmit={submit(handleSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextInput name="area" label="Area (sqft)" type="number" control={control} required />
          <TextInput name="building.address" label="Building Address" control={control} required />
          <TextInput name="building.yearBuilt" label="Year Built" type="number" control={control} required />
          <TextInput name="building.floors" label="Number of Floors" type="number" control={control} required />
          <SelectInput name="propertyType" label="Property Type" control={control} options={propertyOptions} required />
          <SelectInput name="buildingType" label="Building Type" control={control} options={buildingOptions} required />
          <SelectInput name="constructionType" label="Construction Type" control={control} options={constructionOptions} required />
          <TextInput name="electricityUsage" label="Electricity Usage (kWh)" type="number" control={control} required />
          <TextInput name="waterUsage" label="Water Usage (gal)" type="number" control={control} required />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Mint Estate
          </Button>
        </Box>
      </form>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{success === null ? 'Submitting Transaction' : success ? 'Transaction Successful' : 'Transaction Failed'}</DialogTitle>
        <DialogContent>
          {success === null ? (
            <CircularProgress />
          ) : success ? (
            <div>Success! Your estate has been minted.</div>
          ) : (
            <div>Something went wrong. Please try again.</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {success ? 'Close' : 'Try Again'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
