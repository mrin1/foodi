import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  styled,
} from '@mui/material';

const COLORS = {
  accent: '#E1914D', 
  cardBg: '#111418', 
  overlay: 'rgba(0, 0, 0, 0.75)',
  textGray: '#B0B0B0',
};



const HeroWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  minHeight: '100vh', 
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center', 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: `linear-gradient(${COLORS.overlay}, ${COLORS.overlay}), url('YOUR_CHEF_IMAGE_PATH')`,
});

const AccentLine = styled(Box)({
  width: '28px',
  height: '2px',
  backgroundColor: COLORS.accent,
  marginRight: '12px',
});

const ContactUsButton = styled(Button)({
  backgroundColor: COLORS.accent,
  color: '#FFFFFF',
  padding: '12px 30px',
  borderRadius: '4px',
  fontWeight: 700,
  fontSize: '13px',
  textTransform: 'uppercase',
  marginTop: '32px',
  '&:hover': {
    backgroundColor: '#C87A3B',
  },
});

const GlassScheduleCard = styled(Paper)({
  backgroundColor: COLORS.cardBg,
  color: '#FFFFFF',
  padding: '64px 48px', 
  borderRadius: '16px',
  width: '100%',
  maxWidth: '440px',
  display: 'flex',
  flexDirection: 'column',
  gap: '48px', 
  boxShadow: '0px 40px 80px rgba(0,0,0,0.6)',
  border: '1px solid rgba(255,255,255,0.03)',
});

const WorkingHours: React.FC = () => {
  return (
    <HeroWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" justifyContent="center">
          
          {/* Left Column: Heading Content */}
          <Grid size={{ xs:12, md:7 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  mb: 1 
                }}
              >
                <AccentLine />
                <Typography
                  variant="overline"
                  sx={{
                    color: '#FFFFFF',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    lineHeight: 1,
                  }}
                >
                  CONTACT US
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 900, 
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
                  lineHeight: 1.1,
                  mb: 1,
                }}
              >
                Working Hours
              </Typography>

              <ContactUsButton variant="contained" disableElevation>
                Contact Us
              </ContactUsButton>
            </Box>
          </Grid>

          <Grid 
            size={{  xs:12 ,
            md:5  }}
           
            sx={{ 
              display: 'flex', 
              justifyContent: { xs: 'center', md: 'flex-end' },
              alignItems: 'center' 
            }}
          >
            <GlassScheduleCard elevation={0}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.35rem',
                    mb: 1.5,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  Monday to Friday
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: COLORS.textGray,
                    fontWeight: 500,
                    fontSize: '1rem',
                  }}
                >
                  09:00 AM - 10:00 PM
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.35rem',
                    mb: 1.5,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  Saturday to Sunday
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: COLORS.textGray,
                    fontWeight: 500,
                    fontSize: '1rem',
                  }}
                >
                  09:00 AM - 07:00 PM
                </Typography>
              </Box>
            </GlassScheduleCard>
          </Grid>

        </Grid>
      </Container>
    </HeroWrapper>
  );
};

export default WorkingHours;