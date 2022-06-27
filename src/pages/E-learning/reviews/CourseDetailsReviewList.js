import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
// @mui
import { Box, List, Button, Rating, Avatar, ListItem, Pagination, Typography } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';
import { deleteReview } from '../../../redux/actions/E-LearningActions/reviews';

// ----------------------------------------------------------------------

CourseDetailsReviewList.propTypes = {
  product: PropTypes.object,
};

export default function CourseDetailsReviewList({ reviewsList }) {

  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>
      <List disablePadding>
        {reviewsList.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination 
        count={reviewsList.length}
        />
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

ReviewItem.propTypes = {
  review: PropTypes.object,
};

function ReviewItem({ review }) {
  const [isHelpful, setHelpfuls] = useState(false);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = (user?.result?.googleId || user?.result?._id)

 

  const handleClickHelpful = () => {
    setHelpfuls((prev) => !prev);
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          mb: 5,
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            mb: { xs: 2, sm: 0 },
            minWidth: { xs: 160, md: 240 },
            textAlign: { sm: 'center' },
            flexDirection: { sm: 'column' },
          }}
        >
          <Avatar
            src={review?.user?.imageUrl || "" }
            sx={{
              mr: { xs: 2, sm: 0 },
              mb: { sm: 2 },
              width: { md: 64 },
              height: { md: 64 },
            }}
          />
          <div>
            <Typography variant="subtitle2" noWrap>
              {review?.user?.username || ""}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
              {fDate(review?.postedAt ||  Date.now())}
            </Typography>
          </div>
        </Box>

        <div>
          <Rating size="small" value={review?.rating} precision={0.1} readOnly />
          <Typography variant="body2">{review?.comment}</Typography>

          <Box
            sx={{
              mt: 1,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {review?.user?._id === userId && (
            
            <Button
              size="small"
              color="inherit"
              startIcon={<Iconify icon={'eva:trash-2-outline'} />}
              onClick={ () =>{
                dispatch(deleteReview(review?._id))
                enqueueSnackbar('Your review was deleted !');
              }}
            >
             Delete
            </Button>
            )}
          </Box>
        </div>
      </ListItem>
    </>
  );
}
