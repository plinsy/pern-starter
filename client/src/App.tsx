import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import AdminLogin from "./Pages/Admin/Login/Login";
import AdminRegister from "./Pages/Admin/Register/Register";
import AccountLogin from "./Pages/AccountLogin/AccountLogin";
import Dashboard from "./Pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  { path: "dashboard/*", element: <Dashboard /> },
  { path: "accounts/login", element: <AccountLogin /> },
  { path: "admin/register", element: <AdminRegister /> },
  { path: "admin/login", element: <AdminLogin /> },
  { path: "*", element: <Home /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
