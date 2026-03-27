import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import routing tools
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Stack,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
} from "@mui/material";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import LoginPopup from "../common/LoginPopup";
import { keyframes, styled } from "@mui/material";
import { useAppSelector } from "../../hooks/utils/redux";

const navItems = [
  { name: "Home", path: "/home" },
  { name: "Menu", path: "/menu" },
  { name: "About Us", path: "/about" },
  { name: "Chef", path: "/chef" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

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

const GoogleStyleLogoBox = styled(Box)({
  backgroundColor: "#E48C46",
  width: 34,
  height: 34,
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "bold",
  animation: `${boxLoop} 6s infinite ease-in-out`,
  "& span": {
    display: "inline-block",
    animation: `${letterLoop} 6s infinite ease-in-out`,
  },
});
const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const { items } = useAppSelector((state) => state.cart);

  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ flexGrow: 1, padding: "30px 20px" }}>
      <AppBar
        position="static"
        sx={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(15px) saturate(150%)",
          WebkitBackdropFilter: "blur(15px) saturate(150%)",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundImage: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", height: "85px" }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                "&:hover .logo-box": {
                  transform: "rotate(15deg) scale(1.1) !important",
                  animation: "none",
                },
              }}
            >
              <GoogleStyleLogoBox className="logo-box">
                <span>F</span>
              </GoogleStyleLogoBox>

              <Typography
                variant="h6"
                className="logo-text"
                sx={{
                  fontWeight: 800,
                  color: "#E48C46",
                  fontSize: "22px",
                  display: { xs: "none", sm: "block" },
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  animation: `${textLoop} 6s infinite ease-in-out`,
                }}
              >
                OODI
              </Typography>
            </Stack>
            {!isMobile && (
              <Stack direction="row" spacing={1}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    component={NavLink}
                    to={item.path}
                    sx={{
                      color: "#FFFFFF",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 500,
                      px: 2,
                      "&.active": { color: "#E48C46" },
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Stack>
            )}

            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                sx={{ color: "#fff" }}
                onClick={() => navigate("/cart")}
              >
                <Badge
                  badgeContent={totalItems}
                  showZero={false}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#E48C46",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "10px",
                      height: "18px",
                      minWidth: "18px",
                    },
                  }}
                >
                  <ShoppingBasketOutlinedIcon sx={{ fontSize: "26px" }} />
                </Badge>
              </IconButton>

              {!isMobile && (
                <Button
                  variant="contained"
                  onClick={() => setOpenLogin(true)}
                  sx={{
                    backgroundColor: "#E48C46",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "10px 32px",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#d17b38" },
                  }}
                >
                  LOGIN
                </Button>
              )}

              {isMobile && (
                <IconButton color="inherit" onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <LoginPopup open={openLogin} handleClose={() => setOpenLogin(false)} />

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: "260px",
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(20px)",
            color: "#fff",
          },
        }}
      >
        <List sx={{ pt: 4 }}>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{ "&.active": { color: "#E48C46" } }}
              >
                <ListItemText
                  primary={item.name}
                  sx={{ textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {/* --- NEW: MOBILE LOGIN BUTTON --- */}
          {/* This adds the login button to the bottom of the mobile menu */}
          <ListItem disablePadding sx={{ mt: 4, px: 3 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setOpenLogin(true); // Open the popup
                handleDrawerToggle(); // Close the drawer menu
              }}
              sx={{
                backgroundColor: "#E48C46",
                color: "#fff",
                borderRadius: "12px",
                padding: "10px 0",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#d17b38" },
              }}
            >
              LOGIN
            </Button>
          </ListItem>
          {/* --- END NEW --- */}
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
