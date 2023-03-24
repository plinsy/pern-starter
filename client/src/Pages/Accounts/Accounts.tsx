import "./Accounts.css";
import Field from "../../Component/Field";
import Button from "../../Component/Button";
import Alert from "../../Component/Alert";
import { Form, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import apiService from "../../Providers/api.service";
import { handleError, handleSuccess } from "../../Utils/ResponseHandler";
import { DefaultProps } from "../../App";
import Account from "../../Models/Account";
import storageService from "../../Providers/storage.service";

const Accounts = (props: DefaultProps) => {
  const [account, setAccount] = useState<Account>();
  const formik = useFormik({
    initialValues: {
      username: account?.username,
      email: account?.email,
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setAlert({ color: "info", message: "Loading...", shown: true });
        const res: any = await apiService.put("/accounts", values);
        const { token, account } = res.data;
        storageService.set("token", token);
        apiService.reload();
        if (props.dispatch) {
          props.dispatch({ type: "LOGIN", payload: new Account(account) });
        }
        handleSuccess(setAlert, "Votre compte a bien été mis à jour");
        setSubmitting(false);
      } catch (err: any) {
        handleError(err, setAlert);
      }
    },
  });

  useEffect(() => {
    setAccount(props.account);

    return () => {};
  }, [props]);

  useEffect(() => {
    if (account) {
      formik.setValues({
        ...formik.values,
        username: account.username,
        email: account.email,
      });
    }
    return () => {};
  }, [account]);

  const [alert, setAlert] = useState({
    color: "info",
    message: "Loading...",
    shown: false,
  });

  return (
    <>
      <Alert {...alert} />
      <Form onSubmit={formik.handleSubmit}>
        <section className="row">
          <aside className="col-11 col-xl-5 mx-auto mt-5 pt-5">
            <article className="card shadow border-0 rounded-3 mt-5">
              <div className="card-body">
                <h2 className="">{account?.username}</h2>
                <section className="row">
                  <aside className="col-12 col-md-6 py-5 mx-auto">
                    <article className="my-5 py-5">
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
                        disabled={true}
                      />
                      <Field
                        value={formik.values.currentPassword}
                        type="password"
                        label={`Mot de passe actuel`}
                        name="currentPassword"
                        placeholder="********"
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
                          value="Valider"
                          color="success"
                          disabled={formik.isSubmitting}
                          className="w-100"
                        />
                      </div>
                    </article>
                  </aside>
                </section>
              </div>
            </article>
          </aside>
        </section>
      </Form>
    </>
  );
};

export default Accounts;
