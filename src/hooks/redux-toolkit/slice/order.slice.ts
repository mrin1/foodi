import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { databases, Query } from '../../../lib/appwrite.config'; 

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE
const ORDERS_COLLECTION_ID = "order";

interface OrderState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        [Query.orderDesc('$createdAt')] 
      );
      return response.documents;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ documentId, status }: { documentId: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        documentId,
        { status: status }
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update status');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
    
        const index = state.items.findIndex((item) => item.$id === action.payload.$id);
        if (index !== -1) {
          state.items[index].status = action.payload.status;
        }
      });
  },
});

export default orderSlice.reducer;