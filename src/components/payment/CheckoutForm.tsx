// import React, { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { Box, Button, CircularProgress } from "@mui/material";
// import { generateReceipt } from "../../hooks/utils/generateReceipt";
// import { toast } from "sonner";
// import { useAppDispatch } from "../../hooks/utils/redux";
// import { updateOrderStatus } from "../../hooks/redux-toolkit/slice/order.slice";

// const CheckoutForm = ({ orderData, onSuccess }: any) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const dispatch = useAppDispatch();
//   const [isPaying, setIsPaying] = useState(false);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setIsPaying(true);

//     // 1. Simulate Stripe verification
//     setTimeout(async () => {
//       const mockTxnId = "txn_" + Math.random().toString(36).substring(7);

//       try {
//         // 2. RECTIFICATION: Update Appwrite using your Order Slice
//         // We change status from 'pending' to 'completed'
//         await dispatch(
//           updateOrderStatus({
//             documentId: orderData.orderId,
//             status: "completed",
//           })
//         ).unwrap();

//         // 3. Trigger PDF Generation
//         generateReceipt({
//           orderId: orderData.orderId,
//           userName: orderData.userName,
//           items: orderData.items,
//           total: orderData.total,
//           paymentId: mockTxnId,
//         });

//         toast.success("Order Paid Successfully!");
//         setIsPaying(false);
//         onSuccess(); // Triggers cart clearing and navigation in CartPage
        
//       } catch (err: any) {
//         setIsPaying(false);
//         toast.error("Payment verified but database update failed: " + err);
//       }
//     }, 2500);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Box sx={{ 
//         p: 2, 
//         bgcolor: "white", 
//         borderRadius: 2, 
//         mb: 4, 
//         border: "1px solid #333" 
//       }}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#11191f",
//                 "::placeholder": { color: "#aab7c4" },
//               },
//               invalid: { color: "#9e2146" },
//             },
//           }}
//         />
//       </Box>
//       <Button
//         fullWidth
//         type="submit"
//         variant="contained"
//         disabled={!stripe || isPaying}
//         sx={{
//           bgcolor: "#E48C46",
//           py: 1.5,
//           fontWeight: "bold",
//           "&:hover": { bgcolor: "#d17b38" },
//           "&.Mui-disabled": { bgcolor: "#444" }
//         }}
//       >
//         {isPaying ? (
//           <CircularProgress size={24} color="inherit" />
//         ) : (
//           `Authorize Rs. ${orderData?.total?.toFixed(2)}`
//         )}
//       </Button>
//     </form>
//   );
// };

// export default CheckoutForm;