import { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../providers/auth";
import "./styles.css";

const Navbar = ({ username }) => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    auth.setApiToken("");
    auth.setIsAuthenticated(!auth.isAuthenticated);
    history.push("/login");
  };

  return (
    <>
      <div className="navbar">
        <h2>#trending.strateegia</h2>
        <div className="logout">
          <h3>Olá, {username}</h3>
          <button onClick={handleLogout}>sair</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
