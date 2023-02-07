import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TasksPage from "./features/tasks/TasksPage";
import { useAppDispatch } from "./store/store";
import NavBar from "./components/NavBar";
import CreateTaskPage from "./features/tasks/CreateTaskPage";
import EditTaskPage from "./features/tasks/EditTaskPage";
import LoginPage from "./features/auth/LoginPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { setToken } from "./features/auth/authSlice";
import RegistrationPage from "./features/auth/RegistrationPage";

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(setToken());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TasksPage />} />
          <Route path="/createTask" element={<CreateTaskPage />} />
          <Route path="/editTask/:id" element={<EditTaskPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
