import "./Register.css";
import Field from "../../../Component/Field";
import Button from "../../../Component/Button";
import Alert from "../../../Component/Alert";
import { Form, Link } from "react-router-dom";
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

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setAlert({ color: "info", message: "Loading...", shown: true });
        const res: any = await apiService.post("/admin/register", values);
        handleSuccess(setAlert, "Inscription réussie");
      } catch (err: any) {
        handleError(err, setAlert);
        setTimeout(() => {
          setSubmitting(false);
        }, 2000);
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
              <h1>Créez votre compte</h1>
              <Field
                value={formik.values.username}
                type="text"
                label="Pseudo"
                name="username"
                placeholder="Comme un e-mail mais en plus simple"
                handleChange={formik.handleChange}
              />
              <Field
                value={formik.values.email}
                type="text"
                label="E-mail"
                name="email"
                placeholder="Votre e-mail préféré"
                handleChange={formik.handleChange}
              />
              <Field
                value={formik.values.password}
                type="password"
                label="Mot de passe"
                name="password"
                placeholder="********"
                handleChange={formik.handleChange}
              />
              <div className="form-group">
                <Button
                  type="submit"
                  value="Vérifier"
                  color="success"
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <Link to={"/admin/login"} className="nav-link">
            Se connecter
          </Link>
        </div>
      </Form>
    </>
  );
};

export default Login;
