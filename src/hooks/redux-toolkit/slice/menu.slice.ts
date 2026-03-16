import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databases, ID } from "../../../lib/appwrite.config";
import { toast } from "sonner";
import {
  type MenuItem,
  type MenuState,
} from "../../../typescript/interface/menu.interface";

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
};

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const COLLECTION_ID = "menu";

export const fetchMenu = createAsyncThunk(
  "menu/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
      );
      return response.documents as unknown as MenuItem[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const addDish = createAsyncThunk(
  "menu/addDish",
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          title: formData.title,
          description: formData.description,
          image: formData.image,
          price: Number(formData.price),
          //rating: 4,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          availability: true,
        },
      );
      toast.success("Dish added to menu!");
      return response as unknown as MenuItem;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateDish = createAsyncThunk(
  "menu/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        {
          title: data.title,
          description: data.description,
          image: data.image,
          price: Number(data.price),
        },
      );
      toast.success("Dish updated successfully!");
      return response as unknown as MenuItem;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteDish = createAsyncThunk(
  "menu/delete",
  async (documentId: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);
      toast.success("Dish removed successfully");
      return documentId;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addDish.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDish.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addDish.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.$id !== action.payload);
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((item) =>
          item.$id === action.payload.$id ? action.payload : item,
        );
      });
  },
});

export default menuSlice.reducer;
