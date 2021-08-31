import { useContext } from "react";
import { FormErrorMessage, FormControl, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { authenticate } from "../../services/requestFunctions";

import "./styles.css";

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
        <div>
          <h4>Informe suas credenciais do strateegia.digital</h4>
          <form className="login" onSubmit={handleSubmit(handleLogin)}>
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
              Submit
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
