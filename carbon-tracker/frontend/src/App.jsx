import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminActivityMonitor from "./pages/AdminActivityMonitor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ManageUsers from "./pages/ManageUsers";
import Reports from "./pages/Reports";
import Rewards from "./pages/Rewards";
import EcoTips from "./pages/EcoTips";
import Announcements from "./pages/Announcements";
import AdminSettings from "./pages/AdminSettings";
import UserRewards from "./pages/UserRewards";

import AdminLogin from "./pages/AdminLogin";
import AddActivity from "./pages/AddActivity";
import ActivityHistory from "./pages/ActivityHistory";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import AdminAnalytics from "./pages/AdminAnalytics";
import Recommendations from "./pages/Recommendations";
import GoalTracking from "./pages/GoalTracking";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: { fontSize: "14px" },
          success: {
            style: {
              background: "#f0fdf4",
              color: "#15803d",
              border: "1px solid #bbf7d0",
            },
          },
          error: {
            style: {
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
  path="/activity-monitor"
  element={
    <ProtectedRoute>
      <AdminActivityMonitor />
    </ProtectedRoute>
  }
/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin-analytics"
  element={
    <ProtectedRoute>
      <AdminAnalytics />
    </ProtectedRoute>
  }
/>
<Route
    path="/goals"
    element={
        <ProtectedRoute role="USER">
            <GoalTracking />
        </ProtectedRoute>
    }
/>
<Route
    path="/recommendations"
    element={
        <ProtectedRoute role="USER">
            <Recommendations />
        </ProtectedRoute>
    }
/>
        <Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>
<Route 
 path="/leaderboard" 
 element={
    <ProtectedRoute>
        <Leaderboard/>
    </ProtectedRoute>
 }
/>
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
        <Route
  path="/activity-history"
  element={
    <ProtectedRoute>
      <ActivityHistory />
    </ProtectedRoute>
  }
/>
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/manage-users"
  element={
    <ProtectedRoute>
      <ManageUsers />
    </ProtectedRoute>
  }
/>
<Route
  path="/add-activity"
  element={
    <ProtectedRoute>
      <AddActivity />
    </ProtectedRoute>
  }
/>
<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>
<Route
  path="/user-rewards"
  element={
    <ProtectedRoute>
      <UserRewards />
    </ProtectedRoute>
  }
/>


<Route
  path="/rewards"
  element={
    <ProtectedRoute>
      <Rewards />
    </ProtectedRoute>
  }
/>

<Route
  path="/eco-tips"
  element={
    <ProtectedRoute>
      <EcoTips />
    </ProtectedRoute>
  }
/>

<Route
  path="/announcements"
  element={
    <ProtectedRoute>
      <Announcements />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin-settings"
  element={
    <ProtectedRoute>
      <AdminSettings />
    </ProtectedRoute>
  }
/>

        {/* FIXED: moved inside Routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;