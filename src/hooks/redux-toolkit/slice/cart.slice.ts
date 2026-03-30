import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { databases, ID } from "../../../lib/appwrite.config";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const ORDERS_COLLECTION_ID = "order";

interface CartItem {
  id: string;
  title: string;
  price: number;
  qty: number;
  image: string;
  pdf?: string;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem("foodi_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  localStorage.setItem("foodi_cart", JSON.stringify(items));
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  loading: false,
  error: null,
};

export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async (
    orderData: {
      userId: string;
      userName: string;
      items: CartItem[] | any;
      total: number;
      pdf?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const rawItems =
        typeof orderData.items === "string"
          ? JSON.parse(orderData.items)
          : orderData.items;

      const leanItems = rawItems.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price),
        qty: Number(item.qty),
      }));

      const safeItemsString = JSON.stringify(leanItems);

      const response = await databases.createDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        ID.unique(),
        {
          userId: String(orderData.userId),
          name: String(orderData.userName),
          items: safeItemsString,
          totalAmount: Number(orderData.total),
          status: "pending",
          pdf: String(orderData.pdf || ""),
        },
      );
      return response;
    } catch (error: any) {
      console.error("APPWRITE DB ERROR:", error);
      return rejectWithValue(error.message || "Failed to place order");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }

      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; qty: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && action.payload.qty > 0) {
        item.qty = action.payload.qty;
      }

      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("foodi_cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
