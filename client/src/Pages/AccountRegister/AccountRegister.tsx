import "./AccountRegister.css";
import Field from "../../Component/Field";
import Button from "../../Component/Button";
import Alert from "../../Component/Alert";
import { Form, Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import apiService from "../../Providers/api.service";
import { handleError, handleSuccess } from "../../Utils/ResponseHandler";
import { DefaultProps } from "../../App";

const AccountRegister = (props: DefaultProps) => {
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
      passwordConfirmation: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        setAlert({ color: "info", message: "Loading...", shown: true });
        const res: any = await apiService.post("/accounts/register", values);
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
        <section className="row">
          <aside className="col-11 col-xl-5 mx-auto mt-5 pt-5">
            <article className="card shadow border-0 rounded-3 mt-5">
              <div className="card-body">
                <section className="row">
                  <aside className="col-12 col-md-6 py-5 mx-auto">
                    <article className="my-5 py-5">
                      <h2 className="text-center">Créez votre compte</h2>
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
                      <Field
                        value={formik.values.passwordConfirmation}
                        type="password"
                        label="Confirmation mot de passe"
                        name="passwordConfirmation"
                        placeholder="********"
                        handleChange={formik.handleChange}
                      />
                      <div className="form-group">
                        <Button
                          type="submit"
                          value="S'inscrire"
                          color="success"
                          className="w-100"
                        />
                      </div>
                    </article>
                  </aside>
                </section>
                <Link to={"/accounts/login"} className="nav-link">
                  Se connecter
                </Link>
              </div>
            </article>
          </aside>
        </section>
      </Form>
    </>
  );
};

export default AccountRegister;
