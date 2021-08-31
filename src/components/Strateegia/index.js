import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import {
  fetchUserData,
  fetchUserProjects,
} from "../../services/requestFunctions";
import Navbar from "../Navbar";

const Strateegia = () => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchUserData(auth.apiToken).then((data) => {
      console.log("user", data);
      setUser(data);
    });
    fetchUserProjects(auth.apiToken).then((data) => {
      setProjects(data);
    });
  }, [auth.apiToken]);

  return (
    <div>
      <Navbar username={user.name} />
      <h4>Suas jornadas</h4>
      {projects ? (
        projects.map((project) => (
          <div key={project.projects[0].id}>
            <p>{project.projects[0].title}</p>
          </div>
        ))
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default Strateegia;
