import { paramCase } from 'change-case';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

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
import TextMaxLine from '../../TextMaxLine';
import Iconify from '../../Iconify';
import LightboxModal from '../../LightboxModal';
import { deleteCollection } from '../../../redux/actions/collections';
import { PATH_DASHBOARD } from '../../../routes/paths';

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

ProfileArtistCollection.propTypes = {
  collections: PropTypes.array.isRequired,
};

export default function ProfileArtistCollection({ collections }) {
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  const imagesLightbox = collections.map((img) => img.cover);

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
            to={PATH_DASHBOARD.artist.add_collection}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            New Collection
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
          {collections.map((collection) => (
            <Grid key={collection._id} item>
              <GalleryItem collection={collection} onOpenLightbox={handleOpenLightbox} />
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
  collection: PropTypes.object,
  onOpenLightbox: PropTypes.func,
};

function GalleryItem({ collection, onOpenLightbox }) {
  const { cover, title, createdAt } = collection;
  const dispatch = useDispatch();

  return (
    <Card sx={{ cursor: 'pointer', position: 'relative' }}>
      <Image alt="gallery image" ratio="1/1" src={cover} onClick={() => onOpenLightbox(cover)} />

      <CaptionStyle>
        <div>
          <TextMaxLine variant="subtitle1" line={1}>
            {title}
          </TextMaxLine>
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
          to={`/dashboard/artist/collection/edit/${paramCase(title)}`}
          state={{ single: collection }}
        >
          <EditIcon fontSize="small" /> &nbsp;Edit
        </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deleteCollection(collection._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CaptionStyle>
    </Card>
  );
}
