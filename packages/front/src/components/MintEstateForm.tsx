import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

type FormValues = {
  area: string;
  rooms: string;
  yearBuilt: string;
  material: string;
  owner: string;
};

export const MintEstateForm: React.FC<{ onSubmit: (data: FormValues) => void }> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors, isLoading } } = useForm<FormValues>();

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
        <Button disabled={isLoading} type="submit" variant="contained">Mint Estate</Button>
      </Box>
    </form>
  );
};



// export default function Home() {

//   return (
//     <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
//       <input type="file" id="file" ref={inputFile} onChange={handleChange} />
//       <button disabled={uploading} onClick={() => inputFile.current.click()}>
//         {uploading ? "Uploading..." : "Upload"}
//       </button>
//     </main>
//   );
// }
