import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { HomeLayout } from "../components/home-layout";
import { AuthLayout } from "../components/auth-layout";
import ProtectedLayout from "../components/protected-layout";

import LoginPage from "../pages/login-page";
import HomePage from "../pages/home-page";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route element={<HomeLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="home" element={<HomePage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Route>
  )
);
