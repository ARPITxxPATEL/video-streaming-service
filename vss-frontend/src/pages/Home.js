import React, { useEffect, useState, useContext } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getAllVideosURL, getThumbnailImageURL } from '../api/videoApi'; 
import { SnackbarContext } from '../context/SnackbarContext';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const { openSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getAllVideosURL();
        setVideos(response.data);
        console.log(response.data)
      } catch (error) {
        openSnackbar(error, 'error');
      }
    };

    fetchVideos();
  }, []);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        
        {videos.length>0 && (videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video.video_id}>
            <Card>
              <CardMedia
                component="img"
                alt={video.title}
                height="140"
                image={getThumbnailImageURL(video.video_id)}
                title={video.title}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {video.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )))}

        {videos.length === 0 && (
          <Typography variant="h6">No videos found.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
