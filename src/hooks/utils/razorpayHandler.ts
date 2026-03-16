import { toast } from "sonner";
import { generateReceipt } from "./generateReceipt";

interface RazorpayParams {
  orderData: any;
  user: any;
  dispatch: any;
  updateOrderStatus: any; 
  clearCart: any; 
  navigate: any;
}

export const openRazorpay = ({
  orderData,
  user,
  dispatch,
  updateOrderStatus,
  clearCart,
  navigate,
}: RazorpayParams) => {
  const Razorpay = (window as any).Razorpay;

  if (!Razorpay) {
    toast.error("Razorpay SDK not found. Please refresh.");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
    amount: orderData.total * 100, 
    currency: "INR",
    name: "FOODI",
    description: `Order Payment #${orderData.orderId.slice(-6).toUpperCase()}`,
    image: "/logo.png",
    handler: async function (response: any) {
      try {
        await dispatch(
          updateOrderStatus({
            documentId: orderData.orderId,
            status: "completed",
          }),
        ).unwrap();

        generateReceipt({
          orderId: orderData.orderId,
          userName: orderData.userName,
          items: orderData.items,
          total: orderData.total,
          paymentId: response.razorpay_payment_id,
        });

        toast.success("Payment Successful! Receipt Downloaded.");

        dispatch(clearCart());
        navigate("/");
      } catch (err: any) {
        toast.error("Payment verified, but database update failed.");
      }
    },
    prefill: {
      name: user?.name,
      email: user?.email || "customer@foodi.com",
    },
    theme: { color: "#E48C46" },
  };

  const rzp = new Razorpay(options);
  rzp.open();
};
