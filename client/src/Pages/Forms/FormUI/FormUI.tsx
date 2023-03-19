import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../../Providers/api.service";
import { useEffect, useState } from "react";
import Form from "../../../Models/Form";
import Alert from "../../../Component/Alert";
import { handleError } from "../../../Utils/ResponseHandler";
import Button from "../../../Component/Button";
import { logout } from "../../../Providers/auth.service";

const FormUI = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  let { date } = useParams();
  const [form, setForm] = useState<Form>();
  const [alert, setAlert] = useState({
    color: "primary",
    message: "Loading...",
    shown: true,
  });
  const navigate = useNavigate();

  const handleLogout = (event: any) => {
    event.preventDefault();
    logout();
    navigate("/accounts/login");
  };

  useEffect(() => {
    apiService
      .get(`/forms/${date}`)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
        handleError(error, setAlert);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Alert {...alert} />
      <article className="card vh-100 border-0">
        <div className="card-body p-0">
          <section className="row h-100">
            <aside className="col-3 bg-success">
              <div className="card bg-transparent h-100">
                <div className="card-header">
                  <h1>Enseignants à évaluer</h1>
                </div>
                <div className="card-body"></div>
                <footer className="card-footer">
                  <Button
                    onClick={handleLogout}
                    value="Se déconnecter"
                    color="outline-danger"
                  ></Button>
                </footer>
              </div>
            </aside>
          </section>
        </div>
      </article>
    </>
  );
};

export default FormUI;
