import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import App from "./App";
import LandingPage from "./LandingPage";
import ProtectedLayout from "../components/ProtectedLayout";
import ManagerProtectedLayout from "../components/ManagerProtectedLayout";
import ManagerDashboard from "./manager/ManagerDashboard";
import TraineesPage from "./TraineesPage";
import MeetingsPage from "./MeetingsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<App />} />
        </Route>

        <Route element={<ManagerProtectedLayout />}>
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/trainees" element={<TraineesPage />} />
          <Route path="/manager/meetings" element={<MeetingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
