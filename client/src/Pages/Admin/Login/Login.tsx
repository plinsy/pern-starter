import "./Login.css";
import Field from "../../../Component/Field";
import Button from "../../../Component/Button";
import Alert from "../../../Component/Alert";
import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import apiService from "../../../Providers/api.service";
import storageService from "../../../Providers/storage.service";
import { handleError, handleSuccess } from "../../../Utils/ResponseHandler";

const Login = () => {
  const [alert, setAlert] = useState({
    color: "info",
    message: "Loading...",
    shown: false,
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setAlert({ color: "info", message: "Loading...", shown: true });
        const res: any = await apiService.post("/admin/login", values);
        const { token } = res.data;
        storageService.set("token", token);
        apiService.reload();
        handleSuccess(setAlert, "Vous êtes maintenant connecté");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (err: any) {
        setSubmitting(false);
        handleError(err, setAlert);
        throw err;
      }
    },
  });

  return (
    <>
      <Alert {...alert} />
      <Form onSubmit={formik.handleSubmit}>
        <div className="container-fluid login-container d-flex flex-column">
          <div className="main">
            <div className="side-panel">
              <div className="logo">
                <div className="logo-esmia">
                  <div className="esmia">ESMIA</div>
                  <div className="start-title">E_</div>
                </div>
                <div className="end-title">value</div>
              </div>
              <div className="description">
                La gestion des évaluations enfin simplifié !
              </div>
            </div>
            <div className="main-panel">
              <h1>Identifiez-vous !</h1>
              <Field
                value={formik.values.login}
                type="text"
                label="E-mail ou pseudo"
                name="login"
                placeholder="Votre e-mail"
                handleChange={formik.handleChange}
              />
              <Field
                value={formik.values.password}
                type="password"
                label="Mot de passe"
                name="password"
                placeholder="Votre mot de passe"
                handleChange={formik.handleChange}
              />
              <div className="form-group">
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  value="Commencer"
                  color="success"
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <Link to={"/admin/register"} className="nav-link">
            Pas encore de compte?
          </Link>
        </div>
      </Form>
    </>
  );
};

export default Login;
