import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  CircularProgress,
} from "@mui/material";
import ChefCard from "../components/cards/ChefCard";
import PageHeader from "../components/common/PageHeader";
import { useAppDispatch, useAppSelector } from "../hooks/utils/redux";
import { fetchChefs } from "../hooks/redux-toolkit/slice/chef.slice";

const ChefPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.chef);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchChefs());
    }
  }, [dispatch, items.length]);

  return (
    <Box sx={{ bgcolor: "#0D0D0D", minHeight: "100vh", pb: 10 }}>
      <PageHeader title="Our Chef" breadcrumb="Chef" />

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Stack
          spacing={2}
          alignItems="center"
          sx={{ mb: 6, textAlign: "center" }}
        >
          <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
            Our World Class Chef
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#828282", maxWidth: "600px" }}
          >
            Meet the culinary experts behind our signature dishes, each bringing
            unique expertise and passion to your plate.
          </Typography>
        </Stack>

        {loading && items.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#E48C46" }} />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {items.map((chef) => (
              <Grid
                key={chef.$id}
                size={{ xs: 12, sm: 6, md: 3 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ChefCard
                  name={chef.name}
                  designation={chef.designation}
                  image={chef.image}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ChefPage;
