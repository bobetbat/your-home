import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { SelectInput, SelectInputProps } from './inputs/Select';
import { TextInput } from './inputs/Text';

// Enums for dropdown options
enum PropertyType {
  Residential = 'Residential',
  Commercial = 'Commercial',
  Agricultural = 'Agricultural'
}

enum BuildingType {
  House = 'House',
  Apartment = 'Apartment',
  CommercialBuilding = 'Commercial Building'
}

enum ConstructionType {
  Concrete = 'Concrete',
  Wood = 'Wood',
  SteelFrame = 'Steel Frame'
}

export interface Estate {
  coordinates: string;
  propertyAddress: string;
  propertyArea: number;
  propertyType: PropertyType;
  buildingType: BuildingType;
  buildYear: number;
  title: string;
  constructionType: ConstructionType;
  utilities: string[];
  amenities: string[];
  landArea: number;
  floor: number;
  electricity: boolean;
  waterSupply: boolean;
  hotWaterSupply: boolean;
}

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

export const MintEstateForm: React.FC<{ onSubmit: (data: Estate) => void }> = ({ onSubmit }) => {
  const { control, register, handleSubmit, formState: { isSubmitting } } = useForm<Estate>({
    defaultValues: {
      utilities: [],
      amenities: []
    }
  });
  // TODO: solve array inputs
  // const { fields: utilityFields, append: appendUtility, remove: removeUtility } = useFieldArray<Estate, never, "id">({
  //   control,
  //   name: "utilities"
  // });
  // const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray<Estate>({
  //   control,
  //   name: "amenities"
  // });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextInput name="coordinates" label="Coordinates" control={control} required />
        <TextInput name="propertyAddress" label="Property Address" control={control} required />
        <TextInput name="propertyArea" label="Property Area (sq meters)" type="number" control={control} required />
        <SelectInput name="propertyType" label="Property Type" control={control} options={propertyOptions} required />
        <SelectInput name="buildingType" label="Building Type" control={control} options={buildingOptions} required />
        <TextInput name="buildYear" label="Year Built" type="number" control={control} required />
        <TextInput name="title" label="Title" control={control} required />
        <SelectInput name="constructionType" label="Construction Type" control={control} options={constructionOptions} required />

        {/* <Box>
          {utilityFields.map((field, index) => (
            <Box key={field.id}>
              <TextField {...register(`utilities.${index}` as const)} label="Utility" variant="outlined" />
              <Button onClick={() => removeUtility(index)}>Remove</Button>
            </Box>
          ))}
          <Button onClick={() => appendUtility({})}>Add Utility</Button>
        </Box>
        <Box>
          {amenityFields.map((field, index) => (
            <Box key={field.id}>
              <TextField {...register(`amenities.${index}` as const)} label="Amenity" variant="outlined" />
              <Button onClick={() => removeAmenity(index)}>Remove</Button>
            </Box>
          ))}
          <Button onClick={() => appendAmenity({})}>Add Amenity</Button>
        </Box> */}

        <TextInput name="landArea" label="Land Area (sq meters)" type="number" control={control} />
        <TextInput name="floor" label="Floor" type="number" control={control} />
        <FormControlLabel control={<Checkbox {...register("electricity")} />} label="Electricity Available" />
        <FormControlLabel control={<Checkbox {...register("waterSupply")} />} label="Water Supply Available" />
        <FormControlLabel control={<Checkbox {...register("hotWaterSupply")} />} label="Hot Water Supply Available" />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Mint Estate
        </Button>
      </Box>
    </form>
  );
};
