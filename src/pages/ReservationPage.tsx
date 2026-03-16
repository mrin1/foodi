import React from 'react';
import { Box } from '@mui/material';
import PageHeader from '../components/common/PageHeader';
import Reservation from '../components/sections/Reservation';

const ReservationPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#0D0D0D", minHeight: "100vh" }}>

      <PageHeader title="Reservation" breadcrumb="Reservation" />
      <Reservation />
    </Box>
  );
};

export default ReservationPage;