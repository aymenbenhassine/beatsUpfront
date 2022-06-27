import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import sumBy from 'lodash/sumBy';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Rating, Button, Typography, LinearProgress, Stack, Link } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:nth-of-type(2)': {
    [theme.breakpoints.up('md')]: {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      borderRight: `solid 1px ${theme.palette.divider}`,
    },
  },
}));

// ----------------------------------------------------------------------

CourseDetailsReviewOverview.propTypes = {
  product: PropTypes.object,
  onOpen: PropTypes.func,
};

export default function CourseDetailsReviewOverview({ reviewsList, onOpen }) {
   
  const totalReview = reviewsList.length ;

  const [totalRating,setTotalRating] = useState(0);
  const [totalRatingStar1,setTotalRatingStar1] = useState(0);
  const [totalRatingStar2,setTotalRatingStar2] = useState(0);
  const [totalRatingStar3,setTotalRatingStar3] = useState(0);
  const [totalRatingStar4,setTotalRatingStar4] = useState(0);
  const [totalRatingStar5,setTotalRatingStar5] = useState(0);
  const  ratings  = [
    {
        "name": "1 Star",
        "starCount": totalRatingStar1,
        "reviewCount": 6112
    },
    {
        "name": "2 Star",
        "starCount": totalRatingStar2,
        "reviewCount": 166
    },
    {
        "name": "3 Star",
        "starCount": totalRatingStar3,
        "reviewCount": 9326
    },
    {
        "name": "4 Star",
        "starCount": totalRatingStar4,
        "reviewCount": 1792
    },
    {
        "name": "5 Star",
        "starCount": totalRatingStar5,
        "reviewCount": 4696
    }
]

  const total = sumBy(ratings, (star) => star.starCount);

  const calculateAVG = () =>{
    let total = 0 ;
    reviewsList.map((review) =>total += review.rating);
    setTotalRating((total/reviewsList.length).toFixed(2));
  }
  const calculateRatingsByStars=(star)=>{
    let total = 0 ;
    reviewsList.forEach((review) =>{ if(review.rating === star) total += 1});
    return total;
  }
  useEffect(() => {
    calculateAVG();
    setTotalRatingStar1(calculateRatingsByStars(1))
    setTotalRatingStar2(calculateRatingsByStars(2))
    setTotalRatingStar3(calculateRatingsByStars(3))
    setTotalRatingStar4(calculateRatingsByStars(4))
    setTotalRatingStar5(calculateRatingsByStars(5))
    console.log(totalRating)
  }, );

  return (
    <Grid container>
      <GridStyle item xs={12} md={4}>
        <Typography variant="subtitle1" gutterBottom>
          Average rating
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ color: 'error.main' }}>
          {totalRating}/5
        </Typography>
        <RatingStyle readOnly value={totalRating} precision={0.1} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ({fShortenNumber(totalReview)}
          &nbsp;reviews)
        </Typography>
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <Stack spacing={1.5} sx={{ width: 1 }}>
          {ratings
            .slice(0)
            .reverse()
            .map((rating) => (
              <ProgressItem key={rating.name} star={rating} total={totalReview} />
            ))}
        </Stack>
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <Link underline="none">
          <Button size="large" onClick={onOpen} variant="outlined" startIcon={<Iconify icon={'eva:edit-2-fill'} />}>
            Write your review
          </Button>
        </Link>
      </GridStyle>
    </Grid>
  );
}

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  star: PropTypes.object,
  total: PropTypes.number,
};

function ProgressItem({ star, total }) {
  const { name, starCount } = star;
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Typography variant="subtitle2">{name}</Typography>
      <LinearProgress
        variant="determinate"
        value={(starCount / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
          bgcolor: 'divider',
        }}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 64, textAlign: 'right' }}>
        {fShortenNumber(starCount)}
      </Typography>
    </Stack>
  );
}
