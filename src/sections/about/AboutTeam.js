import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Card, Container, Typography } from '@mui/material';
// _mock_
import { _carouselsMembers } from '../../_mock';
// components
import Image from '../../components/Image';
import { CarouselArrows } from '../../components/carousel';
import SocialsButton from '../../components/SocialsButton';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const carouselRef = useRef(null);
  const theme = useTheme();

  const settings = {
    arrows: false,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Container sx={{ pb: 10, textAlign: 'center' }}>
      <MotionInView variants={varFade().inDown}>
        <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
          Dream team
        </Typography>
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Great team is the key
        </Typography>
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 630,
            color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
          }}
        >
          BeatsUp will provide you support if you have any problems during your time in our platform, our support team will reply within a day and we.
        </Typography>
      </MotionInView>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}>
            {_carouselsMembers.map((member) => (
              <MotionInView key={member.id} variants={varFade().in} sx={{ px: 1.5, py: 10 }}>
                <MemberCard member={member} />
              </MotionInView>
            ))}
          </Slider>
        </CarouselArrows>
      </Box>
     
    </Container>
  );
}

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

function MemberCard({ member }) {
  const { name, role, avatar } = member;

  return (
    <Card key={name} sx={{ p: 1 }}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography>
      <Image src={avatar} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      <Stack alignItems="center" sx={{ mt: 2, mb: 1 }}>
        <SocialsButton sx={{ color: 'action.active' }} />
      </Stack>
    </Card>
  );
}
