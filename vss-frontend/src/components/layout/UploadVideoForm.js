import React, { useState, useContext } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useDropzone } from 'react-dropzone';
import CustomPrimaryButton from '../common/CustomPrimaryButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputWithLabel from '../common/InputWithLabel';
import { getS3SignedUrl, uploadFileToS3, addVideoEntry } from '../../api/videoApi';
import { SnackbarContext } from '../../context/SnackbarContext';


const UploadFormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  maxWidth: 800,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#464B54',
}));

const DropzoneContainer = styled(Box)(({ theme }) => ({
  border: '2px dashed white',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  height: '300px',
  cursor: 'pointer',
  transition: 'border .24s ease-in-out',
}));

const RightSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  height: '100%',
}));

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const { openSnackbar } = useContext(SnackbarContext);

  const onDrop = (acceptedFiles) => {
    const mp4File = acceptedFiles.find((file) => file.type === 'video/mp4');
    if (mp4File && mp4File.size <= 60 * 1024 * 1024) {
        setFile(mp4File);
    } else {
      openSnackbar('Please upload an MP4 file with size less than 30MB.', 'error');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4']
    },
    multiple: false,
  });

  const handleUpload = async (file, title, description) => {
    try {
      const { videoId, uploadUrl } = await getS3SignedUrl();
      await uploadFileToS3(uploadUrl, file, file.type);
      await addVideoEntry(videoId, title, description);
      openSnackbar('Video uploaded successfully!', 'success');
    } catch (error) {
      openSnackbar('Error uploading file: ' + error.message, 'error');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file && title) {
      handleUpload(file, title, description);
      setTitle('');
      setDescription('');
      setFile(null);
    } else {
      openSnackbar('Please fill in all required fields.', 'warning');
    }
  };

  return (
    <UploadFormContainer elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            {file ? (
              <Typography variant="body1">{file.name}</Typography>
            ) : (
                <Box>
                    <CloudUploadIcon sx={{ fontSize: 60, color:'white', opacity: '0.5' }} />
                    <Typography variant="body1" color="white" fontWeight="500">Upload a mp4 file here (max size:30MB)</Typography>
                </Box>
            )}
          </DropzoneContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <RightSection>
            <InputWithLabel
              label="Title *"
              value={title}
              setValue={setTitle}
              type="text"
              placeholder="Enter title"
            />

            <InputWithLabel
                label="Description"
                value={description}
                setValue={setDescription}
                type="text"
                placeholder="Add a description" 
            />

            <CustomPrimaryButton
                label="Upload"
                onClick={handleSubmit}
            />
          </RightSection>
        </Grid>
      </Grid>
    </UploadFormContainer>
  );
};

export default UploadForm;
