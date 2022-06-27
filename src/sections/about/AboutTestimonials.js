import PropTypes from 'prop-types';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Link, Paper, Rating, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// components
import Iconify from '../../components/Iconify';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: 'Jenny Wilson',
    rating: 5,
    dateCreate: 'march 19, 2021',
    content: `Excellent Work! Thanks a lot!`,
  },
  {
    name: 'Cody Fisher',
    rating: 5,
    dateCreate: 'April 19, 2021',
    content: `It's a very good music platfoem and we are really liking the product . We've done some things, like enjoying karoke with friends and posting our favorite songs. The team did a really good job.`,
  },
  {
    name: 'Marvin McKinney',
    rating: 5,
    dateCreate: 'june 29, 2021',
    content: `Customer support is realy fast and helpful the desgin of this theme is looks amazing also the code is very clean and readble realy good job !`,
  },
  {
    name: 'Darrell Steward',
    rating: 5,
    dateCreate: 'December 19, 2021',
    content: `Amazing, really good playlists and gives you a lot of examples os songs.`,
  },
  {
    name: 'Jacob Jones',
    rating: 5,
    dateCreate: 'April 19, 2021',
    content: `Got a few questions after using the product. The team responded very fast and very helpfull. Overall the experience is excellent and works very good. 5/5 stars!`,
  },
  {
    name: 'Bessie Cooper',
    rating: 5,
    dateCreate: 'march  01, 2022',
    content: `This team is doing miricales they are doing an amazings work - Keep up the good work guys you are amazing - Thank yu for marking my life super funny with your fantastic platform!`,
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0),
  backgroundSize: 'cover',
  backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.grey[900], 0.8)} , ${alpha(
    theme.palette.grey[900],
    0.8
  )}), url(https://minimal-assets-api.vercel.app/assets/images/about/testimonials.jpg)`,
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    padding: 0,
    height: 840,
    overflow: 'hidden',
  },
}));

// ----------------------------------------------------------------------

export default function AboutTestimonials() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <RootStyle>
      <Container sx={{ position: 'relative', height: '100%' }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: '100%' }}
        >
          <Grid item xs={10} md={4}>
            <Box sx={{ maxWidth: { md: 360 } }}>
              <MotionInView variants={varFade().inUp}>
                <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
                  Testimonials
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Typography variant="h2" sx={{ mb: 3, color: 'common.white' }}>
                  Who love <br />
                  our music platform
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Typography sx={{ color: 'common.white' }}>
                  Our goal is to make people enjoy music anywhere and any time in one place. We aim that our product and service satisfie your needs. This is
                  why we’re constantly working on our services to make it better every day and really listen to what our
                  users has to say.
                </Typography>
              </MotionInView>

              {!isDesktop && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <MotionInView variants={varFade().inUp}>
                    <TestimonialLink />
                  </MotionInView>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            sx={{
              right: { md: 24 },
              position: { md: 'absolute' },
            }}
          >
            <Grid container spacing={isDesktop ? 3 : 0} alignItems="center">
              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(0, 3).map((testimonial) => (
                  <MotionInView key={testimonial.name} variants={varFade().inUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </MotionInView>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(3, 6).map((testimonial) => (
                  <MotionInView key={testimonial.name} variants={varFade().inUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </MotionInView>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {isDesktop && (
          <Box sx={{ bottom: 60, position: 'absolute' }}>
            <MotionInView variants={varFade().inLeft}>
              <TestimonialLink />
            </MotionInView>
          </Box>
        )}
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

function TestimonialLink() {
  return (
    <Link href="#" variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
      Read more testimonials
      <Iconify icon={'ic:round-arrow-right-alt'} sx={{ ml: 1, width: 20, height: 20 }} />
    </Link>
  );
}

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    content: PropTypes.string,
    dateCreate: PropTypes.string,
    name: PropTypes.string,
    rating: PropTypes.number,
  }),
};

function TestimonialCard({ testimonial }) {
  const theme = useTheme();
  const { name, rating, dateCreate, content } = testimonial;

  return (
    <Paper
      sx={{
        mt: 3,
        p: 3,
        color: 'common.white',
        ...cssStyles().bgBlur({
          color: theme.palette.common.white,
          opacity: 0.04,
        }),
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {name}
      </Typography>
      <Typography gutterBottom component="p" variant="caption" sx={{ color: 'grey.500' }}>
        {dateCreate}
      </Typography>
      <Rating value={rating} readOnly size="small" />
      <Typography variant="body2" sx={{ mt: 1.5 }}>
        {content}
      </Typography>
    </Paper>
  );
}
