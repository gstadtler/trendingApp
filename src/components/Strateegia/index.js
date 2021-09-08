import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import {
  fetchUserData,
  // fetchUserProjects,
} from "../../services/requestFunctions";
import Navbar from "../Navbar";
import TrendingTopics from "../TrendingTopics";
import KitConverter from "../KitConverter";

import "./styles.scss";

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
          <div className="section-steps">
            <span>1º passo</span>
            <p>Selecione um assunto do momento para debater</p>
          </div>
          <TrendingTopics handleKitData={handleKitData} />
        </section>
        <section className="kit-section">
          <div className="section-steps">
            <span>2º passo</span>
            <p>Criar ferramenta para o Strateegia</p>
          </div>
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
