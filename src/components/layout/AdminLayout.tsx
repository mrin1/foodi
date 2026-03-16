import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { logout } from "../../hooks/redux-toolkit/slice/auth.slice";
import { useAppDispatch } from "../../hooks/utils/redux";
import { toast } from "sonner";

const drawerWidth = 280;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Log out successfully")
    navigate("/");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    {
      text: "Menu Management",
      icon: <RestaurantMenuIcon />,
      path: "/admin/menu",
    },
    {
      text: "Chef Management",
      icon: <EngineeringIcon />,
      path: "/admin/chefs",
    },
    {
      text: "Blog Management",
      icon: <ArticleIcon />,
      path: "/admin/blogs",
    },
     {
      text: "order Management",
      icon: <ArticleIcon />,
      path: "/admin/order",
    },
    {
      text: "contact Management",
      icon: <ArticleIcon />,
      path: "/admin/contact",
    },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#0D0D0D", minHeight: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#11191f",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            color: "white",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ p: 4, alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              bgcolor: "#E48C46",
              p: 0.5,
              borderRadius: "4px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            F
          </Box>
          <Typography variant="h6" fontWeight={900} letterSpacing={1}>
            OODI ADMIN
          </Typography>
        </Stack>

        <List sx={{ px: 2 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: "12px",
                  mb: 1,
                  bgcolor: isActive
                    ? "rgba(228, 140, 70, 0.15)"
                    : "transparent",
                  color: isActive ? "#E48C46" : "white",
                  "&:hover": {
                    bgcolor: isActive
                      ? "rgba(228, 140, 70, 0.2)"
                      : "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: "45px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Box sx={{ mt: "auto", p: 3 }}>
          <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", mb: 2 }} />
          <ListItemButton
            onClick={handleLogout}
            // onClick={() => navigate("/")}
            sx={{
              color: "#ff4d4d",
              borderRadius: "12px",
              "&:hover": { bgcolor: "rgba(255, 77, 77, 0.1)" },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Exit Website" />
          </ListItemButton>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
