// import React from 'react';
// import { Dialog, DialogContent, Typography, Box, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './CheckoutForm';

// // Initialize Stripe outside to prevent re-renders
// const stripePromise = loadStripe("pk_test_your_actual_publishable_key");

// interface StripeModalProps {
//   open: boolean;
//   handleClose: () => void;
//   orderData: {
//     orderId: string;
//     userName: string;
//     items: any[];
//     total: number;
//   };
//   onSuccess: () => void;
// }

// const StripePaymentModal: React.FC<StripeModalProps> = ({ open, handleClose, orderData, onSuccess }) => {
//   return (
//     <Dialog 
//       open={open} 
//       onClose={handleClose} 
//       maxWidth="xs" 
//       fullWidth
//       sx={{ zIndex: 1500 }} 
//       PaperProps={{ 
//         sx: { bgcolor: "#11191f", borderRadius: 4, color: "white" } 
//       }}
//     >
//       <Box sx={{ p: 2, textAlign: "right" }}>
//         <IconButton onClick={handleClose} sx={{ color: "white" }}>
//           <CloseIcon />
//         </IconButton>
//       </Box>
//       <DialogContent sx={{ px: 4, pb: 6 }}>
//         <Typography variant="h5" fontWeight={800} mb={1}>Complete Payment</Typography>
//         <Typography variant="body2" color="#828282" mb={4}>
//           Order ID: #{orderData?.orderId?.slice(-6).toUpperCase()}
//         </Typography>
        
//         {/* The 'key' forces Stripe to re-mount if you switch orders */}
//         <Elements stripe={stripePromise} key={orderData?.orderId}>
//           <CheckoutForm orderData={orderData} onSuccess={onSuccess} />
//         </Elements>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default StripePaymentModal;