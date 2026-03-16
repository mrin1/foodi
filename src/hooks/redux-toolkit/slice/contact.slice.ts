import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { databases, Query, ID } from '../../../lib/appwrite.config';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const CONTACT_COLLECTION_ID = "contact"; 

interface ContactState {
  messages: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  messages: [],
  loading: false,
  error: null,
};

export const fetchAllMessages = createAsyncThunk(
  'contact/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CONTACT_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      return response.documents;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch messages');
    }
  }
);

export const submitContactForm = createAsyncThunk(
  'contact/submit',
  async (formData: { name: string; email: string; subjects: string; message: string }, { rejectWithValue }) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        CONTACT_COLLECTION_ID,
        ID.unique(),
        {
          name: formData.name,
          email: formData.email,
          subjects: formData.subjects,
          message: formData.message,
          status: 'unread',
          date: new Date().toLocaleDateString(),
        }
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to send message');
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'contact/delete',
  async (documentId: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(DATABASE_ID, CONTACT_COLLECTION_ID, documentId);
      return documentId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete message');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = state.messages.filter((msg) => msg.$id !== action.payload);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default contactSlice.reducer;