import React from 'react';
import { Card, CardContent} from '@mui/joy';
import { CardMedia, Typography } from '@mui/material';
import { getThumbnailImageURL } from '../../api/videoApi';

const VideoTile = ({ video }) => {
  return (
    <>
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
    </>
  )
}

export default VideoTile;