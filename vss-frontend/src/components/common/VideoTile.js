import React, { useContext } from 'react';
import { Card, CardContent} from '@mui/joy';
import { CardMedia, Typography, styled } from '@mui/material';
import { getThumbnailImageURL, getS3SignedCookieForVideo } from '../../api/videoApi';

import VideoPlayer from './VideoPlayer';
import { FullscreenContext } from '../../context/FullscreenContext';
import { SnackbarContext } from '../../context/SnackbarContext';

const CardWrapper = styled(Card)(() => ({
  background: '#1f2124',
  color: 'white',
  border: '1px solid #2F3237',
  borderRadius: '12px',
  cursor: 'pointer',
  '&:hover': {
    background: '#464B54'
  },
}));

const VideoTile = ({ video }) => {
  const { isFullscreen, setIsFullscreen } = useContext(FullscreenContext);
  const { openSnackbar } = useContext(SnackbarContext);

  const handleOnClick = async () => {
    try{
      const response = await getS3SignedCookieForVideo(video.video_id);
      video.video_url = response.videoUrl;
      setIsFullscreen(true);
    } catch (error) {
      openSnackbar('Error fetching video.', 'error');
    }
  }

  return (
    <>
      <CardWrapper onClick={handleOnClick}>
        <CardMedia
          component="img"
          alt={video.title}
          height="140"
          image={getThumbnailImageURL(video.video_id)}
          title={video.title}
          sx={{ borderRadius: '12px' }}
        />
        <CardContent>
          <Typography variant="h6" noWrap>
            {video.title}
          </Typography>
        </CardContent>
      </CardWrapper>

      {isFullscreen && <VideoPlayer videoUrl={video.video_url} onClose={() => setIsFullscreen(false)} />}
    </>
  )
}

export default VideoTile;