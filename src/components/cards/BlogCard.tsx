import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Stack, 
  Link,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface BlogCardProps {
  image: string;
  title: string;
  date: string;
  admin: string;
  comments: string;
  description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, title, date, admin, comments, description }) => {
  return (
    <Card 
      sx={{ 
        width: '100%', 
        maxWidth: 380,
        bgcolor: '#121212', 
        color: 'white', 
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #333',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { 
          borderColor: '#FF9F0D',
          transform: 'translateY(-10px)',
          boxShadow: '0px 10px 20px rgba(0,0,0,0.6)'
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia 
          component="img" 
          height="240" 
          image={image} 
          alt={title} 
          sx={{ 
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            '&:hover': { transform: 'scale(1.1)' }
          }}
        />
      </Box>
      
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <PersonOutlineIcon sx={{ fontSize: '16px', color: '#FF9F0D' }} />
            <Typography variant="caption" sx={{ color: '#828282', fontWeight: 500 }}>{admin}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CalendarTodayOutlinedIcon sx={{ fontSize: '14px', color: '#FF9F0D' }} />
            <Typography variant="caption" sx={{ color: '#828282', fontWeight: 500 }}>{date}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: '14px', color: '#FF9F0D' }} />
            <Typography variant="caption" sx={{ color: '#828282', fontWeight: 500 }}>{comments}</Typography>
          </Stack>
        </Stack>

        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 1.5, 
            minHeight: '56px',
            fontSize: '1.2rem',
            lineHeight: 1.3
          }}
        >
          {title}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            color: '#828282', 
            mb: 3, 
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2, 
            lineHeight: 1.6
          }}
        >
          {description}
        </Typography>

        <Link 
          href="#" 
          underline="none" 
          sx={{ 
            color: 'white', 
            display: 'inline-flex', 
            alignItems: 'center', 
            fontWeight: '600',
            fontSize: '0.9rem',
            letterSpacing: '0.5px',
            '&:hover': { color: '#FF9F0D' }
          }}
        >
          READ MORE <ArrowForwardIcon sx={{ ml: 1, fontSize: '18px', color: '#FF9F0D' }} />
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;