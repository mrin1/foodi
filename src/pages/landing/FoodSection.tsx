import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Rating,
  styled,
 type  CardMediaProps,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import FoodImage from "../../assets/images/home/food-image.png"
import FoodImage1 from "../../assets/images/home/food-image-1.png"
import FoodImage2 from "../../assets/images/home/food-image-2.png"

const THEME_PALETTE = {
  accent: '#FF9F0D',
  surfaceDark: '#0D0D0D',
  cardBackground: '#111111',
  textPrimary: '#FFFFFF',
  textSecondary: '#828282',
  divider: '#1a1a1a',
  starInactive: '#333333',
};

interface Dish {
  id: number;
  name: string;
  cost: string;
  description: string;
  rating: number;
  img: string;
  
}



const DISHES_DATA: Dish[] = [
  { id: 1, name: 'Fried Chicken', cost: 'Rs.250', rating: 4, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' , img: FoodImage },
  { id: 2, name: 'Kolkata Style Roll', cost: 'Rs.99', rating: 4, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: FoodImage1 },
  { id: 3, name: 'Chicken Burger', cost: 'Rs.175', rating: 5, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: FoodImage2 },
];


const MenuCard = styled(Card)(({  }) => ({
  backgroundColor: THEME_PALETTE.cardBackground,
  borderRadius: '12px',
  color: THEME_PALETTE.textPrimary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.4s ease-in-out',
  border: `1px solid ${THEME_PALETTE.divider}`,
  maxWidth: '360px',
  margin: '0 auto',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0px 15px 35px rgba(0,0,0,0.7)',
  },
}));

const MediaWrapper = styled(Box)({
  position: 'relative',
  padding: '16px',
});

const ProductImage = styled(CardMedia)<CardMediaProps & { alt?: string; component?: React.ElementType }>({
  borderRadius: '8px',
  aspectRatio: '1.4 / 1',
  objectFit: 'cover',
});


const WishlistButton = styled(IconButton)({
  position: 'absolute',
  top: '25px',
  right: '25px',
  backgroundColor: 'rgba(27, 27, 27, 0.7)',
  backdropFilter: 'blur(5px)',
  padding: '7px',
  color: THEME_PALETTE.accent,
  '&:hover': {
    backgroundColor: THEME_PALETTE.accent,
    color: '#fff',
  },
});

const AddToCartButton = styled(IconButton)({
  border: '1px solid #333',
  color: THEME_PALETTE.textPrimary,
  transition: '0.3s',
  '&:hover': {
    backgroundColor: THEME_PALETTE.accent,
    borderColor: THEME_PALETTE.accent,
  },
});

const FoodMenu: React.FC = () => {
  return (
    <Box sx={{ bgcolor: THEME_PALETTE.surfaceDark, py: { xs: 6, md: 10 }, px: 2 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: THEME_PALETTE.accent,
              fontWeight: 700,
              letterSpacing: 2,
              display: 'block',
              mb: 1,
            }}
          >
            Popular Menu
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              color: THEME_PALETTE.textPrimary,
            }}
          >
            Explore Our Foods
          </Typography>
          <Typography
            sx={{
              color: THEME_PALETTE.textSecondary,
              maxWidth: '600px',
              mx: 'auto',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            Discover our hand-picked selection of gourmet dishes, prepared daily with 
            the freshest ingredients and authentic spices.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {DISHES_DATA.map((dish) => (
            <Grid size={{ xs:12, sm:6, md:4 }} key={dish.id}>
              <MenuCard elevation={0}>
                <MediaWrapper>
                  <ProductImage
                    component="img"
                    image={dish.img}
                    alt={dish.name}
                  />
                  <WishlistButton size="small">
                    <FavoriteBorderIcon fontSize="small" />
                  </WishlistButton>
                </MediaWrapper>

                <CardContent sx={{ px: 3, pb: 4 }}>
                  <Rating
                    value={dish.rating}
                    readOnly
                    size="small"
                    sx={{
                      mb: 2,
                      color: THEME_PALETTE.accent,
                      '& .MuiRating-iconEmpty': { color: THEME_PALETTE.starInactive },
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 1, color: THEME_PALETTE.textPrimary }}
                  >
                    {dish.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: THEME_PALETTE.textSecondary,
                      mb: 3,
                      height: '40px',
                      overflow: 'hidden',
                    }}
                  >
                    {dish.description}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                      variant="h6"
                      sx={{ color: THEME_PALETTE.accent, fontWeight: 800 }}
                    >
                      {dish.cost}
                    </Typography>
                    <AddToCartButton size="medium">
                      <ShoppingBasketOutlinedIcon fontSize="small" />
                    </AddToCartButton>
                  </Box>
                </CardContent>
              </MenuCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FoodMenu;