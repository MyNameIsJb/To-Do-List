import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { Task } from "../../interfaces/Task";
import * as api from "../../api";

interface TaskState {
  tasks: Task[] | null;
  loading: boolean;
  singleTask: Task | null;
  errors: any;
  token: string | null;
}

const initialState: TaskState = {
  tasks: [],
  singleTask: null,
  loading: false,
  errors: null,
  token: null,
};

// Actions
export const getTasks = createAsyncThunk<Task[]>(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      const response = await api.getTasks();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createTask = createAsyncThunk<Task, Object>(
  "tasks/createTask",
  async (data, thunkAPI) => {
    try {
      const response = await api.createTask(data);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      thunkAPI.dispatch(getTasks());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTaskById = createAsyncThunk<Task, string>(
  "tasks/getTaskById",
  async (id, thunkAPI) => {
    try {
      const response = await api.getTaskById(id);
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

export const updateTask = createAsyncThunk<Task, Object | any>(
  "tasks/updateTask",
  async (data, thunkAPI) => {
    try {
      const response = await api.updateTask(data);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      thunkAPI.dispatch(getTasks());
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

export const deleteTask = createAsyncThunk<string, string>(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      const response = await api.deleteTask(id);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      thunkAPI.dispatch(getTasks());
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

export const statusUpdate = createAsyncThunk<Task, Object>(
  "tasks/statusUpdate",
  async (data, thunkAPI) => {
    try {
      const response = await api.statusUpdate(data);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      thunkAPI.dispatch(getTasks());
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
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(getTaskById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTaskById.fulfilled, (state, action) => {
      state.singleTask = action.payload;
      state.loading = false;
    });
    builder.addCase(getTaskById.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.singleTask = action.payload;
      state.loading = false;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export default taskSlice.reducer;
export const { setTasks } = taskSlice.actions;
