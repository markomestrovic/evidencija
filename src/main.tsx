import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Records from "./Records.tsx";
import Students from "./Students.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Records />,
  },
  {
    path: "/students",
    element: <Students />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
