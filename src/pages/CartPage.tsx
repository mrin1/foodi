
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  IconButton,
  Button,
  TextField,
  Divider,
  Paper,
  Alert,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//import { generateReceipt } from "../hooks/utils/generateReceipt";
import { updateOrderStatus } from "../hooks/redux-toolkit/slice/order.slice";
import { useAppDispatch, useAppSelector } from "../hooks/utils/redux";
import {
  removeFromCart,
  updateQuantity,
  placeOrder,
} from "../hooks/redux-toolkit/slice/cart.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { openRazorpay } from "../hooks/utils/razorpayHandler";
//import StripePaymentModal from "../components/payment/StripePaymentModal";
import { clearCart } from "../hooks/redux-toolkit/slice/cart.slice";
const CartPage: React.FC = () => {
  //const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  //const [tempOrderData, setTempOrderData] = useState<any>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items, loading, error } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);
  const shipping = subtotal > 500 || items.length === 0 ? 0 : 50;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to place an order");
      return;
    }

    try {
      const resultAction = await dispatch(
        placeOrder({
          userId: user.$id,
          userName: user.name,
          items: items,
          total: total,
          pdf: "",
        }),
      ).unwrap();

      openRazorpay({
        orderData: {
          orderId: resultAction.$id,
          userName: user.name || "Customer",
          items: items,
          total: total,
        },
        user,
        dispatch,
        updateOrderStatus,
        clearCart,
        navigate,
      });

      // setTempOrderData({
      //   orderId: resultAction.$id,
      //   userName: user.name || "Customer",
      //   items: items,
      //   total: total,
      // });
      // setIsPaymentOpen(true);
      // toast.success("Order Placed & Receipt Generated!");
      // navigate("/");
    } catch (err) {
      console.error("Failed to place order:", err);
      toast.error("Failed to place order");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#0D0D0D",
        minHeight: "100vh",
        pt: 4,
        pb: 10,
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              {items.length > 0 ? (
                items.map((item) => (
                  <Paper
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      bgcolor: "#1A1A1A",
                      borderRadius: "16px",
                      border: "1px solid #333",
                    }}
                  >
                    <IconButton
                      onClick={() => dispatch(removeFromCart(item.id))}
                      sx={{ color: "#FF9F0D", mr: 1 }}
                      size="small"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                    <Box
                      component="img"
                      src={item.image}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "12px",
                        objectFit: "cover",
                        mx: 2,
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#828282" }}>
                        Fresh and delicious, ready to serve.
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ mt: 1 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "#222",
                            borderRadius: "4px",
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{ color: "white" }}
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  qty: Math.max(1, item.qty - 1),
                                }),
                              )
                            }
                          >
                            <RemoveIcon fontSize="inherit" />
                          </IconButton>
                          <Typography sx={{ mx: 2, fontSize: "0.9rem" }}>
                            {item.qty}
                          </Typography>
                          <IconButton
                            size="small"
                            sx={{ color: "white" }}
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  qty: item.qty + 1,
                                }),
                              )
                            }
                          >
                            <AddIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                      </Stack>
                    </Box>
                    <Typography sx={{ fontWeight: "bold", color: "#FF9F0D" }}>
                      Rs.{item.price * item.qty}
                    </Typography>
                  </Paper>
                ))
              ) : (
                <Box sx={{ textAlign: "center", py: 10 }}>
                  <ShoppingCartIcon
                    sx={{ fontSize: 80, color: "#333", mb: 2 }}
                  />
                  <Typography variant="h5" color="#828282">
                    Your cart is empty
                  </Typography>
                  <Button
                    onClick={() => navigate("/menu")}
                    sx={{ mt: 2, color: "#FF9F0D" }}
                  >
                    Go Back to Menu
                  </Button>
                </Box>
              )}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ p: 4, bgcolor: "transparent", color: "white" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                Order Summary
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="#828282">Item Count</Typography>
                  <Typography>{totalItems}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="#828282">Subtotal</Typography>
                  <Typography color="#FF9F0D">
                    Rs.{subtotal.toFixed(2)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="#828282">Shipping</Typography>
                  <Typography color="#FF9F0D">
                    Rs.{shipping.toFixed(2)}
                  </Typography>
                </Stack>
                <Divider
                  sx={{ my: 2, borderColor: "#333", borderStyle: "dashed" }}
                />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="#FF9F0D">
                    Rs.{total.toFixed(2)}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                  <TextField
                    placeholder="Coupon Code"
                    size="small"
                    fullWidth
                    sx={{
                      bgcolor: "#1A1A1A",
                      borderRadius: "8px",
                      "& input": { color: "white" },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "#E48C46", color: "white", px: 3 }}
                  >
                    Apply
                  </Button>
                </Stack>

                <Typography
                  variant="caption"
                  sx={{ color: "#828282", textAlign: "center", mt: 1 }}
                >
                  {shipping === 0
                    ? "You qualify for Free Delivery!"
                    : "Free Delivery above Rs.500"}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCheckout}
                  disabled={loading || items.length === 0}
                  sx={{
                    bgcolor: "#E48C46",
                    color: "white",
                    py: 1.5,
                    borderRadius: "12px",
                    mt: 2,
                    fontWeight: "bold",
                  }}
                >
                  {loading ? "PLACING ORDER..." : "PROCEED TO CHECKOUT"}
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        {/* {tempOrderData && (
          <StripePaymentModal
            open={isPaymentOpen}
            handleClose={() => setIsPaymentOpen(false)}
            orderData={tempOrderData}
            onSuccess={() => {
              generateReceipt({
                orderId: tempOrderData.orderId,
                userName: tempOrderData.userName,
                items: tempOrderData.items,
                total: tempOrderData.total,
                // paymentId: "stripe_success" // Optional: pass a mock or real ID here
              });

              setIsPaymentOpen(false);
              dispatch(clearCart());
              toast.success("Payment Received & Order Finalized!");
              navigate("/");
            }}
          />
        )} */}
      </Container>
    </Box>
  );
};

export default CartPage;
