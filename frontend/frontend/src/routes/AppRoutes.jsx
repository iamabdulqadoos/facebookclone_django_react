import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";

import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import VerifyResetOTP from "../pages/VerifyResetOTP/VerifyResetOTP";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Profile from "../pages/Profile/Profile";
import People from "../pages/People/People";
import Friends from "../pages/Friends/Friends";
import Notification from "../pages/Notification/Notification";
import FriendRequests from "../pages/FriendRequests/FriendRequests";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route 
      path="/friend-requests"
      element={<FriendRequests />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
        path="/verify-reset-otp"
        element={<VerifyResetOTP />}
      />
      <Route
         path="/verify-otp"
         element={<VerifyOTP />}
      />
      <Route
      path="/people"
      element={<People />}
      />
      <Route
      path="/notifications"
       element={
        <ProtectedRoute>
            <Notification />
        </ProtectedRoute>
        }
      />
      <Route
      path="/reset-password"
      element={<ResetPassword />}
      />
      <Route 
      path="/friends" 
      element={<Friends />} 
      />
      <Route
      path="/profile"
      element={<Profile />}
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;