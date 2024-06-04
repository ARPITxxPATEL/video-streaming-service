import React, { useRef, useEffect, useContext } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import qualitySelector from 'videojs-contrib-quality-levels';
import { styled } from '@mui/system';
import { Button, Box } from '@mui/material';
import { FullscreenContext } from '../../context/FullscreenContext';

const PlayerWrapper = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#000',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const VideoPlayer = ({ videoUrl, onClose }) => {
  const videoNode = useRef(null);
  const player = useRef(null);
  const { setIsFullscreen } = useContext(FullscreenContext);

  useEffect(() => {
    setIsFullscreen(true);
    player.current = videojs(videoNode.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      fluid: true,
    });

    player.current.src({
      src: videoUrl,
      type: 'application/x-mpegURL',
    });

    const qualityLevels = player.current.qualityLevels();
    qualityLevels.on('addqualitylevel', () => {
      const qualityMenuButton = player.current.controlBar.addChild('QualityMenuButton', {});
      player.current.controlBar.el().insertBefore(qualityMenuButton.el(), player.current.controlBar.getChild('fullscreenToggle').el());
    });

    return () => {
      if (player.current) {
        player.current.dispose();
      }
      setIsFullscreen(false);
    };
  }, [videoUrl, setIsFullscreen]);

  return (
    <PlayerWrapper>
      <div data-vjs-player>
        <video ref={videoNode} className="video-js vjs-big-play-centered" />
      </div>
      <Button variant="contained" color="secondary" onClick={onClose} style={{ position: 'absolute', top: 20, right: 20 }}>
        Close
      </Button>
    </PlayerWrapper>
  );
};

export default VideoPlayer;
