import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  allUser: [],
  status: "idle",
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });

      toast.success("Login successful!");
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async (
    { name, email, password, photo, dob, gender },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/user/register", {
        name,
        email,
        password,
        gender,
        dob,
        photo,
      });
      toast.success("Registration successful!");
      // Store token in localStorage immediately on success
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for loading user data
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/me");
      if (response.data.success === false) {
        console.error(response.data.message || "Failed to load user");
      }
      return response.data;
    } catch (error) {
      localStorage.removeItem("token"); // Clear token on auth failure
      console.error(
        error.response?.data?.message || "Failed to load user data"
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to load user data"
      );
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/all");
      return response.data.users;
    } catch (error) {
      localStorage.removeItem("token"); // Clear token on auth failure
      console.error(
        error.response?.data?.message || "Failed to load users data"
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to load users data"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/user/${userId}`);
      toast.success("User deleted successfully!");
      return response.data;   
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("refreshToken");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      // Show success toast for logout
      toast.success("Logged out successfully");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      })

      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.error = null;
        state.user = action.payload.user;
        // Set token in localStorage
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Load user cases
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = localStorage.getItem("token");
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      })
      // Get all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.status = "idle";
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "idle";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== action.payload._id
        );
      })
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
