import React from 'react';
import { 
  Box, Container, Grid, Typography, Stack, 
  TextField, Button, CardMedia, Chip, Avatar
} from '@mui/material';
import PageHeader from '../components/common/PageHeader';

const SingleBlogPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#0D0D0D", minHeight: "100vh", pb: 10 }}>
      <PageHeader title="Blog Details" breadcrumb="Blog / Details" />

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={6}>
          
          <Grid size={{xs:12, md:8}}>
            <Stack spacing={4}>
            
              <Box sx={{ borderRadius: '24px', overflow: 'hidden', height: { md: '500px' } }}>
                <CardMedia 
                  component="img" 
                  image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" 
                  sx={{ height: '100%', objectFit: 'cover' }} 
                />
              </Box>

              <Stack direction="row" spacing={4} sx={{ color: '#E48C46', fontWeight: 600 }}>
                <Typography variant="body2">👤 Admin</Typography>
                <Typography variant="body2">📅 17 June 2025</Typography>
                <Typography variant="body2">💬 Comments</Typography>
              </Stack>

              <Typography variant="h3" sx={{ color: 'white', fontWeight: 900, fontSize: '2.5rem' }}>
                10 Benefits of Doing a Detox
              </Typography>

              <Typography sx={{ color: '#9B9B9B', lineHeight: 1.9, fontSize: '1.05rem' }}>
                Every plate tells a story of fresh ingredients, rich flavors, and a passion for cooking. 
                Our detox menu focuses on replenishing nutrients while maintaining flavor.
              </Typography>

              <Typography variant="h5" sx={{ color: 'white', fontWeight: 800, mt: 4 }}>Comments (03)</Typography>
              <Stack spacing={3}>
                {[1, 2, 3].map((i) => (
                  <Box key={i} sx={{ bgcolor: '#11191f', p: 4, borderRadius: '24px', position: 'relative' }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                       <Avatar sx={{ bgcolor: '#E48C46' }}>U</Avatar>
                       <Box>
                         <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 700 }}>Leslie Alexander</Typography>
                         <Typography variant="caption" sx={{ color: '#E48C46' }}>15 June 2025</Typography>
                       </Box>
                    </Stack>
                    <Typography sx={{ color: '#828282', lineHeight: 1.7 }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                    <Typography sx={{ color: '#E48C46', mt: 2, fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>Reply</Typography>
                  </Box>
                ))}
              </Stack>

              <Box sx={{ mt: 6 }}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>Leave a Comments</Typography>
                <Typography sx={{ color: '#828282', mb: 4, fontSize: '0.9rem' }}>Your email address will not be published. Required fields are marked</Typography>
                <Grid container spacing={3}>
                  <Grid size={{xs:12, md:6}}>
                    <Typography sx={{ color: 'white', mb: 1, fontWeight: 700 }}>Your Name :</Typography>
                    <TextField fullWidth placeholder="Enter name" sx={{ bgcolor: '#1a242b', borderRadius: '12px', '& fieldset': { border: 'none' }, input: { color: 'white' } }} />
                  </Grid>
                  <Grid  size={{xs:12, md:6}}>
                    <Typography sx={{ color: 'white', mb: 1, fontWeight: 700 }}>Email :</Typography>
                    <TextField fullWidth placeholder="Enter email" sx={{ bgcolor: '#1a242b', borderRadius: '12px', '& fieldset': { border: 'none' }, input: { color: 'white' } }} />
                  </Grid>
                  <Grid  size={{xs:12}}>
                    <Typography sx={{ color: 'white', mb: 1, fontWeight: 700 }}>Website :</Typography>
                    <TextField fullWidth placeholder="Enter website" sx={{ bgcolor: '#1a242b', borderRadius: '12px', '& fieldset': { border: 'none' }, input: { color: 'white' } }} />
                  </Grid>
                  <Grid size={{xs:12}}>
                    <Typography sx={{ color: 'white', mb: 1, fontWeight: 700 }}>Write a Message :</Typography>
                    <TextField fullWidth multiline rows={6} placeholder="Message" sx={{ bgcolor: '#1a242b', borderRadius: '12px', '& fieldset': { border: 'none' }, '& textarea': { color: 'white' } }} />
                  </Grid>
                </Grid>
                <Button variant="contained" sx={{ bgcolor: '#E48C46', mt: 4, px: 6, py: 2, borderRadius: '12px', fontWeight: 800, '&:hover': { bgcolor: '#d17b38' } }}>
                  POST COMMENT
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid  size={{xs:12, md:4}}>
            <Stack spacing={6}>
              <Box sx={{ border: '2px solid #E48C46', p: 4, borderRadius: '24px' }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 900 }}>Categories</Typography>
                <Stack spacing={2.5}>
                  {['Hamburger (20)', 'Pizza (8)', 'Cold Drink (8)', 'Hot Drink (2)', 'Pasta (5)'].map(cat => (
                    <Typography key={cat} sx={{ color: '#828282', fontWeight: 600, '&:hover': { color: 'white' }, cursor: 'pointer' }}>
                      {cat}
                    </Typography>
                  ))}
                </Stack>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: 'white', mb: 4, fontWeight: 900 }}>Recent Post</Typography>
                {[1, 2, 3, 4].map(i => (
                  <Stack key={i} direction="row" spacing={2} sx={{ mb: 3 }}>
                    <Box sx={{ minWidth: 90, height: 90, borderRadius: '16px', overflow: 'hidden' }}>
                      <CardMedia component="img" image={`https://images.unsplash.com/photo-1513104890138-7c749659a591?sig=${i}`} sx={{ height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Stack justifyContent="center">
                      <Typography sx={{ color: 'white', fontSize: '1rem', fontWeight: 800 }}>Margarita pizza</Typography>
                      <Typography variant="caption" sx={{ color: '#E48C46', mt: 0.5 }}>👤 Admin 📅 17 June 2025</Typography>
                    </Stack>
                  </Stack>
                ))}
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 900 }}>Product Tag</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {['Palak Paneer', 'Pav Bhaji', 'Dahi bara', 'Malay Kofta', 'Dal Tadka', 'Mix veg'].map(tag => (
                    <Chip key={tag} label={tag} variant="outlined" sx={{ color: 'white', borderColor: '#333', borderRadius: '8px', px: 1, '&:hover': { borderColor: '#E48C46' } }} />
                  ))}
                </Box>
              </Box>

              <Box sx={{ bgcolor: '#11191f', p: 4, borderRadius: '24px', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: '#E48C46', fontStyle: 'italic' }}>Super Delicious</Typography>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 900, my: 1 }}>Hamburger</Typography>
                <Typography variant="body2" sx={{ color: '#828282', mb: 3 }}>Call Now</Typography>
                <Typography variant="h6" sx={{ color: '#E48C46', fontWeight: 900, mb: 3 }}>(210) 555-0114</Typography>
                <Box sx={{ borderRadius: '16px', overflow: 'hidden', height: '150px' }}>
                   <CardMedia component="img" image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd" />
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SingleBlogPage;