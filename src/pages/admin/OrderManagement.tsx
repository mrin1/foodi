import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, IconButton, Skeleton, Tooltip, Alert,
  Snackbar, Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useAppDispatch, useAppSelector } from "../../hooks/utils/redux";
import { fetchAllOrders, updateOrderStatus } from "../../hooks/redux-toolkit/slice/order.slice";

const OrderManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const { items, loading, error } = useAppSelector((state) => state.order);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchAllOrders());
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const result = await dispatch(
      updateOrderStatus({ documentId: id, status: newStatus }),
    );
    if (updateOrderStatus.fulfilled.match(result)) {
      setSnackbar({ open: true, message: `Order marked as ${newStatus}` });
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return { bgcolor: "rgba(46, 125, 50, 0.15)", color: "#4caf50", border: "1px solid #4caf50" };
      case "pending":
        return { bgcolor: "rgba(228, 140, 70, 0.15)", color: "#E48C46", border: "1px solid #E48C46" };
      default:
        return { bgcolor: "#1a242b", color: "#828282", border: "1px solid #333" };
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#0D0D0D", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={900} color="#E48C46">ORDER MANAGEMENT</Typography>
          <Typography variant="body2" color="#828282">Reading real-time data from Appwrite Database</Typography>
        </Box>
        <IconButton onClick={handleRefresh} sx={{ color: "#E48C46", border: "1px solid #333" }}>
          <RefreshIcon />
        </IconButton>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <TableContainer component={Paper} sx={{ bgcolor: "#11191f", borderRadius: "16px", backgroundImage: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { color: "#828282", fontWeight: 700, borderBottom: "1px solid #333", py: 2.5 } }}>
              <TableCell>ORDER ID</TableCell>
              <TableCell>CUSTOMER</TableCell>
              <TableCell>ITEMS</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6}><Skeleton sx={{ bgcolor: "#1a242b" }} height={60} /></TableCell>
                </TableRow>
              ))
            ) : items && items.length > 0 ? (
              items.map((order: any) => {
                let cartItems = [];
                try {
                  cartItems = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []);
                } catch (e) {
                  cartItems = [];
                }

                return (
                  <TableRow key={order.$id} sx={{ "& td": { color: "white", borderBottom: "1px solid #1a242b", py: 2 } }}>
                    <TableCell sx={{ color: "#E48C46", fontWeight: 'bold' }}>
                       #{order.$id?.slice(-6).toUpperCase() || "N/A"}
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{order.name || "Unknown Customer"}</Typography>
                      <Typography variant="caption" sx={{ color: "#828282" }}>
                        ID: {order.userId?.slice(0, 8) || "N/A"}...
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Tooltip title={cartItems.map((i: any) => i.title).join(", ")}>
                        <Typography variant="body2">{cartItems.length} Products</Typography>
                      </Tooltip>
                    </TableCell>

                    <TableCell sx={{ fontWeight: 800 }}>
                      Rs.{order.totalAmount?.toLocaleString() || "0"}
                    </TableCell>

                    <TableCell>
                      <Chip 
                        label={order.status?.toUpperCase() || "PENDING"} 
                        sx={{ ...getStatusStyle(order.status), borderRadius: "4px", fontWeight: 'bold' }} 
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton size="small" sx={{ color: "#828282" }}><VisibilityIcon fontSize="small" /></IconButton>
                        {order.status !== "completed" && (
                          <IconButton 
                            size="small" 
                            onClick={() => handleStatusUpdate(order.$id, "completed")}
                            sx={{ color: "#4caf50", bgcolor: "rgba(76, 175, 80, 0.1)" }}
                          >
                            <CheckCircleIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10, color: "#828282" }}>
                  No orders found in the database.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity="success" sx={{ width: "100%", bgcolor: "#4caf50", color: "white" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderManagement;