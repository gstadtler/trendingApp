import { useContext } from "react";
import { FormErrorMessage, FormControl, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { authenticate } from "../../services/requestFunctions";
import polygon from "../../assets/polygon.svg";

import "./styles.scss";

const Login = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = (values) => {
    authenticate(values).then((data) => {
      auth.setApiToken(data.access_token);
      auth.setIsAuthenticated(!auth.isAuthenticated);
      history.push("/");
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
          <div className="informative">
            <h4>#trending.strategia</h4>
            <p>
              Debata assuntos do momento com privacidade e de forma estruturada
            </p>
          </div>
          <div className="login-wrapper">
            <h2>login</h2>
            <p>Insira seus dados de login do Strateegia</p>
            <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
              <FormControl isInvalid={errors.email}>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
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
