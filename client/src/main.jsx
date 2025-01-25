import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";

//Context 
import { StocksProvider } from "./context/StocksContext";
import { ThemeProvider } from "./context/ThemeContext";
import LandingPage from "./components/general/LandingPage.jsx";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '',
        element: <LandingPage/>
      },
      {
        path: "/dashboard",
        element: <HomePage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StocksProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StocksProvider>
  </React.StrictMode>
);
