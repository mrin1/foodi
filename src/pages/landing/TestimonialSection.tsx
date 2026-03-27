import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Avatar, 
  Stack, 
  Rating,
  useTheme,
  useMediaQuery
} from '@mui/material';
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

// Expanded to 6 items so the 3-per-view slider has data to slide through
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jerome Bell",
    location: "New York, USA",
    avatar: "https://i.pravatar.cc/150?u=1",
    text: "From the moment we walked in, everything felt perfect — the food, the ambiance, and the warm service. It's not just a meal, it's an experience we keep coming back for.",
    rating: 5,
    accentColor: "#FFB400",
  },
  {
    id: 2,
    name: "Kristin Watson",
    location: "London, UK",
    avatar: "https://i.pravatar.cc/150?u=2",
    text: "The multi-cuisine options are fantastic. I tried dishes I've never heard of before, and every single one was bursting with incredible, authentic flavors.",
    rating: 4,
    accentColor: "#FF69B4",
  },
  {
    id: 3,
    name: "Arlene McCoy",
    location: "Sydney, AUS",
    avatar: "https://i.pravatar.cc/150?u=3",
    text: "Fast delivery and the food arrives piping hot. It's rare to find a restaurant that cares this much about both their dine-in and takeout quality.",
    rating: 5,
    accentColor: "#FF7F50",
  },
  {
    id: 4,
    name: "Marvin McKinney",
    location: "Toronto, CAN",
    avatar: "https://i.pravatar.cc/150?u=4",
    text: "We booked the private area for a family event. The staff was incredibly accommodating, and the customized menu was a massive hit with everyone.",
    rating: 4,
    accentColor: "#4CAF50",
  },
  {
    id: 5,
    name: "Esther Howard",
    location: "Paris, FRA",
    avatar: "https://i.pravatar.cc/150?u=5",
    text: "As a vegetarian, I usually have limited choices, but their plant-based menu is extensive and absolutely delicious. Highly recommended!",
    rating: 5,
    accentColor: "#00BCD4",
  },
  {
    id: 6,
    name: "Guy Hawkins",
    location: "Berlin, GER",
    avatar: "https://i.pravatar.cc/150?u=6",
    text: "The Master Chef truly knows his craft. You can taste the passion in every bite. This has quickly become our favorite weekend dinner spot.",
    rating: 5,
    accentColor: "#9C27B0",
  },
];

const TestimonialSection: React.FC = () => {
  const BG_DARK = '#13191D'; 
  

  const theme = useTheme();

  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); // Desktop
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm')); // Tablet

  const itemsPerView = isMdUp ? 3 : isSmUp ? 2 : 1;
  const maxIndex = testimonials.length - itemsPerView;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000); 
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: BG_DARK, width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        
      
        <Box sx={{ textAlign: 'center', mb: 8, px: { xs: 2, md: 15 } }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: '#E08E45', 
              fontWeight: 'bold', 
              letterSpacing: 2, 
              borderBottom: '2px solid #E08E45', 
              pb: 0.5,
              display: 'inline-block'
            }}
          >
            TESTIMONIALS
          </Typography>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ color: 'white', fontWeight: 800, mt: 2, mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            What our clients say
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: '#A0A0A0', lineHeight: 1.8, fontSize: '0.95rem', maxWidth: '700px', mx: 'auto' }}
          >
            Don't just take our word for it. Read what our beloved customers have to say 
            about their dining experiences, our food quality, and our world-class service.
          </Typography>
        </Box>

        <Box sx={{ overflow: 'hidden', width: '100%', px: 1, py: 2 }}>
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.6s ease-in-out',
             
              transform: `translateX(-${activeIndex * (100 / itemsPerView)}%)`, 
            }}
          >
            {testimonials.map((item) => (
              <Box 
                key={item.id} 
                sx={{ 
                
                  flexShrink: 0, 
                  width: `${100 / itemsPerView}%`, 
                  px: { xs: 1, md: 2 },
                  display: 'flex', 
                  justifyContent: 'center' 
                }}
              >
               
                <Box sx={{ width: '100%', maxWidth: '400px', position: 'relative', mb: 6 }}>
                  <Box
                    sx={{
                      bgcolor: BG_DARK,
                      color: 'white',
                      p: 4,
                      borderRadius: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 35% 100%, 35% 82%, 0% 82%)',
                      minHeight: '280px',
                      pb: 10,
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
                      bottom: -15, 
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
              </Box>
            ))}
          </Box>
        </Box>

      
        <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 4 }}>
         
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <Box 
              key={index}
              onClick={() => setActiveIndex(index)}
              sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: activeIndex === index ? '#E08E45' : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ...(activeIndex === index && {
                  transform: 'scale(1.3)'
                })
              }} 
            />
          ))}
        </Stack>

      </Container>
    </Box>
  );
};

export default TestimonialSection;