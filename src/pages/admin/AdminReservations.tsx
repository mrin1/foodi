import React, { useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Chip, 
  CircularProgress , Stack
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useAppDispatch, useAppSelector } from "../../hooks/utils/redux";
import { fetchAllReservations, deleteReservation } from "../../hooks/redux-toolkit/slice/reservation.slice";
import { toast } from "sonner";

const AdminReservations: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.reservation);

  useEffect(() => {
    dispatch(fetchAllReservations());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      try {
        await dispatch(deleteReservation(id)).unwrap();
        toast.success("Reservation deleted");
      } catch (err: any) {
        toast.error(err);
      }
    }
  };

  const tableHeaderStyle = { color: "#828282", fontWeight: 'bold', borderBottom: '1px solid #333' };
  const cellStyle = { color: "white", borderBottom: '1px solid #222' };

  return (
    <Box sx={{ p: 4, bgcolor: "#0D0D0D", minHeight: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
          Table Bookings
        </Typography>
        <Chip 
          icon={<CalendarTodayIcon sx={{ fontSize: '16px !important', color: '#E48C46 !important' }} />} 
          label={`${items.length} Total Reservations`} 
          sx={{ bgcolor: '#1A1A1A', color: 'white', p: 1 }} 
        />
      </Stack>

      <TableContainer component={Paper} sx={{ bgcolor: "#1A1A1A", borderRadius: "16px", border: "1px solid #333" }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress sx={{ color: '#E48C46' }} />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderStyle}>Customer</TableCell>
                <TableCell sx={tableHeaderStyle}>Contact</TableCell>
                <TableCell sx={tableHeaderStyle}>Guests</TableCell>
                <TableCell sx={tableHeaderStyle}>Date & Time</TableCell>
                <TableCell sx={tableHeaderStyle}>Status</TableCell>
                <TableCell sx={tableHeaderStyle} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row: any) => (
                <TableRow key={row.$id} sx={{ '&:hover': { bgcolor: '#222' } }}>
                  <TableCell sx={cellStyle}>
                    <Typography variant="body2" fontWeight="bold">{row.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#828282' }}>{row.email}</Typography>
                  </TableCell>
                  <TableCell sx={cellStyle}>{row.phone}</TableCell>
                  <TableCell sx={cellStyle}>
                    <Chip label={`${row.people} Persons`} size="small" sx={{ bgcolor: '#333', color: 'white' }} />
                  </TableCell>
                  <TableCell sx={cellStyle}>
                    <Typography variant="body2">{row.date}</Typography>
                    <Typography variant="caption" sx={{ color: '#E48C46' }}>{row.time}</Typography>
                  </TableCell>
                  <TableCell sx={cellStyle}>
                    <Chip label="Confirmed" size="small" sx={{ bgcolor: '#1b5e20', color: '#81c784' }} />
                  </TableCell>
                  <TableCell sx={cellStyle} align="right">
                    <IconButton onClick={() => handleDelete(row.$id)} sx={{ color: '#d32f2f' }}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} sx={{ color: '#828282', textAlign: 'center', py: 5 }}>
                    No table reservations found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default AdminReservations;