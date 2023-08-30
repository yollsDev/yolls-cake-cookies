// import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/landing_page/HomePage";
import Guest from "./layouts/Guest";

const router = createBrowserRouter([
  {
    element: <Guest />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      // {
      //   path: "/login",
      //   element: <LoginPageView />,
      // },
      // {
      //   path: "/signup",
      //   element: <SignUpPageView />,
      // },
      // {
      //   path: "/tour",
      //   element: <TourCollectionsPageView />,
      // },
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
