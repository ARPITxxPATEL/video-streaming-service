import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Grid, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import { getUserVideos, getS3SignedUrl, uploadFileToS3, addVideoEntry } from '../api/videoApi';

const Profile = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [user, setUser] = useState({});
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Decode JWT token to get user info
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        username: decoded.username,
        email: decoded.email,
        userId: decoded.user_id,
      });
    }
  }, []);

  useEffect(() => {
    if (user.userId) {
      // Fetch user's videos
      getUserVideos(user.userId)
        .then(setVideos)
        .catch(error => console.error('Error fetching user videos:', error));
    }
  }, [user]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (file && title) {
      try {
        // Get signed URL for file upload
        const { videoId, uploadUrl } = await getS3SignedUrl();
        
        // Create a new file with the updated name
        const updatedFile = new File([file], `${videoId}.${file.name.split('.').pop()}`, {
          type: file.type,
        });

        // Upload file to S3
        await uploadFileToS3(uploadUrl, updatedFile, updatedFile.type);
        console.log('File uploaded successfully');

        // Add video entry to the database
        await addVideoEntry(videoId, title, description);
        console.log('Video entry added to the database');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('Title is required to upload a video');
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="h6">
        Username: {user.username}
      </Typography>
      <Typography variant="h6">
        Email: {user.email}
      </Typography>
      <Box mt={4}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="My Videos" />
          <Tab label="Upload Video" />
        </Tabs>
        {tabIndex === 0 && (
          <Box mt={2}>
            <Grid container spacing={2}>
              {videos.map((video) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={video.title}
                      height="140"
                      image={video.thumbnailUrl}
                      title={video.title}
                    />
                    <CardContent>
                      <Typography variant="h6" noWrap>
                        {video.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box mt={2}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <input type="file" accept="video/mp4" onChange={handleFileChange} />
            <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2 }} disabled={!file || !title}>
              Upload
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
