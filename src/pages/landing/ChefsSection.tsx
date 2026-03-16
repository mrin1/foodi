
import { 
  Box, 
  Container, 
  Typography, 
 Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  IconButton, 
  Stack, 
  styled 
} from '@mui/material';
import { 
  Facebook, 
  X, 
  Instagram, 
  LinkedIn 
} from '@mui/icons-material';

interface Chef {
  id: number;
  name: string;
  role: string;
  image: string;
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}
import ChefImage from "../../assets/images/home/chef-img.png"
import ChefImage1 from "../../assets/images/home/chef-img1.png"
import ChefImage2 from "../../assets/images/home/chef-img2.png"
import ChefImage3 from "../../assets/images/home/chef-img3.png"

const CHEF_DATA: Chef[] = [
  {
    id: 1,
    name: 'Masum Rana',
    role: 'Master Chef',
    image: ChefImage,
    socials: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 2,
    name: 'Manisha Agarwal',
    role: 'Senior Chef',
    image: ChefImage1,
    socials: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 3,
    name: 'Muhibbur Rashid',
    role: 'Master Chef',
    image: ChefImage2,
    socials: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 4,
    name: 'Rashed Kabir',
    role: 'Master Chef',
    image: ChefImage3,
    socials: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
  }
];

const StyledCard = styled(Card)(({}) => ({
  backgroundColor: '#111827', 
  color: '#ffffff',
  borderRadius: '16px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.5)',
  },
}));

const SocialIconButton = styled(IconButton)(({}) => ({
  backgroundColor: '#1f2937',
  color: '#ffffff',
  margin: '0 4px',
  '&:hover': {
    backgroundColor: '#374151',
    color: '#ff6b00', 
  },
}));

const ChefGallery = () => {
  return (
    <Box sx={{ bgcolor: '#0b0f19', py: 10, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="overline" 
            sx={{ color: '#ff6b00', fontWeight: 'bold', letterSpacing: 2, borderBottom: '2px solid #ff6b00', pb: 0.5 }}
          >
            OUR CHEF
          </Typography>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ color: 'white', fontWeight: 800, mt: 2, mb: 3 }}
          >
            Meet our expert chef
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: '#9ca3af', maxWidth: '700px', mx: 'auto' }}
          >
            Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. 
            Facilisis eget cras sit semper sit enim. Turpis aliquet at ac eu donec ut.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {CHEF_DATA.map((chef) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={chef.id}>
              <StyledCard elevation={0}>
                <Box sx={{ p: 2 }}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={chef.image}
                    alt={chef.name}
                    sx={{ borderRadius: '12px', objectFit: 'cover' }}
                  />
                </Box>
                <CardContent sx={{ textAlign: 'center', pt: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {chef.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9ca3af', mb: 2 }}>
                    {chef.role}
                  </Typography>
                  
                  <Stack direction="row" justifyContent="center" spacing={1}>
                    <SocialIconButton size="small">
                      <Facebook fontSize="small" />
                    </SocialIconButton>
                    <SocialIconButton size="small">
                      <X fontSize="small" />
                    </SocialIconButton>
                    <SocialIconButton size="small">
                      <Instagram fontSize="small" />
                    </SocialIconButton>
                    <SocialIconButton size="small">
                      <LinkedIn fontSize="small" />
                    </SocialIconButton>
                  </Stack>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ChefGallery;