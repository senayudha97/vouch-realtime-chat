import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/chat",
    element: <Chat />
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
