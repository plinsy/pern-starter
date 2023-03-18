import "./Login.css";
import Field from "./../../../Component/Field";
import Button from "./../../../Component/Button";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  return (
    <div className="container-fluid login-container">
      <div className="main">
        <div className="side-panel">
          <div className="logo">
            <div className="logo-esmia">
              <div className="esmia">ESMIA</div>
              <div className="start-title">E-</div>
            </div>
            <div className="end-title">valuation</div>
          </div>
          <div className="description">
            La gestion des évaluations enfin simplifié !
          </div>
        </div>
        <div className="main-panel">
          <h1>Identifiez-vous !</h1>
          <Field
            value={email}
            type="text"
            label="E-mail"
            name="email"
            placeholder="Votre e-mail"
            handleChange={handleChange}
          />
          <Field
            value={password}
            type="password"
            label="Mot de passe"
            name="password"
            placeholder="Votre mot de passe"
            handleChange={handleChange}
          />
          <div className="form-group">
            <Button value="Commencer" color="success" className="w-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
