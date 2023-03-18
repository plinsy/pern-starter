import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Pages/Home';
import AdminLogin from './Pages/Admin/Login/Login';

const router = createBrowserRouter([
    { path:"admin/login", element: <AdminLogin />},
    { path: "*", element: <Home /> }
]);
  
const App = () => {
    return <RouterProvider router={router} />;
}

export default App;
