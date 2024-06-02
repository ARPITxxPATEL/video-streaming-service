import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Grid} from '@mui/material';
import VideoTile from '../common/VideoTile'; 
import UploadVideoForm from './UploadVideoForm';
import { getUserVideos } from '../../api/videoApi';

const ProfileTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [videos, setVideos] = React.useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getUserVideos(user.user_id)
      .then(setVideos)
      .catch((error) => console.error('Error fetching user videos:', error));
  }, [user.user_id]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);

    if(newIndex === 0) {
      getUserVideos(user.user_id)
        .then(setVideos)
        .catch((error) => console.error('Error fetching user videos:', error));
    }
  };

  return (
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
                <VideoTile video={video} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tabIndex === 1 && (
        <UploadVideoForm />
      )}
    </Box>
  );
};

export default ProfileTabs;
