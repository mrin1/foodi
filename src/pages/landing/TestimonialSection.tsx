import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Avatar, 
  Stack, 
  Rating 
} from '@mui/material';
import Grid from '@mui/material/Grid';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';


interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  text: string;
  rating: number;
  accentColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jerome Bell",
    location: "New York, USA",
    avatar: "https://i.pravatar.cc/150?u=1",
    text: "From the moment we walked in, everything felt perfect — the food, the ambiance, and the warm service. It's not just a meal, it's an experience we keep coming back for.",
    rating: 4,
    accentColor: "#FFB400",
  },
  {
    id: 2,
    name: "Kristin Watson",
    location: "London, UK",
    avatar: "https://i.pravatar.cc/150?u=2",
    text: "From the moment we walked in, everything felt perfect — the food, the ambiance, and the warm service. It's not just a meal, it's an experience we keep coming back for.",
    rating: 4,
    accentColor: "#FF69B4",
  },
  {
    id: 3,
    name: "Arlene McCoy",
    location: "New York, USA",
    avatar: "https://i.pravatar.cc/150?u=3",
    text: "From the moment we walked in, everything felt perfect — the food, the ambiance, and the warm service. It's not just a meal, it's an experience we keep coming back for.",
    rating: 4,
    accentColor: "#FF7F50",
  },
];

const TestimonialSection: React.FC = () => {
  const BG_DARK = '#13191D'; 

  return (
    <Box sx={{ py: 10, bgcolor: BG_DARK, width: '100%', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        
        <Box sx={{ textAlign: 'center', mb: 8, px: { xs: 2, md: 15 } }}>
          <Box sx={{ width: 40, height: 2, bgcolor: '#E08E45', mx: 'auto', mb: 4 }} />
          <Typography 
            variant="body1" 
            sx={{ color: '#A0A0A0', lineHeight: 1.8, fontSize: '0.95rem' }}
          >
            Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. 
            Facilisis eget cras sit semper sit enim. Turpis aliquet at ac eu donec ut. 
            Sagittis vestibulum at quis non massa netus.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((item) => (
            <Grid key={item.id} size={{ xs: 12, md: 4 }}>
              <Box sx={{ position: 'relative', mb: 6 }}>
                
                <Box
                  sx={{
                    bgcolor: BG_DARK,
                    color: 'white',
                    p: 4,
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 35% 100%, 35% 82%, 0% 82%)',
                    minHeight: '280px',
                    pb: 12,
                    boxShadow: '0px 20px 40px rgba(0,0,0,0.3)',
                  }}
                >
                  <FormatQuoteRoundedIcon 
                    sx={{ 
                      fontSize: 42, 
                      color: item.accentColor, 
                      transform: 'rotate(180deg)',
                      mb: 1
                    }} 
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: '0.92rem', 
                      lineHeight: 1.8, 
                      fontWeight: 300,
                      color: '#E0E0E0',
                      mb: 3
                    }}
                  >
                    {item.text}
                  </Typography>

                  <Rating 
                    value={item.rating} 
                    readOnly 
                    size="small"
                    sx={{ 
                      '& .MuiRating-iconFilled': { color: item.accentColor },
                      '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.1)' }
                    }} 
                  />
                </Box>
                <Stack 
                  direction="row" 
                  spacing={2} 
                  alignItems="center"
                  sx={{ 
                    position: 'absolute', 
                    bottom: -10, 
                    left: 24 
                  }}
                >
                  <Avatar 
                    src={item.avatar} 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      border: `2px solid ${BG_DARK}`,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                    }} 
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 500, letterSpacing: 0.5 }}>
                      {item.location}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 10 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#E08E45' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.2)' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.2)' }} />
        </Stack>

      </Container>
    </Box>
  );
};

export default TestimonialSection;