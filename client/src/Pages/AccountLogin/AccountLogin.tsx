import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-router-dom";
import Field from "../../Component/Field";
import Button from "../../Component/Button";
import apiService from "../../Providers/api.service";
import storageService from "../../Providers/storage.service";
import { decodeToken } from "react-jwt";
import Alert from "../../Component/Alert";

const AccountLogin = () => {
  const [alert, setAlert] = useState({
    color: "info",
    message: "Loading...",
    shown: false,
  });

  const formik = useFormik({
    initialValues: {
      nie: "",
      accessKey: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setAlert({ color: "info", message: "Loading...", shown: true });
        const res: any = await apiService.post("/accounts/login", values);
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
      <section className="row">
        <aside className="col-11 col-xl-5 mx-auto">
          <article className="card shadow rounded-3 mt-5">
            <div className="card-body">
              <section className="row">
                <aside className="col-3">
                  <article className="card bg-success h-100">
                    <div className="logo">
                      <div className="logo-esmia"></div>
                    </div>
                  </article>
                </aside>
                <aside className="col-9">
                  <h2>Identifiez-vous!</h2>
                  <Form onSubmit={formik.handleSubmit}>
                    <Field
                      label="NIE"
                      name="nie"
                      value={formik.values.nie}
                      handleChange={formik.handleChange}
                    />
                    <Field
                      label="Clé d'accès"
                      type="password"
                      name="accessKey"
                      value={formik.values.accessKey}
                      handleChange={formik.handleChange}
                    />
                    <div className="form-group text-center">
                      <Button
                        type="submit"
                        disabled={formik.isSubmitting}
                        value="Commencer l'évaluation"
                        color="success"
                        className=""
                      />
                    </div>
                  </Form>
                </aside>
              </section>
            </div>
          </article>
        </aside>
      </section>
    </>
  );
};

export default AccountLogin;
