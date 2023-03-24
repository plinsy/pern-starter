import { useState } from "react";
import { useFormik } from "formik";
import { Form, Link, useNavigate } from "react-router-dom";
import Field from "../../Component/Field";
import Button from "../../Component/Button";
import apiService from "../../Providers/api.service";
import storageService from "../../Providers/storage.service";
import { decodeToken } from "react-jwt";
import Alert from "../../Component/Alert";
import { handleError, handleSuccess } from "../../Utils/ResponseHandler";
import { DefaultProps } from "../../App";

const AccountLogin = (props: DefaultProps) => {
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
        const res: any = await apiService.post("/accounts/login", values);
        const { token, account } = res.data;
        storageService.set("token", token);
        apiService.reload();
        if (props.dispatch) {
          props.dispatch({ type: "LOGIN", payload: account });
        }
        handleSuccess(setAlert, "Vérification réussie");
        navigate("/dashboard");
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
        <section className="row">
          <aside className="col-11 col-xl-5 mx-auto mt-5 pt-5">
            <article className="card shadow border-0 rounded-3 mt-5">
              <div className="card-body">
                <section className="row">
                  <aside className="col-12 col-md-6 py-5 mx-auto">
                    <article className="my-5 py-5">
                      <h2 className="text-center mb-5">Connexion</h2>
                      <Field
                        label="Email ou pseudo"
                        name="login"
                        value={formik.values.login}
                        handleChange={formik.handleChange}
                      />
                      <Field
                        label="Mot de passe"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        handleChange={formik.handleChange}
                      />
                      <div className="form-group text-center">
                        <Button
                          type="submit"
                          disabled={formik.isSubmitting}
                          value="Se connecter"
                          color="success"
                          className="w-100"
                        />
                      </div>
                    </article>
                  </aside>
                </section>
                <Link to="/accounts/register" className="nav-link">
                  S'inscrire
                </Link>
              </div>
            </article>
          </aside>
        </section>
      </Form>
    </>
  );
};

export default AccountLogin;
