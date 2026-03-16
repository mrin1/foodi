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

// FIX: Helper function to load cart from LocalStorage on app start
const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem("foodi_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    return [];
  }
};

// FIX: Helper function to save cart to LocalStorage
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
      items: CartItem[];
      total: number;
      pdf: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        ID.unique(),
        {
          userId: orderData.userId, // MUST match Attribute Key in Appwrite
          name: orderData.userName, // MUST match Attribute Key in Appwrite
          items: JSON.stringify(orderData.items),
          totalAmount: orderData.total, // Check if you named it 'total' or 'totalAmount' in Appwrite
          status: "pending",
          pdf: orderData.pdf,
        },
      );
      return response;
    } catch (error: any) {
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
        state.items = [];
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
