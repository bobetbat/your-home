import React from 'react';
import { TextField } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

export interface TextInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  control: Control<T>;
  required?: boolean;
}

export const TextInput = <T extends FieldValues>({ name, label, type = 'text', control, required = false }: TextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required && `${label} is required` }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          type={type}
          label={label}
          error={!!error}
          helperText={error ? error.message : null}
          {...field}
        />
      )}
    />
  );
}
