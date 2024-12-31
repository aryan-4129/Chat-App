import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import HomePage from "./pages/HomePage";

import authStore from "./store/authStore";
import { themeStore } from "./store/themeStore";

function App() {
  const { authUser, checkAuth, ischeckingAuth, onlineUsers } = authStore();
  const { theme } = themeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });
  console.log(onlineUsers);

  if (ischeckingAuth && !authUser) {
    return <Loader />;
  }
  return (
    <div style={{ backgroundColor: theme }}>
      <Toaster />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/setting" element={<SettingPage />} />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUpPage />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
