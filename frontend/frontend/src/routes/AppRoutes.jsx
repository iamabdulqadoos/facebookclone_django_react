import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import VerifyResetOTP from "../pages/VerifyResetOTP/VerifyResetOTP";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

import Home from "../pages/Home/Home";
import Friends from "../pages/Friends/Friends";
import FriendRequests from "../pages/FriendRequests/FriendRequests";
import People from "../pages/People/People";
import Profile from "../pages/Profile/Profile";
import Notification from "../pages/Notification/Notification";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import MainLayout from "../components/Layout/MainLayout";
import Settings from "../pages/Settings/Settings";
import PostDetail from "../pages/PostDetail/PostDetail";

function AppRoutes() {

    return (

        <Routes>

            {/* Public Routes */}

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
                path="/verify-otp"
                element={<VerifyOTP />}
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
                path="/reset-password"
                element={<ResetPassword />}
            />

            {/* Protected Layout */}

            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/friends"
                    element={<Friends />}
                />

                <Route
                    path="/friend-requests"
                    element={<FriendRequests />}
                />

                <Route
                    path="/people"
                    element={<People />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/notifications"
                    element={<Notification />}
                />
                <Route path="/settings" 
                element={<Settings />} 
                />
                <Route
                path="/post/:id"
                element={<PostDetail />}
                />

            </Route>

        </Routes>

    );

}

export default AppRoutes;