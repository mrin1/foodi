import React, { useEffect } from "react";
import { Box, Container, Grid, CircularProgress, Typography } from "@mui/material";
import PageHeader from "../components/common/PageHeader";
import BlogCard from "../components/cards/BlogCard";
import { useAppDispatch, useAppSelector } from "../hooks/utils/redux";
import { fetchBlogs } from "../hooks/redux-toolkit/slice/blog.slice";

const BlogPage: React.FC = () =>  {
  const dispatch = useAppDispatch();
  
  const { items, loading, error } = useAppSelector((state) => state.blogs);

  useEffect(() => {
   
    if (items.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, items.length]);

  return (
    <Box sx={{ bgcolor: "#0D0D0D", minHeight: "100vh", pb: 10 }}>
      <PageHeader title="Latest news & blog" breadcrumb="Blog" />

      <Container maxWidth="lg" sx={{ mt: 10 }}>
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
            {items.map((blog) => (
              <Grid
                key={blog.$id}
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <BlogCard 
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  date={blog.date}
                  admin="Admin" 
                  comments="Comments" 
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default BlogPage;