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
        bgcolor: "#1A1A1A", // Dark grey/black card background
        color: "white",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      {/* Image Section with Heart Icon */}
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
        {/* Star Rating */}
        <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{ color: "#FF9F0D" }}
          />
        </Stack>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", color: "#FF9F0D", mb: 1 }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{ color: "#828282", mb: 2, fontSize: "0.85rem" }}
        >
          {description}
        </Typography>

        {/* Price and Cart Icon */}
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
              e.stopPropagation(); // Prevents card clicks if you later add a detail page
              onAddToCart();
            }}
          >
            <Box component="span" sx={{ fontSize: "18px" }}>
              🛒
            </Box>
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
