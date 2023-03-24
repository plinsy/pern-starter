import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import AccountLogin from "./Pages/AccountLogin/AccountLogin";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useEffect, useReducer } from "react";
import { authReducer } from "./Reducers/auth.reducer";
import AccountRegister from "./Pages/AccountRegister/AccountRegister";
import Account from "./Models/Account";
import Accounts from "./Pages/Accounts/Accounts";
import { getCurrentUser } from "./Providers/auth.service";

export interface DefaultProps {
  account?: Account;
  dispatch?: Function;
}

const App = () => {
  const [state, dispatch] = useReducer(authReducer, {});

  const router = createBrowserRouter([
    { path: "dashboard/*", element: <Dashboard account={state.account} /> },
    {
      path: "accounts",
      element: <Accounts dispatch={dispatch} account={state.account} />,
    },
    { path: "accounts/login", element: <AccountLogin dispatch={dispatch} /> },
    {
      path: "accounts/register",
      element: <AccountRegister dispatch={dispatch} />,
    },
    { path: "*", element: <Home /> },
  ]);

  useEffect(() => {
    getCurrentUser()
      .then((account: any) => {
        dispatch({ type: "LOGIN", payload: new Account(account) });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
