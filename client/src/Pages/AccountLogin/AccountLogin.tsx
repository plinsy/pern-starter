import { useFormik } from "formik";
import { Form } from "react-router-dom";
import Field from "../../Component/Field";
import Button from "../../Component/Button";
import apiService from "../../Providers/api.service";
import storageService from "../../Providers/storage.service";
import { decodeToken, isExpired } from "react-jwt";

const AccountLogin = () => {
  const formik = useFormik({
    initialValues: {
      nie: "",
      accessKey: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res: any = await apiService.post("/auth/login", values);
        const { token } = res.data;
        storageService.set("token", token);
        apiService.reload();
        return decodeToken(token);
      } catch (err) {
        throw err;
      }
    },
  });

  return (
    <>
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
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          value="Commencer l'évaluation"
        />
      </Form>
    </>
  );
};

export default AccountLogin;
