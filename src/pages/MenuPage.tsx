import React, { useEffect } from "react";
import { Box, Container, Typography, Grid, CircularProgress } from "@mui/material";
import PageHeader from "../components/common/PageHeader";
import MenuCard from "../components/cards/MenuCard";
import { useAppDispatch, useAppSelector } from "../hooks/utils/redux";
import { fetchMenu } from "../hooks/redux-toolkit/slice/menu.slice";
import { addToCart } from "../hooks/redux-toolkit/slice/cart.slice";

const MenuPage: React.FC = ({

}) => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.menu);

  useEffect(() => { dispatch(fetchMenu()); }, [dispatch]);
    const handleAddToCart = (item: any) => {
    dispatch(
      addToCart({
        id: item.$id,       
        title: item.title,  
        price: Number(item.price),
        image: item.image,
        qty: 1,
      })
    );
  };

  return (
    <Box sx={{ bgcolor: "#0D0D0D", minHeight: "100vh", pb: 10 }}>
      <PageHeader title="Our Menu" breadcrumb="Our Menu" />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" sx={{ color: "white", fontWeight: 900, textAlign: "center", mb: 6 }}>Our Delicious Menu</Typography>
        {loading ? <Box display="flex" justifyContent="center" py={10}><CircularProgress sx={{ color: "#FF9F0D" }}/></Box> :
          <Grid container spacing={3}>
            {items.map((item) => (
              <Grid  key={item.$id} size={{  xs:12, sm:6, md:4 }}  display="flex" justifyContent="center">
                <MenuCard {...item}
                  onAddToCart={() => handleAddToCart(item)}
                 />
               
              </Grid>
            ))}
          </Grid>
        }
      </Container>
    </Box>
  );
};
export default MenuPage;