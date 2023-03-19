import { useState } from "react";
import { useFormik } from "formik";
import { Form, useNavigate } from "react-router-dom";
import Field from "../../Component/Field";
import Button from "../../Component/Button";
import apiService from "../../Providers/api.service";
import storageService from "../../Providers/storage.service";
import { decodeToken } from "react-jwt";
import Alert from "../../Component/Alert";
import { handleError, handleSuccess } from "../../Utils/ResponseHandler";

const AccountLogin = () => {
  const [alert, setAlert] = useState({
    color: "info",
    message: "Loading...",
    shown: false,
  });

  const navigate = useNavigate();

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
        handleSuccess(setAlert, "Vérification réussie");
        navigate("/forms/now");
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
      <section className="row">
        <aside className="col-11 col-xl-5 mx-auto mt-5 pt-5">
          <article className="card shadow border-0 rounded-3 mt-5">
            <div className="card-body">
              <section className="row">
                <aside className="col-12 col-md-6">
                  <article className="card bg-success h-100">
                    <section className="text-white d-flex flex-column justify-content-between h-100 card-body py-5">
                      <div className="logo mt-3">
                        <div className="logo-esmia text-dark">
                          <div className="esmia">ESMIA</div>
                          <div className="start-title">
                            <strong>E_</strong>
                          </div>
                        </div>
                        <div className="end-title">
                          <strong>valuation</strong>
                        </div>
                      </div>
                      <h4 className="mb-4">
                        L'évaluation des professeurs simplifiée !
                      </h4>
                    </section>
                  </article>
                </aside>
                <aside className="col-12 col-md-6 py-5">
                  <article className="my-5 py-5">
                    <h2 className="mb-5">Identifiez-vous!</h2>
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
                  </article>
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
