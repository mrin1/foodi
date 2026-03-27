import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Rating,
  Stack,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

interface MenuCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  onAddToCart: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  image,
  title,
  description,
  price,
  rating,
  onAddToCart,
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "#1A1A1A",
        color: "white",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="220"
          image={image}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "rgba(0,0,0,0.3)",
            color: "white",
            "&:hover": { color: "#FF9F0D" },
          }}
        >
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{ color: "#FF9F0D" }}
          />
        </Stack>

        <Typography
          variant="h6"
          sx={{ fontWeight: "600", color: "#FF9F0D", mb: 1 }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#828282", mb: 2, fontSize: "0.85rem" }}
        >
          {description}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            sx={{ color: "#FF9F0D", fontWeight: "bold" }}
          >
            Rs.{price}
          </Typography>

          <IconButton
            sx={{
              bgcolor: "transparent",
              border: "1px solid #333",
              color: "white",
              borderRadius: "8px",
              "&:hover": { bgcolor: "#FF9F0D", color: "black" },
            }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
          >
            <Box component="span" sx={{ fontSize: "18px" }}>
              <ShoppingBasketOutlinedIcon fontSize="small" />
            </Box>
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
