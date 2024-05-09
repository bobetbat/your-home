import React, { useRef, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Paper, Typography } from '@mui/material';
import { MintEstateForm } from '../../components/MintEstateForm';
import { useMintEstateToken } from '../../hooks/useMintEstate';


const CreateProperty: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const { mint, loading, error } = useMintEstateToken()


  const handleMintEstate = async (object: Record<string, any>) => {
    try {
      setUploading(true);
      // const data = JSON.stringify(object);

      const data = new FormData();
      console.log('data', data)
      // TODO: change empty blob to 3d object
      data.append("file", new Blob());

      const metadata = JSON.stringify(object);
      data.append("keyvalues", metadata);

      // const options = JSON.stringify({
      //   cidVersion: 0,
      // });
      // formData.append("pinataOptions", options);

      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "post",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_IPFS_PINATA_JWT}`,
        },
        body: data,
      });

      const { IpfsHash } = await res.json();
      console.log('IpfsHash', IpfsHash);

      const ipfsUrl = "ipfs://" + String(IpfsHash)
      const mintData = await mint(ipfsUrl);

      setUploading(false);
      console.log('mintData', mintData);

    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  return (
    <Layout header footer>
      <Typography variant='h3'>
        Add property
      </Typography>
      <Paper sx={{ p: 2 }}>
        <MintEstateForm onSubmit={handleMintEstate} />
      </Paper>
    </Layout>
  )
}

export default CreateProperty
