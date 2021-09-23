import { useContext, useState } from "react";
import { Redirect } from "react-router";
import {
  Box,
  FormErrorMessage,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { authenticate } from "../../services/requestFunctions";

import GeometricElements from "../GeometricElements";
import logo from "../../assets/starLogo.svg";

import "./styles.scss";

const Login = () => {
  const [loginErrors, setLoginErrors] = useState("");
  const auth = useContext(AuthContext);
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = (values) => {
    authenticate(values)
      .then((response) => {
        if (response.data) {
          auth.setApiToken(response.data.access_token);
          auth.setSession(response.data.access_token);
          history.push("/");
        }
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 403") {
          setLoginErrors("Acesso negado: email ou senha inválidos!");
        } else {
          setLoginErrors(err.message);
        }
      });
  };

  return (
    <>
      {auth.isAuthenticated && <Redirect to="/" />}
      {!auth.isAuthenticated && (
        <div>
          <div className="login-container">
            <div className="informative-wrapper">
              <GeometricElements />
              <div className="informative">
                <div className="informative-texts">
                  <h2>#trending.strateegia</h2>
                  <p>
                    debata assuntos do momento com privacidade e de forma
                    estruturada
                  </p>
                </div>
              </div>
            </div>
            <div className="login-wrapper">
              <h1>login</h1>
              <p>Insira seus dados de login do Strateegia</p>
              <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
                <FormControl isInvalid={errors.email} mt={6}>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email"
                    {...register("email", {
                      required: "campo obrigatório *",
                    })}
                  />
                  <FormErrorMessage color="#dc0362">
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <Input
                    id="password"
                    type="password"
                    placeholder="senha"
                    {...register("password", {
                      required: "campo obrigatório *",
                    })}
                  />
                  <FormErrorMessage color="#dc0362">
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                {loginErrors && <Box color="#dc0362">{loginErrors}</Box>}
                <Button isLoading={isSubmitting} type="submit">
                  entrar
                </Button>
              </form>
            </div>
          </div>
          <div className="footer">
            <div className="footer-credits">
              <p>Desenvolvido pelos estudantes:</p>
              <p>
                <a
                  href="https://www.linkedin.com/in/nathaliasonatti/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Nathália Cruz
                </a>{" "}
                (UX/UI Design) |{" "}
                <a
                  href="https://www.linkedin.com/in/gstadtler/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Gabriel Stadtler
                </a>{" "}
                (Desenvolvimento){" "}
                <a
                  href="https://www.linkedin.com/in/matheus-lobo-vaz-ara%C3%BAjo-247454203/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Matheus Lobo
                </a>{" "}
                (Desenvolvimento) |{" "}
                <a
                  href="https://www.linkedin.com/in/adriely-mirela-66603a193/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Adriely Lima
                </a>{" "}
                (Design)
              </p>
            </div>
            <div className="footer-logo">
              <img src={logo} alt="star logo" />
              <h3 style={{ color: "#fff" }}>#</h3>
              <h3>trending.strateegia</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
