import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import App from "./App";
import LandingPage from "./LandingPage"
import ProtectedLayout from "../components/ProtectedLayout";
import Test from "./test";
import ManagerDashboard from "./manager/ManagerDashboard";
import TraineesPage from "./TraineesPage";
import MeetingsPage from "./MeetingsPage";
import Meeting from "../components/Meeting";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<App />} />
          <Route path="/test" element={<Test />} />
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/trainees" element={<TraineesPage />} />
          <Route path="/manager/meetings" element={<MeetingsPage />} />
          <Route path="/manager/meetings" element={<Meeting />} />

          {/* أي صفحة محمية ثانية حطها هنا */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


