import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { Auth } from "../../interfaces/Auth";
import * as api from "../../api";

interface AuthState {
  auth: Auth | null;
  loading: boolean;
  errors: any;
  hasToken: boolean;
}

const initialState: AuthState = {
  auth: null,
  loading: false,
  errors: null,
  hasToken: false,
};

// Actions
export const signIn = createAsyncThunk<Auth, object>(
  "auth/signIn",
  async (data, thunkAPI) => {
    try {
      const response = await api.signIn(data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.result.name);
      thunkAPI.dispatch(setToken());
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      return response.data;
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        timer: 2000,
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signUp = createAsyncThunk<Object, Object>(
  "auth/signUp",
  async (data, thunkAPI) => {
    try {
      const response = await api.signUp(data);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      return response.data;
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        timer: 2000,
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Reducers
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state) => {
      state.hasToken = !state.hasToken;
    },
    signOut: (state) => {
      Swal.fire({
        title: "Success!",
        text: "Logout Successfully",
        icon: "success",
        timer: 2000,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      state.loading = false;
      state.auth = null;
      state.errors = null;
      state.hasToken = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.auth = action.payload;
      state.loading = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { signOut, setToken } = authSlice.actions;
