import React, { useEffect } from "react";
import {
  Box, Typography, Grid, Paper, Stack, Avatar, LinearProgress, 
} from "@mui/material";
// Icons
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
//import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ChatIcon from "@mui/icons-material/Chat";

// Redux & Charts
import { useAppDispatch, useAppSelector } from "../../hooks/utils/redux";
import { fetchAllOrders } from "../../hooks/redux-toolkit/slice/order.slice";
import { fetchAllMessages } from "../../hooks/redux-toolkit/slice/contact.slice";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items: orders } = useAppSelector((state) => state.order);
  const { items: menu } = useAppSelector((state) => state.menu);
  const { messages } = useAppSelector((state) => state.contact);
  const { items: chefs } = useAppSelector((state) => state.chef);
  const { items: blogs } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchAllMessages());
  }, [dispatch]);

  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const pendingOrders = orders.length - completedOrders;

  const chartData = orders.slice(-7).map((order) => ({
    name: new Date(order.$createdAt).toLocaleDateString("en-US", { weekday: "short" }),
    revenue: order.totalAmount,
  }));

  const pieData = [
    { name: "Completed", value: completedOrders, color: "#4caf50" },
    { name: "Pending", value: pendingOrders, color: "#E48C46" },
  ];

  return (
    <Box sx={{ color: "white", pb: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#E48C46" }}>
            DASHBOARD OVERVIEW
          </Typography>
          <Typography variant="body2" sx={{ color: "#828282" }}>
            Real-time business insights from Appwrite
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: "Revenue", value: `Rs. ${totalRevenue.toLocaleString()}`, icon: <TrendingUpIcon />, color: "#E48C46" },
          { title: "Orders", value: orders.length, icon: <ShoppingBagIcon />, color: "#2196f3" },
          { title: "Inquiries", value: messages.length, icon: <ChatIcon />, color: "#f44336" },
          { title: "Chefs", value: chefs.length, icon: <PeopleIcon />, color: "#9c27b0" },
        ].map((stat, i) => (
          <Grid  size={{ xs:12, sm:6, md:3}} key={i}>
            <Paper sx={statCardSx}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" sx={{ color: "#828282", fontWeight: 700 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: `${stat.color}20`, color: stat.color, borderRadius: "12px" }}>
                  {stat.icon}
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid  size={{  xs:12, md:8 }}>
          <Paper sx={chartContainerSx}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>
              Revenue Growth (Last 7 Orders)
            </Typography>
            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E48C46" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#E48C46" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#828282" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#828282" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#11191f", 
                      border: "none",
                      borderRadius: "8px",
                      color: "white"
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#E48C46" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid  size={{ xs:12, md:4}}>
          <Paper sx={chartContainerSx}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Order Status
            </Typography>
            <Box sx={{ height: 250, display: "flex", justifyContent: "center" }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Stack direction="row" justifyContent="center" spacing={3}>
              {pieData.map((item) => (
                <Stack key={item.name} direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: item.color }} />
                  <Typography variant="caption" sx={{ color: "#828282" }}>
                    {item.name}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid   size={{ xs:12 }}>
          <Paper sx={chartContainerSx}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
              Platform Content Health
            </Typography>
            <Grid container spacing={4}>
              {[
                { label: "Active Menu Items", count: menu.length, total: 100, color: "#2196f3" },
                { label: "Blog Articles Published", count: blogs.length, total: 50, color: "#4caf50" },
                { label: "Total Customer Base", count: 125, total: 500, color: "#E48C46" },
              ].map((item, i) => (
                <Grid  size={{ xs:12, md:4 }} key={i}>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.label}</Typography>
                      <Typography variant="body2" sx={{ color: item.color }}>{item.count}</Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={(item.count / item.total) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: "#1a242b", 
                        "& .MuiLinearProgress-bar": { backgroundColor: item.color },
                      }}
                    />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const statCardSx = {
  p: 3,
  backgroundColor: "#11191f", 
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.05)",
  backgroundImage: "none",
};

const chartContainerSx = {
  p: 3,
  backgroundColor: "#11191f", 
  borderRadius: "24px",
  border: "1px solid rgba(255,255,255,0.05)",
  backgroundImage: "none",
  height: "100%",
};

export default Dashboard;