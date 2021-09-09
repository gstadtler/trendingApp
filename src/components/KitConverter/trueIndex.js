import { useContext } from "react";
import { AuthContext } from "../providers/auth";
import { createKit } from "../../services/requestFunctions";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { CgCheckO } from "react-icons/cg";
import "./styles.scss";
import CustomFieldArray from "../CustomFieldArray";

const KitConverter = ({ kitData }) => {
  const auth = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questions: [{ question: "O que você está pensando sobre isso?" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateKit = (values) => {
    console.log("kit creation", values);
    createKit(values, auth.apiToken).then((response) => {
      console.log(response);
      if (response.status === 201) {
        onOpen();
      } else {
        alert("Ocorreu algum problema, tente novamente!");
      }
    });
  };

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

      <form className="kitConverter" onSubmit={handleSubmit(handleCreateKit)}>
        <FormControl isInvalid={errors.title}>
          <FormLabel htmlFor="title">título</FormLabel>
          <Input
            id="title"
            type="text"
            defaultValue={kitData?.title}
            {...register("title", {
              required: "campo obrigatório *",
            })}
          />
          <FormErrorMessage color="#dc0362">
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.question}>
          <FormLabel htmlFor="question">perguntas</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="questions">
              <Input
                type="text"
                {...register(`questions.${index}.question`, {
                  required: "campo obrigatório *",
                })}
                defaultValue={`questions.${index}.question`}
              />
              <FormErrorMessage color="#dc0362">
                {errors.question && errors.question.message}
              </FormErrorMessage>
              <button
                className="remove-question-btn"
                onClick={() => remove(index)}
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          ))}
          <button
            className="add-question-btn"
            type="button"
            onClick={() => append({ question: "" })}
          >
            adicionar pergunta
            <IoMdAddCircleOutline size={18} />
          </button>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="references">referências</FormLabel>
          <CustomFieldArray array="array teste" />
        </FormControl>

        <button onClick={() => onOpen()}>open modal</button>

        <button className="footer-btns" type="submit" width={"100px"}>
          salvar em ferramentas no strateegia
        </button>
      </form>
    </>
  );
};

export default KitConverter;
