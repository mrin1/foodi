import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Stack, 
  Avatar,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AppleIcon from '@mui/icons-material/Apple';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import FoodImage from "../../assets/images/home/food-img.png"

const FOODI_ORANGE = '#D97A38'; 

const AppPromoSection: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: '#0E0E0E',
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(217, 122, 56, 0.05) 0%, transparent 40%),
                         url(${FoodImage})`,
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 0 },
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h1"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: { xs: '2.5rem', md: '4.2rem' },
                  lineHeight: 1.1,
                  mb: 6,
                  fontFamily: '"Inter", "Roboto", sans-serif',
                }}
              >
                Simple Way To <br /> Order Your Foods
              </Typography>

              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: '#000',
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    minWidth: '220px',
                    '&:hover': { bgcolor: '#eee' },
                  }}
                  startIcon={<PlayArrowIcon sx={{ fontSize: 40, color: '#3DDC84' }} />}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="caption" sx={{ display: 'block', fontSize: '10px', fontWeight: 600 }}>GET IT ON</Typography>
                    <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: 800 }}>Google Play</Typography>
                  </Box>
                </Button>

                <Button
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: '#000',
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    minWidth: '220px',
                    '&:hover': { bgcolor: '#eee' },
                  }}
                  startIcon={<AppleIcon sx={{ fontSize: 40 }} />}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="caption" sx={{ display: 'block', fontSize: '10px', fontWeight: 600 }}>GET IT ON</Typography>
                    <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: 800 }}>Apple Store</Typography>
                  </Box>
                </Button>
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ position: 'relative' }}>
            <Box sx={{ position: 'relative', height: { xs: '500px', md: '650px' }, mt: { xs: 5, md: 0 } }}>
              
              <Box
                sx={{
                  width: '280px',
                  height: '580px',
                  bgcolor: '#FFF',
                  borderRadius: '40px',
                  border: '10px solid #222',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  zIndex: 1,
                  boxShadow: '30px 30px 60px rgba(0,0,0,0.7)',
                  p: 2,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ color: FOODI_ORANGE, fontWeight: 900 }}>FOODI</Typography>
                  <Avatar sx={{ width: 30, height: 30 }} src={FoodImage} />
                </Stack>
                <Typography sx={{ mt: 2, fontSize: '0.8rem', color: '#666' }}>Order your favourite food!</Typography>
                
                <Box sx={{ mt: 2, bgcolor: '#f5f5f5', borderRadius: 4, p: 1, display: 'flex', alignItems: 'center' }}>
                  <SearchIcon sx={{ color: '#999', mr: 1 }} />
                  <Typography sx={{ color: '#999', fontSize: '0.8rem' }}>Search</Typography>
                  <Box sx={{ ml: 'auto', bgcolor: FOODI_ORANGE, p: 0.5, borderRadius: 1 }}>
                    <TuneIcon sx={{ color: '#fff', fontSize: 16 }} />
                  </Box>
                </Box>

                
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Box sx={{ bgcolor: FOODI_ORANGE, px: 2, py: 0.5, borderRadius: 3, color: '#fff', fontSize: '0.7rem' }}>All</Box>
                  <Box sx={{ bgcolor: '#f5f5f5', px: 2, py: 0.5, borderRadius: 3, fontSize: '0.7rem' }}>Combos</Box>
                </Stack>

                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, bgcolor: FOODI_ORANGE, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }} />
              </Box>

              <Box
                sx={{
                  width: '300px',
                  height: '620px',
                  bgcolor: '#FFF',
                  borderRadius: '40px',
                  border: '10px solid #222',
                  position: 'absolute',
                  right: { xs: '50%', md: '0' },
                  transform: { xs: 'translateX(50%)', md: 'none' },
                  top: '40px',
                  zIndex: 2,
                  boxShadow: '30px 30px 60px rgba(0,0,0,0.8)',
                  p: 3
                }}
              >
                <Box sx={{ width: '100%', height: '180px', bgcolor: '#F9F9F9', borderRadius: 4, mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                   <Box component="img" src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" sx={{ width: '70%' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.2 }}>Cheeseburger Wendy's Burger</Typography>
                <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                  <Typography sx={{ color: FOODI_ORANGE, fontSize: '0.8rem' }}>★ 4.9</Typography>
                  <Typography sx={{ color: '#999', fontSize: '0.8rem' }}>26 mins</Typography>
                </Stack>
                <Typography sx={{ fontSize: '0.7rem', color: '#666', mb: 4 }}>
                  The Cheeseburger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite.
                </Typography>
                
                <Typography variant="caption" sx={{ fontWeight: 700 }}>Spicy</Typography>
                <Box sx={{ mt: 1, height: 4, bgcolor: '#eee', borderRadius: 2, position: 'relative' }}>
                  <Box sx={{ position: 'absolute', left: '60%', width: 12, height: 12, bgcolor: FOODI_ORANGE, borderRadius: '50%', top: -4 }} />
                </Box>
                
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 5 }}>
                   <Stack direction="row" alignItems="center" spacing={2} sx={{ bgcolor: '#f5f5f5', borderRadius: 2, px: 1 }}>
                      <Typography sx={{ fontWeight: 900 }}>-</Typography>
                      <Typography sx={{ fontWeight: 900 }}>2</Typography>
                      <Typography sx={{ color: FOODI_ORANGE, fontWeight: 900 }}>+</Typography>
                   </Stack>
                   <Button variant="outlined" sx={{ borderColor: FOODI_ORANGE, color: FOODI_ORANGE, textTransform: 'none', borderRadius: 2 }}>Add to Cart</Button>
                </Stack>
              </Box>

            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AppPromoSection;