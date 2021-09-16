import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import { CgCheckO } from "react-icons/cg";
import { BiErrorCircle } from "react-icons/bi";

const CustomModal = ({ isOpen, onClose, failedModal }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {failedModal ? (
            <>
              <ModalBody>
                <BiErrorCircle
                  size={30}
                  color="#dc0362"
                  style={{ display: "flex", margin: "40px auto 20px" }}
                />
                <p
                  style={{
                    width: "60%",
                    margin: "auto",
                    color: "#545151",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Algo de errado aconteceu e o kit não foi criado
                </p>
              </ModalBody>

              <ModalFooter
                display="flex"
                flexDirection="column"
                gridGap="20px"
                mt={5}
                mb={10}
              >
                <Button
                  onClick={onClose}
                  style={{
                    background: "#dc0362",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  voltar
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalBody>
                <CgCheckO
                  size={30}
                  color="#dc0362"
                  style={{ display: "flex", margin: "40px auto 20px" }}
                />
                <p
                  style={{
                    width: "60%",
                    margin: "auto",
                    color: "#545151",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Kit salvo em tópicos de aprendizagem nas suas ferramentas no
                  Strateegia
                </p>
              </ModalBody>

              <ModalFooter
                display="flex"
                flexDirection="column"
                gridGap="20px"
                mt={10}
                mb={10}
              >
                <a
                  href="https://strateegia.digital/"
                  onClick={onClose}
                  style={{
                    background: "#dc0362",
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                    textDecoration: "none",
                    padding: "8px",
                  }}
                >
                  ver no strateegia
                </a>
                <Button
                  onClick={onClose}
                  style={{
                    background: "#fff",
                    border: "1px solid grey",
                    cursor: "pointer",
                  }}
                >
                  criar novo kit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
