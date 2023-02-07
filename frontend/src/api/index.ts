import axios from "axios";

const taskAPI = axios.create({
  baseURL: "http://localhost:8080/api/tasks/",
});
const authAPI = axios.create({
  baseURL: "http://localhost:8080/api/auth",
});

taskAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

// Auth Route
export const signIn = (data: object) => authAPI.post("/login", data);
export const signUp = (data: object) => authAPI.post("/register", data);

// Task Route
export const getTasks = () => taskAPI.get("/");
export const createTask = (data: Object) => taskAPI.post("/addTask", data);
export const getTaskById = (id: string) => taskAPI.get(`/task/${id}`);
export const updateTask = (data: Object | any) =>
  taskAPI.put(`/updateTask/${data._id}`, data);
export const deleteTask = (id: string) => taskAPI.delete(`/deleteTask/${id}`);
export const statusUpdate = (data: Object) =>
  taskAPI.put(`/updateStatus`, data);
