import React from 'react';
import { Box, Typography, Button, Stack, Container, styled } from '@mui/material';
import BannerImg from '../../assets/images/home/banner-img.png';

const OutlineButton = styled(Button)({
  border: '1px solid rgba(255, 255, 255, 0.4)',
  borderRadius: '12px',
  color: '#FFFFFF',
  padding: '10px 28px',
  textTransform: 'uppercase',
  fontSize: '0.85rem',
  fontWeight: 600,
  '&:hover': {
    border: '1px solid #FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${BannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: '#FFFFFF',
              letterSpacing: '0.2em',
              mb: 2,
              fontWeight: 500,
              fontSize: { xs: '0.7rem', md: '0.85rem' },
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                width: '20px',
                height: '1px',
                backgroundColor: 'rgba(255,255,255,0.5)',
              },
              '&::before': { left: -30 },
              '&::after': { right: -30 },
            }}
          >
            HELLO, NEW FRIEND
          </Typography>

          <Typography
            variant="h1"
            sx={{
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: { xs: '2.8rem', sm: '4rem', md: '5.5rem' },
              lineHeight: 1.1,
              mb: 5,
              textTransform: 'uppercase',
              maxWidth: '900px',
              fontFamily: '"Inter", "Roboto", sans-serif',
            }}
          >
            Taste Happiness In <br /> Every Bite
          </Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <OutlineButton>
              Explore Menu
            </OutlineButton>
            
            <Button
              sx={{
                color: '#FFFFFF',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '1px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              Reservation
            </Button>
          </Stack>
        </Box>
      </Container>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Box
          sx={{
            width: '45px',
            height: '4px',
            bgcolor: '#E67E22', 
            borderRadius: '2px',
          }}
        />
        <Box
          sx={{
            width: '45px',
            height: '4px',
            bgcolor: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '2px',
          }}
        />
        <Box
          sx={{
            width: '45px',
            height: '4px',
            bgcolor: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '2px',
          }}
        />
      </Stack>
    </Box>
  );
};

export default HeroSection;