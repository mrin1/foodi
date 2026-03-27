import React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Button,
  CardMedia,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import SpeedIcon from "@mui/icons-material/Speed";
import PageHeader from "../components/common/PageHeader";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { AccordionSummary } from "@mui/material";
import { useNavigate } from "react-router-dom";

const faqData = [
  {
    q: "Do you offer home delivery?",
    a: "Yes, we provide fast home delivery within a 10km radius of our restaurant.",
  },
  {
    q: "Can I book a table online?",
    a: "Absolutely! You can use our reservation system on the home page or contact us directly.",
  },
  {
    q: "Do you have vegetarian and vegan options?",
    a: "Our menu includes a wide variety of plant-based dishes crafted with fresh ingredients.",
  },
  {
    q: "What are your opening hours?",
    a: "We are open Mon-Fri: 9am-10pm and Sat-Sun: 9am-7pm.",
  },
  {
    q: "Do you host private events or parties?",
    a: "Yes, we have a dedicated space for private events. Please contact our management team for bookings.",
  },
];

const sliderImages = [
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const faqImages = [
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=400",
];

const AboutPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{ bgcolor: "#0D0D0D", minHeight: "100vh", pb: 10 }}>
      <PageHeader title="About Us" breadcrumb="About" />

      <Container maxWidth="lg">
        <Box
          sx={{
            width: "100%",
            bgcolor: "#0D0D0D",
            py: { xs: 8, md: 14 },
          }}
        >
          <Container maxWidth="lg">
            <Grid container alignItems="center" spacing={{ xs: 6, md: 8 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 360, md: 500 },
                  }}
                >
                  <Box
                    sx={{
                      width: "90%",
                      height: "78%",
                      borderRadius: "26px",
                      overflow: "hidden",
                      boxShadow: "0 30px 60px rgba(0,0,0,0.7)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-6%",
                      left: "38%",
                      width: "55%",
                      height: "58%",
                      borderRadius: "26px",
                      border: "14px solid #0D0D0D",
                      overflow: "hidden",
                      backgroundColor: "#0D0D0D",
                      boxShadow: "0 25px 45px rgba(0,0,0,0.85)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600"
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Stack
                  spacing={3.5}
                  sx={{
                    maxWidth: 520,
                    ml: { md: "auto" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: { xs: "2.4rem", md: "3.4rem" },
                      lineHeight: 1.15,
                    }}
                  >
                    We provide healthy food for your family
                  </Typography>

                  <Typography
                    sx={{
                      color: "#9B9B9B",
                      fontSize: "1.05rem",
                      lineHeight: 1.85,
                    }}
                  >
                    every plate tells a story of fresh ingredients, rich
                    flavors, and a passion for cooking. From the first bite to
                    the last, we aim to make your experience warm, memorable,
                    and full of taste. Whether you join us for a quick meal or a
                    special occasion, we're here to serve happiness on every
                    plate.
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#E48C46",
                      px: 6,
                      py: 1.8,
                      borderRadius: "14px",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      width: "fit-content",
                      mx: { xs: "auto", md: 0 },
                      "&:hover": { bgcolor: "#d17b38" },
                    }}
                    onClick={()=>navigate("/contact")}
                  >
                    CONTACT US
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ mb: 15 }}>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              overflowX: "auto",
              pb: 2,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {sliderImages.map((imgUrl, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  minWidth: "240px",
                  height: "320px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <CardMedia
                  component="img"
                  image={imgUrl}
                  sx={{ height: "100%", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    sx={{
                      bgcolor: "rgba(228,140,70,0.9)",
                      color: "white",
                      "&:hover": { bgcolor: "#E48C46" },
                    }}
                  >
                    <PlayCircleFilledIcon sx={{ fontSize: 50 }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        <Grid container spacing={4} sx={{ mb: 15 }}>
          {[
            {
              icon: <MenuBookIcon />,
              title: "Multi Cuisine",
              desc: "In the new era of technology we look in the future with certainty life.",
            },
            {
              icon: <FactCheckIcon />,
              title: "Easy To Order",
              desc: "In the new era of technology we look in the future with certainty life.",
            },
            {
              icon: <SpeedIcon />,
              title: "Fast Delivery",
              desc: "In the new era of technology we look in the future with certainty life.",
            },
          ].map((item, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Stack
                alignItems="center"
                spacing={2}
                sx={{ textAlign: "center", color: "white" }}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.05)",
                    p: 3,
                    borderRadius: "50%",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { fontSize: 40, color: "#E48C46" },
                  })}
                </Box>
                <Typography variant="h5" fontWeight={800}>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#828282", maxWidth: "280px" }}
                >
                  {item.desc}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h4" sx={{ color: "white", fontWeight: 900 }}>
            Frequently Asked Question
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 5 }}>
            <Grid container spacing={2}>
              {faqImages.map((imgUrl, index) => (
                <Grid size={{ xs: 6 }} key={index}>
                  <Box
                    sx={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      height: "170px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={imgUrl}
                      sx={{ height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            {faqData.map((item, index) => (
              <Accordion
                key={index}
                disableGutters
                sx={{
                  bgcolor: "#11191f",
                  color: "white",
                  mb: 2,
                  borderRadius: "16px !important",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography component="span">{item.q}</Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{ borderTop: "1px solid rgba(255,255,255,0.05)", pt: 2 }}
                >
                  <Typography sx={{ color: "#828282", lineHeight: 1.7 }}>
                    {item.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
