import React from "react";
import { Box, Container, Typography, Stack} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CoffeeIcon from "@mui/icons-material/Coffee";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Grid from "@mui/material/Grid";


interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURE_DATA: FeatureItem[] = [
  {
    icon: <RestaurantMenuIcon sx={{ fontSize: 48 }} />,
    title: "MENU FOR EVERY TASTE",
    description:
      "Lorem ipsum dolor sit amet consectetur. Felis eget sit scelerisque vestibulum. Urna faucibus amet massa lacus lorem.",
  },
  {
    icon: <CoffeeIcon sx={{ fontSize: 48 }} />,
    title: "ALWAYS QUALITY BEANS",
    description:
      "Lorem ipsum dolor sit amet consectetur. Felis eget sit scelerisque vestibulum. Urna faucibus amet massa lacus lorem.",
  },
  {
    icon: <PersonOutlineIcon sx={{ fontSize: 48 }} />,
    title: "EXPERIENCED BARISTA",
    description:
      "Lorem ipsum dolor sit amet consectetur. Felis eget sit scelerisque vestibulum. Urna faucibus amet massa lacus lorem.",
  },
];

const FeaturesSection: React.FC = () => {
 
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#0B0F13", 
        color: "#FFFFFF",
        py: { xs: 8, md: 12 },
        px: 2,
      }}
    >
      <Container maxWidth="lg">
       
        <Stack
          spacing={2}
          alignItems="center"
          textAlign="center"
          sx={{ mb: 8 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#D4A373", 
              fontWeight: 700,
              letterSpacing: 2,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -4,
                left: "50%",
                transform: "translateX(-50%)",
                width: "30px",
                height: "2px",
                bgcolor: "#D4A373",
              },
            }}
          >
            FEATURES
          </Typography>

          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "3rem" },
              textTransform: "capitalize",
            }}
          >
            Why people choose us?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              maxWidth: "700px",
              lineHeight: 1.6,
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc
            varius. Facilisis eget cras sit semper sit enim. Turpis aliquet at
            ac eu donec ut.
          </Typography>
        </Stack>

        <Grid container spacing={6}>
          {FEATURE_DATA.map((feature, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 4 }}
            >
              <Stack
                spacing={3}
                alignItems="center"
                textAlign="center"
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: "#FFFFFF",
                    p: 2,
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontSize: "1.1rem",
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    lineHeight: 1.7,
                    maxWidth: "300px",
                  }}
                >
                  {feature.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
