import { createBrowserRouter, Navigate } from "react-router-dom";
import MenuPage from "../pages/MenuPage";
import BlogPage from "../pages/BlogPage";
import Wrapper from "../components/layout/Wrapper";
import LandingPage from "../pages/landing/LandingPage";
import CartPage from "../pages/CartPage";
import AdminLayout from "../components/layout/AdminLayout";
import MenuManagement from "../pages/admin/MenuManagement";
import ChefManagement from "../pages/admin/ChefManagement";
import BlogManagement from "../pages/admin/BlogManagement";
import Dashboard from "../pages/admin/Dashboard";
import ChefPage from "../pages/ChefPage";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutPage";
import ReservationPage from "../pages/ReservationPage";
import SingleBlogPage from "../pages/SingleBlogPage";
import AdminProtected from "../components/common/AdminProtected";
import OrderManagement from "../pages/admin/OrderManagement";
import ContactManagement from "../pages/admin/ContactManagement";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "home",
        element: <LandingPage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "chef",
        element: <ChefPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "reservation",
        element: <ReservationPage />,
      },
      {
        path: "single-blog",
        element: <SingleBlogPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminProtected />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard", 
            element: <Dashboard />,
          },
          {
            path: "menu", 
            element: <MenuManagement />,
          },
          {
            path: "chefs", 
            element: <ChefManagement />,
          },
          {
            path: "blogs", 
            element: <BlogManagement />,
          },
           {
            path: "order", 
            element: <OrderManagement />,
          },
          {
            path: "contact", 
            element: <ContactManagement/>,
          },
        ],
      },
    ],
  },
]);
