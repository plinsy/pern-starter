import "./Login.css";
import Field from "../../../Component/Field";
import Button from "../../../Component/Button";
import Alert from "../../../Component/Alert";
import { Form } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import apiService from "../../../Providers/api.service";
import storageService from "../../../Providers/storage.service";
import { decodeToken } from "react-jwt";

const Login = () => {
  const [alert, setAlert] = useState({
    color: "info",
    message: "Loading...",
    shown: false,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setAlert({ color: "info", message: "Loading...", shown: true });
        const res: any = await apiService.post("/admin/login", values);
        const { token } = res.data;
        storageService.set("token", token);
        apiService.reload();
        return decodeToken(token);
      } catch (err: any) {
        setSubmitting(false);
        setAlert({ color: "danger", message: err.message, shown: true });
        throw err;
      }
    },
  });

  return (
    <>
      <Alert {...alert} />
      <Form onSubmit={formik.handleSubmit}>
        <div className="container-fluid login-container">
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
                value={formik.values.email}
                type="text"
                label="E-mail"
                name="email"
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
                  value="Commencer"
                  color="success"
                  className="w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Login;
