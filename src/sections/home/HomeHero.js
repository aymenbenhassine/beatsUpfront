import { m } from 'framer-motion';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components

import Iconify from '../../components/Iconify';

import { MotionContainer, varFade } from '../../components/animate';
import main from '../../assets/undraw_compose_music_ovo2.svg';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '48vh',
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    <MotionContainer>
      <RootStyle>
        <HeroOverlayStyle
          alt="overlay"
          src="https://minimals.cc/assets/overlay.svg"
          variants={varFade().in}
        />

        <HeroImgStyle
          alt="hero"
          // src="https://minimal-assets-api.vercel.app/assets/images/home/hero.png"
          src={main}
          variants={varFade().inUp}
        />

        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                Enjoy music <br />
                in one place <br /> with
                <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                  &nbsp;BeatsUp
                </Typography>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: 'common.white' }}>
                BeatsUp, it's a web application where you can listen to music, buy instruments, enjoy learning new
                instruments and play karaoke with friends All in one Place
              </Typography>
            </m.div>

            <Stack spacing={2.5}>
              <m.div variants={varFade().inRight}>
                <Typography variant="overline" sx={{ color: 'primary.light' }}>
                  Available For Everyone, <br />
                  You already have an account
                </Typography>
              </m.div>
            </Stack>
            {!user ? (
              <m.div variants={varFade().inRight}>
                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.root}
                  startIcon={<Iconify icon={'eva:flash-fill'} width={20} height={20} />}
                >
                  Login Now
                </Button>
              </m.div>
            ) : (
              <m.div variants={varFade().inRight}>
                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.root}
                  startIcon={<Iconify icon={'eva:flash-fill'} width={20} height={20} />}
                >
                  Access Here
                </Button>
              </m.div>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </MotionContainer>
  );
}
