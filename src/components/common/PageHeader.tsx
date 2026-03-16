import React from 'react';
import { Box, Typography, Container } from '@mui/material';

interface PageHeaderProps {
  title: string;
  breadcrumb: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumb }) => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        py: 12, 
        bgcolor: '#0D0D0D', 
        textAlign: 'center',
        borderBottom: '1px solid #1A1A1A'
      }}
    >
      <Container>
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'white' }}>
          <Box component="span" sx={{ color: 'white' }}>Home</Box>
          <Box component="span" sx={{ mx: 1, color: '#FF9F0D' }}>/</Box>
          <Box component="span" sx={{ color: '#FF9F0D' }}>{breadcrumb}</Box>
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ color: '#828282', mt: 3, maxWidth: '600px', mx: 'auto' }}
        >
          Explore our wide range of authentic dishes crafted with the finest ingredients and expert culinary skills.
        </Typography>
      </Container>
    </Box>
  );
};

export default PageHeader;