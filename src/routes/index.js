import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/providers/auth";
import Login from "../components/Login";
import Strateegia from "../components/Strateegia";

const Routes = () => {
  const auth = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {!auth.isAuthenticated ? <Redirect to="/login" /> : <Strateegia />}
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
