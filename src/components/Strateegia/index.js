import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import {
  fetchUserData,
  // fetchUserProjects,
} from "../../services/requestFunctions";
import Navbar from "../Navbar";
import TrendingTopics from "../TrendingTopics";
import KitConverter from "../KitConverter";

import "./styles.css";

const Strateegia = () => {
  const [user, setUser] = useState({});
  const [kitData, setKitData] = useState("");
  // const [projects, setProjects] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchUserData(auth.apiToken).then((data) => {
      setUser(data);
    });
    // fetchUserProjects(auth.apiToken).then((data) => {
    //   setProjects(data);
    // });
  }, [auth.apiToken]);

  const handleKitData = (data) => {
    setKitData(data);
  };

  return (
    <div>
      <Navbar username={user.name} />
      <div className="sections-wrapper">
        <section className="topics-section">
          <p>Selecione um assunto do momento para debater</p>
          <TrendingTopics handleKitData={handleKitData} />
        </section>
        <section className="kit-section">
          <p>Criar ferramenta para o Strateegia</p>
          <KitConverter kitData={kitData} />
        </section>
        <section className="journeys-section"></section>
        {/* <h4>Suas jornadas</h4>
        {projects ? (
          projects.map((project) => (
            <div key={project.projects[0].id}>
              <p>{project.projects[0].title}</p>
            </div>
          ))
        ) : (
          <div>loading</div>
        )} */}
      </div>
    </div>
  );
};

export default Strateegia;
