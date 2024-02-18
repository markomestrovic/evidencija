import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Students from "./Students.tsx";
import Records from "./Records.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Records />,
  },
  {
    path: "/records/:id",
    element: <Students />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
