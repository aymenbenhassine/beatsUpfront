import { paramCase } from 'change-case';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// react-player
import VideoPlayer from 'react-video-js-player';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, IconButton, Typography, CardContent, Grid, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// utils
import { fDate } from '../../../utils/formatTime';
import cssStyles from '../../../utils/cssStyles';
// components
import Image from '../../Image';
import Iconify from '../../Iconify';
import LightboxModal from '../../LightboxModal';
import { deleteMusic } from '../../../redux/actions/musics';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { MusicContext } from '../../../contexts/musicContext/MusicContext';
import { getMusics } from '../../../contexts/musicContext/apiCalls';

// ----------------------------------------------------------------------

const CaptionStyle = styled(CardContent)(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.grey[900] }),
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
}));

// ----------------------------------------------------------------------

export default function ProfileArtistMusic() {
  const { musics, dispatch } = useContext(MusicContext);

  useEffect(() => {
    getMusics(dispatch);
  }, [dispatch]);

  console.log(musics);

  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  const imagesLightbox = musics.map((img) => img.cover);

  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={10}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Collections
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_DASHBOARD.artist.add_music}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            New Music
          </Button>
        </Grid>
      </Grid>

      <Card sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {musics.map((music) => (
            <Grid key={music._id} item>
              <GalleryItem music={music} onOpenLightbox={handleOpenLightbox} />
            </Grid>
          ))}
        </Box>

        <LightboxModal
          images={imagesLightbox}
          mainSrc={imagesLightbox[selectedImage]}
          photoIndex={selectedImage}
          setPhotoIndex={setSelectedImage}
          isOpen={openLightbox}
          onCloseRequest={() => setOpenLightbox(false)}
        />
      </Card>
    </Box>
  );
}

// ----------------------------------------------------------------------

GalleryItem.propTypes = {
  music: PropTypes.object,
  onOpenLightbox: PropTypes.func,
};

function GalleryItem({ music, onOpenLightbox }) {
  const dispatch = useDispatch();

  const { title, img, video, likeCount, createdAt } = music;
  return (
    <Card sx={{ cursor: 'pointer', position: 'relative' }}>
      {/* <Image alt="gallery image" ratio="1/1" src={img} onClick={() => onOpenLightbox(img)} /> */}
      <VideoPlayer src={video} poster={img} width="350" onClick={() => onOpenLightbox(img)} />

      <CaptionStyle>
        <div>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            {fDate(createdAt)}
          </Typography>
        </div>
        {/* <IconButton color="inherit">
          <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
        </IconButton> */}
        <Button
          size="small"
          color="primary"
          component={RouterLink}
          to={`/dashboard/artist/music/edit/${paramCase(title)}`}
          state={{ single: music }}
        >
          <EditIcon fontSize="small" /> &nbsp;Edit
        </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deleteMusic(music._id))}>
          
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CaptionStyle>
    </Card>
  );
}
