import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Stack 
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component for the background section
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '450px',
  width: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000', // Absolute black fallback
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1920")', 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '12px',
  overflow: 'hidden',
  color: '#fff',
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(25, 45, 45, 0.8)', // Dark teal/grey from image
    color: '#fff',
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#aaa',
    opacity: 1,
  },
});

const SubscribeButton = styled(Button)({
  backgroundColor: '#D98B54', 
  color: '#fff',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#bf7643',
  },
});

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing with email:', email);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <HeroSection>
        <Stack spacing={3} alignItems="center" sx={{ maxWidth: '800px' }}>
          <Typography 
            variant="overline" 
            sx={{ letterSpacing: 4, fontWeight: 'bold', borderBottom: '2px solid #D98B54' }}
          >
            NEWS LETTER
          </Typography>

          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              fontSize: { xs: '2rem', md: '3.5rem' },
              lineHeight: 1.2 
            }}
          >
            Subscribe Our Newsletter
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ color: '#ccc', maxWidth: '600px', mx: 'auto' }}
          >
            Stay updated with our latest stories and offers. We promise not to spam you. 
            Facilisis eget cras sit semper sit enim. Turpis aliquet at ac eu donec ut.
          </Typography>

          <Box 
            component="form" 
            onSubmit={handleSubscribe}
            sx={{ 
              width: '100%', 
              mt: 2,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center'
            }}
          >
            <StyledTextField
              fullWidth
              placeholder="Type Your Email Id"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ maxWidth: { sm: '450px' } }}
            />
            <SubscribeButton type="submit" variant="contained" disableElevation>
              Subscribe
            </SubscribeButton>
          </Box>
        </Stack>
      </HeroSection>
    </Container>
  );
};

export default Newsletter;