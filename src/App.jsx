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
import { Auth, Guest, Admin, Member, Order } from "./layouts";
import {
  LoginPage,
  RegisterPage,
  MenuManagementPage,
  PaymentManagementPage,
  MemberDataPage,
  MenuDetailPage,
  MenuEditPage,
  MenuAddPage,
  MemberDetailPage,
} from "./pages/admin_page";
import {
  LoginMemberPage,
  SignUpMemberPage,
  MyPointsPage,
  OrderHistoryPage,
  ProfilePage,
} from "./pages/member_page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OrderDetailPage } from "./pages/member_page/OrderDetailPage";
import { ProfileEditPage } from "./pages/member_page/ProfileEditPage";
import { OrderPage } from "./pages/order_page";
import { ReceiptPage } from "./pages/order_page/ReceiptPage";
import { PointManagementPage } from "./pages/admin_page/PointManagementPage";
import { ReviewPage } from "./pages/order_page/ReviewPage";
import { RestoReviewPage } from "./pages/review_page";

const router = createBrowserRouter([
  {
    element: <Order />,
    children: [
      {
        path: "/",
        element: <OrderPage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/order",
        element: <OrderPage />,
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
      {
        path: "/reviews",
        element: <RestoReviewPage />,
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
      {
        path: "/auth/member/login",
        element: <LoginMemberPage />,
      },
      {
        path: "/auth/member/signup",
        element: <SignUpMemberPage />,
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
        path: "/admin/member-detail/:id",
        element: <MemberDetailPage />,
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
      {
        path: "/admin/point-management",
        element: <PointManagementPage />,
      },
    ],
  },
  {
    element: <Member />,
    children: [
      {
        path: "/member/my-points",
        element: <MyPointsPage />,
      },
      {
        path: "/member/order-history",
        element: <OrderHistoryPage />,
      },
      {
        path: "/member/profile",
        element: <ProfilePage />,
      },
      {
        path: "/member/profile-edit/:id",
        element: <ProfileEditPage />,
      },
      {
        path: "/member/order-detail/:id",
        element: <OrderDetailPage />,
      },
    ],
  },
  {
    element: <Order />,
    children: [
      {
        path: "/order/menu",
        element: <OrderPage />,
      },
      {
        path: "/order/invoice/:id",
        element: <ReceiptPage />,
      },
      {
        path: "/order/review/:id",
        element: <ReviewPage />,
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
