import React from 'react';
import { Box, Typography, Card, CardMedia, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

interface ChefCardProps {
  name: string;
  designation: string;
  image: string;
}

const ChefCard: React.FC<ChefCardProps> = ({ name, designation, image }) => {
  return (
    <Card 
      sx={{ 
        maxWidth: 312, 
        bgcolor: '#11191f', 
        borderRadius: '16px', 
        border: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundImage: 'none',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'translateY(-10px)' }
      }}
    >
  
      <CardMedia
        component="img"
        height="320"
        image={image}
        alt={name}
        sx={{ objectFit: 'cover' }}
      />

      <Box sx={{ p: 3, textAlign: 'center', color: 'white' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#828282', mb: 2 }}>
          {designation}
        </Typography>

      
        <Stack direction="row" spacing={1} justifyContent="center">
          {[
            { icon: <FacebookIcon fontSize="small" />, color: '#1877F2' },
            { icon: <TwitterIcon fontSize="small" />, color: '#1DA1F2' },
            { icon: <InstagramIcon fontSize="small" />, color: '#E4405F' },
            { icon: <LinkedInIcon fontSize="small" />, color: '#0A66C2' }
          ].map((social, index) => (
            <IconButton 
              key={index} 
              size="small"
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.05)', 
                color: 'white',
                '&:hover': { bgcolor: social.color, color: 'white' }
              }}
            >
              {social.icon}
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Card>
  );
};

export default ChefCard;