import { Box, Image } from "@chakra-ui/react";

import rectangle1 from "../../assets/element1/rectangle1.svg";
import rectangle2 from "../../assets/element1/rectangle2.svg";
import ellipse1 from "../../assets/element2/ellipse1.svg";
import ellipse2 from "../../assets/element2/ellipse2.svg";
import dotedEllipse1 from "../../assets/element2/dotedEllipse.svg";
import cilindro from "../../assets/element3/cilindro.svg";
import dotedCilindro from "../../assets/element3/dotedOutline.svg";

import "./styles.scss";

const GeometricElements = () => {
  return (
    <>
      <Box className="geometric-elements">
        {/* Elemento geométrico 1 */}
        <Box>
          <Image
            src={rectangle1}
            alt="retangulo1"
            boxSize="150px"
            pos="relative"
          />
          <Image
            src={rectangle2}
            alt="retangulo2"
            boxSize="150px"
            pos="absolute"
            left="0"
          />
        </Box>
        {/* Elemento geométrico 2 */}
        <Box>
          <Image
            src={ellipse2}
            alt="elipse2"
            boxSize="150px"
            pos="relative"
            top="150px"
          />
          <Image
            src={ellipse1}
            alt="elipse1"
            boxSize="150px"
            pos="absolute"
            top="235px"
            left="50px"
          />
          <Image
            src={dotedEllipse1}
            alt="sombra pontilhada"
            boxSize="100px"
            pos="absolute"
            top="180px"
            left="165px"
          />
        </Box>
        {/* Elemento geométrico 3 */}
        <Box>
          <Image
            src={cilindro}
            alt="cilindro"
            boxSize="150px"
            pos="relative"
            left="100px"
            h="220px"
          />
          <Image
            src={dotedCilindro}
            alt="sombra pontilhada"
            boxSize="150px"
            pos="absolute"
            left="384px"
            top="0"
          />
        </Box>
      </Box>
    </>
  );
};

export default GeometricElements;
