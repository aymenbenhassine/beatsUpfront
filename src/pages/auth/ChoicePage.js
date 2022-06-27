import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography, Grid, Avatar } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { VerifyCodeForm } from '../../sections/auth/verify-code';
// @mui
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center',
  },
}));

// ----------------------------------------------------------------------

export default function ChoicePage() {
  return (
    <Page title="Verify" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />
        <ContentStyle>
          <MotionInView
            variants={varFade().inUp}
            sx={{
              mb: { xs: 3, md: 0 },
            }}
          >
            <m.div animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }}>
              <Image
                visibleByDefault
                alt="rocket"
                src="https://minimal-assets-api.vercel.app/assets/images/home/rocket.png"
                disabledEffect
                sx={{ maxWidth: 460 }}
              />
            </m.div>
          </MotionInView>

          <Box
            sx={{
              pl: { md: 10 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <MotionInView variants={varFade().inDown} sx={{ color: 'common.white', mb: 5 }}>
              <Typography variant="h2">
                Get started with
                <br /> beatsUp world today
              </Typography>
            </MotionInView>
            <MotionInView variants={varFade().inDown}>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                  <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://mrkt-web.scdn.co/artists-spotify-com/_next/static/images/label-94248aed0b7ee763dcdf3fa390005588.png"
                      sx={{ width: 168, height: 168 }}
                    />
                    <Grid mt={3}>
                      <Button color="warning" size="large" type="submit" variant="contained">
                        Casual member
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={8} justify="center">
                  <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://mrkt-web.scdn.co/artists-spotify-com/_next/static/images/artist-f639614fd322accf0dd0fc36e74851e0.png"
                      sx={{ width: 168, height: 168 }}
                    />
                    <Grid mt={3}>
                      <Button color="info" size="large" type="submit" variant="contained">
                        Artist or manager
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </MotionInView>
          </Box>
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
