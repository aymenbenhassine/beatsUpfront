import * as React from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

// image
import defaultImage from '../../assets/radio.jpg';
import './style.css';


MediaControlCard.propTypes = {
  station: PropTypes.object,
};

const setDefaultSrc = (event) => {
  event.target.src = defaultImage;
};

export default function MediaControlCard({ station }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={station.favicon}
        alt="station logo"
        onError={setDefaultSrc}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {station.name}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Container>
          <AudioPlayer
            className="player"
            src={station.urlResolved}
            showJumpControls={false}
            layout="stacked"
            customProgressBarSection={[]}
            customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
            autoPlayAfterSrcChange={false}
          />
          </Container>
        </Box>
      </Box>
    </Card>
  );
}
