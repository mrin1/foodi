console.log("CRITICAL TEST: IS THIS FILE ALIVE?");
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databases, ID } from "../../../lib/appwrite.config";
import { toast } from "sonner";
import type {
  BlogItem,
  BlogState,
} from "../../../typescript/interface/blog.interface";

const initialState: BlogState = {
  items: [],
  loading: false,
  error: null,
};

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const COLLECTION_ID = "blog";

export const fetchBlogs = createAsyncThunk(
  "blog/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
      );
      console.log("blog Response", response);
      return response.documents as any;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const addBlog = createAsyncThunk(
  "blog/add",
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
          date: new Date().toLocaleDateString(),
        },
      );
      toast.success("Blog post published!");
      return response as unknown as BlogItem;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateBlog = createAsyncThunk(
  "blog/update",
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
        },
      );
      toast.success("Blog updated successfully!");
      return response as unknown as BlogItem;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (documentId: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);
      toast.success("Blog removed successfully");
      return documentId;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        console.log("action payload for blog", action.payload);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })

      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((item) =>
          item.$id === action.payload.$id ? action.payload : item,
        );
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.$id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
