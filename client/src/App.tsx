import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import AdminLogin from "./Pages/Admin/Login/Login";
import AccountLogin from "./Pages/AccountLogin/AccountLogin";

const router = createBrowserRouter([
  { path: "accounts/login", element: <AccountLogin /> },
  { path: "admin/login", element: <AdminLogin /> },
  { path: "*", element: <Home /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
