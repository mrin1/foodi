import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
  Link,
  Divider,
} from "@mui/material";
import {
  Facebook,
  X,
  Instagram,
  LinkedIn,
  EmailOutlined,
  LocalPhoneOutlined,
} from "@mui/icons-material";
import { keyframes, styled } from "@mui/material";

const boxLoop = keyframes`
  0%, 70%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
  75% { transform: scale(0) rotate(-20deg); opacity: 0; }
  85% { transform: scale(1.2) rotate(10deg); opacity: 1; }
  90% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

const letterLoop = keyframes`
  0%, 75%, 100% { opacity: 1; transform: translateY(0); }
  80% { opacity: 0; transform: translateY(10px); }
  90% { opacity: 1; transform: translateY(0); }
`;

const textLoop = keyframes`
  0%, 65%, 100% { width: 100%; opacity: 1; transform: translateX(0); }
  75% { width: 0; opacity: 0; transform: translateX(-15px); }
  85% { width: 100%; opacity: 1; transform: translateX(0); }
`;

const AnimatedFooterBox = styled(Box)({
  backgroundColor: "#ff7d00",
  color: "#fff",
  width: 34,
  height: 34,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "6px",
  fontWeight: 900,
  fontSize: "1.2rem",
  animation: `${boxLoop} 6s infinite ease-in-out`,
  "& span": {
    display: "inline-block",
    animation: `${letterLoop} 6s infinite ease-in-out`,
  },
});

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const titleStyle = {
    color: "#FFFFFF",
    fontSize: "1.15rem",
    fontWeight: 700,
    mb: 3,
    fontFamily: '"Inter", "Poppins", sans-serif',
  };

  const textStyle = {
    color: "#959595",
    fontSize: "0.92rem",
    lineHeight: 1.7,
    fontFamily: '"Inter", sans-serif',
  };

  const linkStyle = {
    ...textStyle,
    textDecoration: "none",
    display: "block",
    mb: 1.5,
    transition: "0.3s",
    "&:hover": { color: "#ff7d00" },
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0c0c0c",
        backgroundImage: `url('https://www.transparenttextures.com/patterns/dark-matter.png')`, // Subtle texture
        color: "#ffffff",
        py: { xs: 6, md: 10 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{ alignItems: "flex-start", justifyContent: "center" }}
        >
          <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
            <Stack spacing={2.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <AnimatedFooterBox>
                  <span>F</span>
                </AnimatedFooterBox>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: 1,
                    color: "#ff7d00",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    animation: `${textLoop} 6s infinite ease-in-out`,
                  }}
                >
                  OODI
                </Typography>
              </Box>
              <Typography sx={{ ...textStyle, maxWidth: 300 }}>
                Lorem ipsum dolor sit amet consectetur. Tristique cursus morbi
                nibh nec et vulputate. Turpis tortor nisl imperdiet quis
                accumsan. Ligula netus amet leo ultricies.
              </Typography>
              <Stack direction="row" spacing={1.5}>
                {[Facebook, X, Instagram, LinkedIn].map((Icon, i) => (
                  <IconButton
                    key={i}
                    size="small"
                    sx={{
                      color: "#959595",
                      border: "1px solid #222",
                      borderRadius: "50%",
                      p: 1,
                      "&:hover": {
                        bgcolor: "#ff7d00",
                        color: "#fff",
                        borderColor: "#ff7d00",
                      },
                    }}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Typography sx={titleStyle}>Contact Us</Typography>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <EmailOutlined sx={{ color: "#ff7d00", fontSize: 20 }} />
                <Typography sx={textStyle}>infofoodi@gmail.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <LocalPhoneOutlined sx={{ color: "#ff7d00", fontSize: 20 }} />
                <Typography sx={textStyle}>+91 7029112661</Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Typography sx={titleStyle}>User Link</Typography>
            <Link href="#" sx={linkStyle}>
              About Us
            </Link>
            <Link href="#" sx={linkStyle}>
              Contact Us
            </Link>
            <Link href="#" sx={linkStyle}>
              Order Delivery
            </Link>
            <Link href="#" sx={linkStyle}>
              Payments & Tex
            </Link>
            <Link href="#" sx={linkStyle}>
              Terms of Services
            </Link>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
            <Typography sx={titleStyle}>Location</Typography>
            <Typography sx={{ ...textStyle, mb: 0.5 }}>
              543 Country Club Ave,
            </Typography>
            <Typography sx={{ ...textStyle, mb: 0.5 }}>
              NC 27587, London, UK
            </Typography>
            <Typography sx={{ ...textStyle, mb: 3 }}>+1257 6541120</Typography>

            <Stack direction="row" spacing={1}>
              {["mastercard", "google-pay", "visa", "paypal"].map((item) => (
                <Box
                  key={item}
                  component="img"
                  src={`https://img.icons8.com/color/48/${item}.png`}
                  alt={item}
                  sx={{
                    height: 28,
                    bgcolor: "#fff",
                    p: "4px 8px",
                    borderRadius: "4px",
                    objectFit: "contain",
                  }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 8, mb: 4, borderColor: "#1e1e1e" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
          }}
        >
          <Typography sx={{ color: "#555", fontSize: "0.85rem" }}>
            © {currentYear} ARR, All right reserved
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              href="#"
              sx={{
                color: "#555",
                fontSize: "0.85rem",
                textDecoration: "none",
                "&:hover": { color: "#fff" },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              sx={{
                color: "#555",
                fontSize: "0.85rem",
                textDecoration: "none",
                "&:hover": { color: "#fff" },
              }}
            >
              Terms of Use
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
