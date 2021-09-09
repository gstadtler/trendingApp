import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

import { CgCheckO } from "react-icons/cg";

const CustomModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
              kit adicionado em suas ferramentas no Strateegia
            </p>
          </ModalBody>

          <ModalFooter
            display="flex"
            flexDirection="column"
            gridGap="20px"
            mt={10}
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
              ver no strateegia
            </Button>
            <Button
              style={{
                background: "#fff",
                border: "1px solid grey",
                cursor: "pointer",
              }}
            >
              criar novo kit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
