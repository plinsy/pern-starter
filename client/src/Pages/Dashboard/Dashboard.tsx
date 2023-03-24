import { useEffect, useState } from "react";
import { DefaultProps } from "../../App";
import Account from "../../Models/Account";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Providers/auth.service";

interface DashboardProps extends DefaultProps {}

const Dashboard = (props: DashboardProps) => {
  const [account, setAccount] = useState<Account>();
  const navigate = useNavigate();

  useEffect(() => {
    setAccount(props.account);

    return () => {};
  }, [props]);

  const handleLogout = () => {
    logout();
    if (props.dispatch) {
      props.dispatch({ type: "LOGOUT" });
    }
    navigate("/accounts/login");
  };

  return (
    <>
      <h1>Welcome to your dashboard {account?.username}</h1>

      <Link to={"/accounts"} className="nav-link">
        Mon compte
      </Link>

      <button type="button" onClick={handleLogout} className="btn btn-danger">
        Déconnexion
      </button>
    </>
  );
};

export default Dashboard;
