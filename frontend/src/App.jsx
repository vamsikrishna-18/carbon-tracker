import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import GoogleTranslate from "./components/common/GoogleTranslate";

// =====================================================
// PUBLIC
// =====================================================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import GoogleSuccess from "./pages/GoogleSuccess";

// =====================================================
// COMMON
// =====================================================

import Chatbot from "./components/Chatbot/Chatbot";

// =====================================================
// USER
// =====================================================

import UserDashboard from "./pages/UserDashboard";
import AddActivity from "./pages/AddActivity";
import ActivityHistory from "./pages/ActivityHistory";
import Analytics from "./pages/Analytics";
import GoalTracking from "./pages/GoalTracking";
import Recommendations from "./pages/Recommendations";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import UserRewards from "./pages/UserRewards";
import Settings from "./pages/Settings";

import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";

import Notifications from "./pages/Notifications";

// =====================================================
// ADMIN
// =====================================================

import AdminDashboard from "./pages/AdminDashboard";
import AdminActivityMonitor from "./pages/AdminActivityMonitor";
import AdminAnalytics from "./pages/AdminAnalytics";
import ManageUsers from "./pages/ManageUsers";
import Reports from "./pages/Reports";
import Announcements from "./pages/Announcements";
import AdminSettings from "./pages/AdminSettings";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminProfile from "./pages/AdminProfile";
// =====================================================
// ORGANIZATION
// =====================================================
import OrganizationDashboard from "./pages/OrganizationDashboard";
import OrganizationEmployees from "./pages/OrganizationEmployees";
import OrganizationActivities from "./pages/OrganizationActivities";
import OrganizationBadges from "./pages/OrganizationBadges";
import OrganizationEmissionFactors from "./pages/OrganizationEmissionFactors";
import OrganizationAnalytics from "./pages/OrganizationAnalytics";
import OrganizationLeaderboard from "./pages/OrganizationLeaderboard";


function App() {

  // =====================================================
  // GOOGLE TRANSLATE
  // HIDE GOOGLE TOP BANNER / BODY OFFSET
  // =====================================================

  useEffect(() => {

    const removeGoogleBar = () => {

      // Google Translate top banner
      const banner = document.querySelector(
        ".goog-te-banner-frame"
      );

      if (banner) {
        banner.style.display = "none";
      }

      // Google sometimes adds top offset to body
      document.body.style.top = "0px";

      // Remove iframe visual offset if present
      const iframe = document.querySelector(
        "iframe.goog-te-banner-frame"
      );

      if (iframe) {
        iframe.style.display = "none";
      }

    };

    // Run immediately
    removeGoogleBar();

    // Keep checking because Google can recreate the banner
    const interval = setInterval(
      removeGoogleBar,
      500
    );

    return () => {
      clearInterval(interval);
    };

  }, []);


  // =====================================================
  // APP
  // =====================================================

  return (

    <BrowserRouter>

      {/* ================================================= */}
      {/* GOOGLE TRANSLATE */}
      {/* ================================================= */}

      <GoogleTranslate />


      {/* ================================================= */}
      {/* TOAST NOTIFICATIONS */}
      {/* ================================================= */}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />


      {/* ================================================= */}
      {/* ROUTES */}
      {/* ================================================= */}

      <Routes>

        {/* ================================================= */}
        {/* PUBLIC ROUTES */}
        {/* ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
    
        <Route
          path="/google-success"
          element={<GoogleSuccess />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
  path="/admin-profile"
  element={<AdminProfile />}
/>

        {/* ================================================= */}
        {/* USER ROUTES */}
        {/* ================================================= */}

        <Route
          path="/dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/add-activity"
          element={<AddActivity />}
        />

        <Route
          path="/activity-history"
          element={<ActivityHistory />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/goals"
          element={<GoalTracking />}
        />

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/user-rewards"
          element={<UserRewards />}
        />


        {/* ================================================= */}
        {/* USER SUPPORT */}
        {/* ================================================= */}

        <Route
          path="/user/support/create"
          element={<CreateTicket />}
        />

        <Route
          path="/user/my-tickets"
          element={<MyTickets />}
        />


        {/* ================================================= */}
        {/* USER NOTIFICATIONS */}
        {/* ================================================= */}

        <Route
          path="/notifications"
          element={<Notifications />}
        />


        {/* ================================================= */}
        {/* ADMIN ROUTES */}
        {/* ================================================= */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin-analytics"
          element={<AdminAnalytics />}
        />

        <Route
          path="/manage-users"
          element={<ManageUsers />}
        />

        <Route
          path="/activity-monitor"
          element={<AdminActivityMonitor />}
        />

        <Route
          path="/admin/support"
          element={<AdminSupport />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/announcements"
          element={<Announcements />}
        />

        <Route
          path="/admin-settings"
          element={<AdminSettings />}
        />


        {/* ================================================= */}
        {/* ORGANIZATION ROUTES */}
        {/* ================================================= */}

        {/* Organization Dashboard */}

        <Route
          path="/organization/dashboard"
          element={<OrganizationDashboard />}
        />


        {/* Employees */}

        <Route
          path="/organization/employees"
          element={<OrganizationEmployees />}
        />


        {/* Activity Management */}

        <Route
          path="/organization/activities"
          element={<OrganizationActivities />}
        />


        {/* Employee Badges */}

        <Route
          path="/organization/badges"
          element={<OrganizationBadges />}
        />


        {/* Emission Factors */}

        <Route
          path="/organization/emission-factors"
          element={<OrganizationEmissionFactors />}
        />


        {/* Analytics & Reports */}

        <Route
          path="/organization/analytics"
          element={<OrganizationAnalytics />}
        />


        {/* Leaderboard */}

        <Route
          path="/organization/leaderboard"
          element={<OrganizationLeaderboard />}
        />

      </Routes>


      {/* ================================================= */}
      {/* CHATBOT */}
      {/* ================================================= */}

      <Chatbot />

    </BrowserRouter>
  );
}

export default App;