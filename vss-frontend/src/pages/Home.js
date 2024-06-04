import React, { useEffect, useState, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getAllVideos } from '../api/videoApi'; 
import { SnackbarContext } from '../context/SnackbarContext';
import VideoTile from '../components/common/VideoTile';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const { openSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    getAllVideos()
      .then(setVideos)
      .catch((error) => {
        console.error('Error fetching videos:', error);
        openSnackbar('Error fetching videos.', 'error');
      });
  }, []);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        
        {videos && videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video.video_id}>
            <VideoTile video={video} />
          </Grid>
        ))}

      </Grid>
    </Box>
  );
};

export default Home;
