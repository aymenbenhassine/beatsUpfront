// @mui
import { Container, Typography, Grid } from '@mui/material';
// components

import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container sx={{ mt: 10 }}>
    

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <MotionInView variants={varFade().inUp}>
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              Our vision is offering the best music envirement to our community.
            </Typography>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}
