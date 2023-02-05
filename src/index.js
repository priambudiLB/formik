import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import NavBar from './Navbar';
import Profile from './Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <NavBar />
      <Outlet />
    </>,
    errorElement: <p>Page Not Found</p>,
    children: [
      {
        path: "/",
        element: <p>Movie List</p>,
      },
      {
        path: "/profile",
        // element: localStorage.getItem("SID") ? <Profile /> : <Navigate replace to="/login" />,
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
