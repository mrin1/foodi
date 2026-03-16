import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { account, tablesDB, Query, ID } from "../../../lib/appwrite.config";
import { toast } from "sonner";
import type {
  AuthState,
  UserProfile,
} from "../../../typescript/interface/auth.interface";

const getInitialData = () => {
  const user = Cookies.get("userDetails");
  return {
    user: user ? JSON.parse(user) : null,
    role: Cookies.get("role") || null,
    token: Cookies.get("auth_token") || null,
  };
};

const initialState: AuthState & { token: string | null } = {
  loading: false,
  error: null,
  ...getInitialData(),
};

export const login = createAsyncThunk<
  UserProfile,
  any,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    try {
      await account.deleteSession("current");
    } catch {}

    await account.createEmailPasswordSession(data.email, data.password);

    const userList = await tablesDB.listRows(
      import.meta.env.VITE_APPWRITE_DATABASE as string,
      "signup",
      [Query.equal("email", data.email)],
    );

    if (userList?.rows?.length > 0) {
      toast.success("Login Successfully");
      return userList.rows[0] as unknown as UserProfile;
    }
    return rejectWithValue("User profile not found in database.");
  } catch (error: any) {
    toast.error(error.message || "Login failed");
    return rejectWithValue(error.message);
  }
});

export const register = createAsyncThunk<
  UserProfile,
  any,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    try {
      await account.deleteSession("current");
    } catch {}

    await account.create(ID.unique(), data.email, data.password, data.fullName);
    await account.createEmailPasswordSession(data.email, data.password);

    const profileData = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      phone: data.phone || "",
      role: "user",
      image: "",
    };

    const response = await tablesDB.createRow({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
      tableId: "signup",
      rowId: ID.unique(),
      data: profileData,
    });

    toast.success("Account created successfully!");
    return response as unknown as UserProfile;
  } catch (error: any) {
    toast.error(error.message || "Registration failed");
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      Cookies.remove("role");
      Cookies.remove("userDetails");
      Cookies.remove("auth_token");
      account.deleteSession("current");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action: any) => {
          state.loading = false;

          const data = action.payload;
          if (!data) return;

          const profile = data.profile || data;
          const token = data.token;

          if (profile && profile.role) {
            state.user = profile;
            state.role = profile.role;
            state.token = token || state.token;

            const expiry = 7;
            Cookies.set("role", profile.role, { expires: expiry });
            if (token) Cookies.set("auth_token", token, { expires: expiry });
            Cookies.set("userDetails", JSON.stringify(profile), {
              expires: expiry,
            });
          }
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
