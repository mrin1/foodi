import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Button, Stack, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, CircularProgress 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AdminPopup from '../../components/common/AdminPopup';

// Redux Imports
import { useAppDispatch, useAppSelector } from "../../hooks/utils/redux";
import { fetchChefs, deleteChef } from "../../hooks/redux-toolkit/slice/chef.slice";

const ChefManagement: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState<any>(null); // Track chef for editing
  
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.chef);

  useEffect(() => {
    dispatch(fetchChefs());
  }, [dispatch]);

  const handleAddNew = () => {
    setSelectedChef(null); 
    setOpen(true);
  };

  // 3. Handle Edit Click
  const handleEdit = (chef: any) => {
    setSelectedChef(chef); 
    setOpen(true);
  };

  return (
    <Box sx={{ color: 'white', p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Chef Management</Typography>
          <Typography variant="body2" sx={{ color: '#828282' }}>Manage your professional culinary team</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleAddNew}
          sx={{ bgcolor: '#E48C46', borderRadius: '12px', px: 4, py: 1.5, fontWeight: 'bold', '&:hover': { bgcolor: '#d17b38' } }}
        >
          Add New Chef
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ bgcolor: '#11191f', borderRadius: '20px', border: '1px solid #333', backgroundImage: 'none' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(228, 140, 70, 0.05)' }}>
            <TableRow>
              <TableCell sx={{ color: '#E48C46', fontWeight: 700 }}>CHEF PHOTO</TableCell>
              <TableCell sx={{ color: '#E48C46', fontWeight: 700 }}>NAME</TableCell>
              <TableCell sx={{ color: '#E48C46', fontWeight: 700 }}>DESIGNATION</TableCell>
              <TableCell align="right" sx={{ color: '#E48C46', fontWeight: 700 }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                  <CircularProgress sx={{ color: '#E48C46' }} />
                </TableCell>
              </TableRow>
            ) : (
              items.map((chef) => (
                <TableRow key={chef.$id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                  <TableCell>
                    <Avatar 
                      src={chef.image} 
                      variant="rounded" 
                      sx={{ width: 50, height: 50, borderRadius: '10px', border: '1px solid #333' }} 
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>{chef.name}</TableCell>
                  <TableCell sx={{ color: '#828282' }}>{chef.designation}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton 
                        onClick={() => handleEdit(chef)} 
                        sx={{ color: '#E48C46', bgcolor: 'rgba(228, 140, 70, 0.1)', '&:hover': { bgcolor: 'rgba(228, 140, 70, 0.2)' } }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        onClick={() => dispatch(deleteChef(chef.$id!))} 
                        sx={{ color: '#ff4d4d', bgcolor: 'rgba(255, 77, 77, 0.1)', '&:hover': { bgcolor: 'rgba(255, 77, 77, 0.2)' } }}
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
        title="Chef" 
        editData={selectedChef} 
      />
    </Box>
  );
};

export default ChefManagement;