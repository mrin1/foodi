import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { databases, ID, Query } from '../../../lib/appwrite.config';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const COLLECTION_ID = "reservation"; 

interface ReservationState {
  items: any[];
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  items: [],
  loading: false,
  success: false,
  error: null,
};

// 1. FOR USERS: Book a Table
export const bookTable = createAsyncThunk(
  'reservation/bookTable',
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        formData
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to book table');
    }
  }
);

// 2. FOR ADMINS: Fetch All Reservations
export const fetchAllReservations = createAsyncThunk(
  'reservation/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc('$createdAt')] // Latest bookings first
      );
      return response.documents;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch reservations');
    }
  }
);

// 3. FOR ADMINS: Delete/Cancel Reservation
export const deleteReservation = createAsyncThunk(
  'reservation/delete',
  async (documentId: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);
      return documentId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete');
    }
  }
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Book Table Logic
      .addCase(bookTable.pending, (state) => { state.loading = true; })
      .addCase(bookTable.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(bookTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch All Logic (Admin)
      .addCase(fetchAllReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Logic (Admin)
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.$id !== action.payload);
      });
  },
});

export const { resetStatus } = reservationSlice.actions;
export default reservationSlice.reducer;