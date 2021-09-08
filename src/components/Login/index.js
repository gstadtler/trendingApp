import { useContext, useState } from "react";
import {
  Box,
  Image,
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
import ellipse from "../../assets/element4/ellipse.svg";
import dotedEllipse from "../../assets/element4/dotedOutline.svg";

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
          auth.setIsAuthenticated(!auth.isAuthenticated);
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

  const handleLogout = () => {
    auth.setApiToken("");
    auth.setIsAuthenticated(!auth.isAuthenticated);
  };

  return (
    <>
      {auth.isAuthenticated && (
        <div>
          <h3>Bem vindo!</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!auth.isAuthenticated && (
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
              <div className="ellipse">
                <Image
                  src={ellipse}
                  alt="elipse"
                  boxSize="100px"
                  pos="relative"
                />
                <Image
                  src={dotedEllipse}
                  alt="sombra pontilhada"
                  boxSize="100px"
                  pos="absolute"
                  left="440px"
                />
              </div>
            </div>
          </div>
          <div className="login-wrapper">
            <h1>login</h1>
            <p>Insira seus dados de login do Strateegia</p>
            <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
              <FormControl isInvalid={errors.email} mt="10">
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
                  placeholder="password"
                  {...register("password", {
                    required: "campo obrigatório *",
                  })}
                />
                <FormErrorMessage color="#dc0362">
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              {loginErrors && <Box color="#dc0362">{loginErrors}</Box>}
              <Button mt={4} isLoading={isSubmitting} type="submit">
                entrar
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
