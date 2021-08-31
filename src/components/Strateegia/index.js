import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import { fetchUserProjects } from "../../services/requestFunctions";
import Navbar from "../Navbar";

const Strateegia = () => {
  const [projects, setProjects] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchUserProjects(auth.apiToken).then((data) => {
      setProjects(data);
    });
  }, [auth.apiToken]);

  return (
    <div>
      <Navbar />
      {projects ? (
        projects.map((project) => (
          <div key={project.projects[0].id}>{project.projects[0].title}</div>
        ))
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default Strateegia;
