import { m } from 'framer-motion';
import React from 'react';
import { Grid, CircularProgress, Typography, Box, Container, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { MotionContainer, varBounce } from '../animate';
import Collection from './Collection/Collection';
// assets
import { SeverErrorIllustration } from '../../assets';

// -------------------------------------------------------------------------------------------------

const Collections = () => {
  const { collections, isLoading } = useSelector((state) => state.collections);

  if (!collections.length && !isLoading)
    return (
      <Container component={MotionContainer} mt={5}>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              Sorry, No Collection found!
            </Typography>
          </m.div>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the Collection you’re looking for. Perhaps you’ve mistyped the Title or the Tag? Be sure to check your
            spelling.
          </Typography>

          <m.div variants={varBounce().in}>
            <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
          </m.div>
        </Box>
      </Container>
    );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      {collections.map((collection) => (
        <Grid key={collection._id} item xs={12} sm={4} md={4}>
          <Collection collection={collection} />
        </Grid>
      ))}
    </>
  );
};

export default Collections;
