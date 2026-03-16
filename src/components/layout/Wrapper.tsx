import { Outlet } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { Box } from '@mui/material';
import Footer from './Footer';

const Wrapper = () => {
  return (
    <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh' }}>
      <Navbar />
      <Outlet />
      <Footer/>
    </Box>
  );
};

export default Wrapper;