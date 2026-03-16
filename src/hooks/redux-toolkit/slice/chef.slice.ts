import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databases, ID } from "../../../lib/appwrite.config";
import { toast } from "sonner";
import type { ChefItem, ChefState } from "../../../typescript/interface/chef.interface";




const initialState: ChefState = {
  items: [],
  loading: false,
  error: null,
};

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const COLLECTION_ID = "chef"; 

export const fetchChefs = createAsyncThunk(
  "chef/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
      );
      return response.documents as unknown as ChefItem[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addChef = createAsyncThunk(
  "chef/addChef",
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          name: formData.title, 
          designation: formData.price, 
          image: formData.image,
        }
      );
      toast.success("Chef added successfully!");
      return response as unknown as ChefItem;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateChef = createAsyncThunk(
  "chef/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        {
          name: data.title,
          designation: data.price,
          image: data.image,
        }
      );
      toast.success("Chef updated successfully!");
      return response as unknown as ChefItem;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteChef = createAsyncThunk(
  "chef/delete",
  async (documentId: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);
      toast.success("Chef removed successfully");
      return documentId;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const chefSlice = createSlice({
  name: "chef",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchChefs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChefs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchChefs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    
      .addCase(addChef.pending, (state) => {
        state.loading = true;
      })
      .addCase(addChef.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addChef.rejected, (state) => {
        state.loading = false;
      })
  
      .addCase(updateChef.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateChef.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((item) =>
          item.$id === action.payload.$id ? action.payload : item
        );
      })
      .addCase(updateChef.rejected, (state) => {
        state.loading = false;
      })
  
      .addCase(deleteChef.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.$id !== action.payload);
      });
  },
});

export default chefSlice.reducer;