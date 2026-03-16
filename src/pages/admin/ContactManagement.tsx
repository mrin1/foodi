import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, IconButton, Skeleton, Tooltip, Alert,
  Snackbar, Stack,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import EmailIcon from "@mui/icons-material/Email";

import { useAppDispatch, useAppSelector } from "../../hooks/utils/redux";
import { fetchAllMessages, deleteMessage } from "../../hooks/redux-toolkit/slice/contact.slice";

const ContactManagement: React.FC = () => {
  const dispatch = useAppDispatch();

  const { messages, loading, error } = useAppSelector((state) => state.contact);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchAllMessages());
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      const result = await dispatch(deleteMessage(id));
      if (deleteMessage.fulfilled.match(result)) {
        setSnackbar({ open: true, message: "Inquiry deleted successfully" });
      }
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#0D0D0D", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={900} color="#E48C46" sx={{ letterSpacing: "1px" }}>
            CONTACT INQUIRIES
          </Typography>
          <Typography variant="body2" color="#828282">
            Manage customer messages from Appwrite Database
          </Typography>
        </Box>
        <IconButton onClick={handleRefresh} sx={{ color: "#E48C46", border: "1px solid #333" }}>
          <RefreshIcon />
        </IconButton>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, bgcolor: "#1a0d0d", color: "#ff4d4d" }}>
          {error}
        </Alert>
      )}

      <TableContainer 
        component={Paper} 
        sx={{ 
          bgcolor: "#11191f", 
          borderRadius: "16px", 
          backgroundImage: "none", 
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)" 
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { color: "#828282", fontWeight: 700, borderBottom: "1px solid #333", py: 2.5 } }}>
              <TableCell>SENDER</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>SUBJECT</TableCell>
              <TableCell>MESSAGE</TableCell>
              <TableCell>DATE</TableCell>
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
            ) : messages && messages.length > 0 ? (
              messages.map((msg: any) => (
                <TableRow 
                  key={msg.$id} 
                  sx={{ 
                    "& td": { color: "white", borderBottom: "1px solid #1a242b", py: 2 },
                    "&:hover": { bgcolor: "rgba(255,255,255,0.02)" }
                  }}
                >
                  <TableCell sx={{ fontWeight: 'bold' }}>{msg.name || "N/A"}</TableCell>
                  
                  <TableCell sx={{ color: "#828282" }}>{msg.email || "N/A"}</TableCell>

                  <TableCell>
                    <Chip 
                      label={msg.subjects || "No Subject"} 
                      size="small"
                      sx={{ 
                        bgcolor: "rgba(228, 140, 70, 0.1)", 
                        color: "#E48C46", 
                        borderRadius: "4px",
                        fontWeight: 600
                      }} 
                    />
                  </TableCell>

                  <TableCell sx={{ maxWidth: "250px" }}>
                    <Tooltip title={msg.message}>
                      <Typography variant="body2" noWrap sx={{ color: "#E0E0E0" }}>
                        {msg.message}
                      </Typography>
                    </Tooltip>
                  </TableCell>

                  <TableCell sx={{ color: "#828282", fontSize: "0.85rem" }}>
                    {msg.$createdAt ? new Date(msg.$createdAt).toLocaleDateString("en-GB") : "N/A"}
                  </TableCell>

                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Tooltip title="Reply via Email">
                        <IconButton 
                          size="small" 
                          component="a" 
                          href={`mailto:${msg.email}`}
                          sx={{ color: "#4caf50" }}
                        >
                          <EmailIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(msg.$id)}
                        sx={{ color: "#ff4d4d" }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10, color: "#828282" }}>
                  No customer inquiries found.
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

export default ContactManagement;