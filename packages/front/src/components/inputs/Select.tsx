import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

export interface SelectInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: { label: string; value: string }[];
  required?: boolean;
}

export const SelectInput = <T extends FieldValues>({ name, label, control, options, required = false }: SelectInputProps<T>) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: required && `${label} is required` }}
        render={({ field }) => (
          <Select
            label={label}
            {...field}
            onChange={(e: SelectChangeEvent) => field.onChange(e.target.value)}
          >
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
