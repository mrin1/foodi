import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Stack, TableContainer, Paper, Table,
  TableHead, TableRow, TableCell, TableBody, Avatar, IconButton, CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AdminPopup from "../../components/common/AdminPopup";
import { useAppDispatch, useAppSelector } from "../../hooks/utils/redux";
import { fetchMenu, deleteDish } from "../../hooks/redux-toolkit/slice/menu.slice";

const MenuManagement: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleAddNewClick = () => {
    setSelectedItem(null);
    setOpen(true);
  };

  const handleEditClick = (item: any) => {
    setSelectedItem(item);
    setOpen(true);
  };

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={900} color="white">
          Menu Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNewClick}
          sx={{ bgcolor: "#E48C46", borderRadius: "12px", "&:hover": { bgcolor: "#d17b38" } }}
        >
          Add New Dish
        </Button>
      </Stack>

      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "#11191f",
          borderRadius: "20px",
          border: "1px solid #333",
          backgroundImage: "none",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "rgba(228, 140, 70, 0.05)" }}>
            <TableRow>
              <TableCell sx={{ color: "#E48C46", fontWeight: 700 }}>IMAGE</TableCell>
              <TableCell sx={{ color: "#E48C46", fontWeight: 700 }}>NAME</TableCell>
              <TableCell sx={{ color: "#E48C46", fontWeight: 700 }}>PRICE</TableCell>
              <TableCell align="right" sx={{ color: "#E48C46", fontWeight: 700 }}>
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                  <CircularProgress sx={{ color: "#E48C46" }} />
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.$id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.02)" } }}>
                  <TableCell>
                    <Avatar
                      src={item.image}
                      variant="rounded"
                      sx={{ width: 50, height: 50, border: "1px solid #333" }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 500 }}>{item.title}</TableCell>
                  <TableCell sx={{ color: "#828282" }}>₹{item.price}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton
                        onClick={() => handleEditClick(item)}
                        sx={{ color: "#E48C46", bgcolor: "rgba(228, 140, 70, 0.1)", "&:hover": { bgcolor: "rgba(228, 140, 70, 0.2)" } }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => dispatch(deleteDish(item.$id!))}
                        sx={{ color: "#ff4d4d", bgcolor: "rgba(255, 77, 77, 0.1)", "&:hover": { bgcolor: "rgba(255, 77, 77, 0.2)" } }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AdminPopup
        open={open}
        handleClose={() => setOpen(false)}
        title="Menu"
        editData={selectedItem}
      />
    </Box>
  );
};

export default MenuManagement;