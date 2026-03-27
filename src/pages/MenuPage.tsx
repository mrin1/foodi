import React, { useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import PageHeader from "../components/common/PageHeader";
import MenuCard from "../components/cards/MenuCard";
import { useAppDispatch, useAppSelector } from "../hooks/utils/redux";
import { fetchMenu } from "../hooks/redux-toolkit/slice/menu.slice";
import { addToCart } from "../hooks/redux-toolkit/slice/cart.slice";
import { toast } from "sonner";

const MenuPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.menu);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchMenu());
    }
  }, [dispatch, items.length]);

  const handleAddToCart = useCallback(
    (item: any) => {
      dispatch(
        addToCart({
          id: item.$id,
          title: item.title,
          price: Number(item.price),
          image: item.image,
          qty: 1,
        }),
      );
     
      toast.success(`${item.title} added to cart!`, {
        style: {
          background: '#1A1A1A',
          color: '#FF9F0D',
          border: '1px solid #333'
        },
      });
    },
    [dispatch],
  );

  return (
    <Box sx={{ bgcolor: "#0D0D0D", minHeight: "100vh", pb: 10 }}>
      <PageHeader title="Our Menu" breadcrumb="Our Menu" />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography
          variant="h4"
          sx={{ color: "white", fontWeight: 900, textAlign: "center", mb: 6 }}
        >
          Our Delicious Menu
        </Typography>

        {loading && items.length === 0 ? (
          <Box display="flex" justifyContent="center" py={10}>
            <CircularProgress sx={{ color: "#FF9F0D" }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {items.map((item) => (
              <Grid
                key={item.$id}
                size={{ xs: 12, sm: 6, md: 4 }}
                display="flex"
                justifyContent="center"
              >
                <MenuCard {...item} onAddToCart={() => handleAddToCart(item)} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default MenuPage;
