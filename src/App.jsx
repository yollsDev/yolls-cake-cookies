// import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Guest from "./layouts/Guest";
import {
  HomePage,
  AboutUsPage,
  MenuPage,
  CustomerServicePage,
  TestimonyPage,
  CareerPage,
} from "./pages/landing_page";
import { Auth, Guest, Admin } from "./layouts";
import {
  LoginPage,
  RegisterPage,
  MenuManagementPage,
  PaymentManagementPage,
  MemberDataPage,
  MenuDetailPage,
  MenuEditPage,
  MenuAddPage,
} from "./pages/admin_page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const router = createBrowserRouter([
  {
    element: <Guest />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/menu",
        element: <MenuPage />,
      },
      {
        path: "/customer-service",
        element: <CustomerServicePage />,
      },
      {
        path: "/testimony",
        element: <TestimonyPage />,
      },
      {
        path: "/career",
        element: <CareerPage />,
      },
    ],
  },
  {
    element: <Auth />,
    children: [
      {
        path: "/auth/admin/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/admin/signup",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <Admin />,
    children: [
      {
        path: "/admin/menu-management",
        element: <MenuManagementPage />,
      },
      {
        path: "/admin/payment-management",
        element: <PaymentManagementPage />,
      },
      {
        path: "/admin/member-data",
        element: <MemberDataPage />,
      },
      {
        path: "/admin/menu-detail/:id",
        element: <MenuDetailPage />,
      },
      {
        path: "/admin/menu-edit/:id",
        element: <MenuEditPage />,
      },
      {
        path: "/admin/menu-add",
        element: <MenuAddPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
