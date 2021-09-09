import { useContext } from "react";
import { AuthContext } from "../providers/auth";
import { createKit } from "../../services/requestFunctions";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form, FieldArray, Field } from "formik";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { CgCheckO } from "react-icons/cg";
import "./styles.scss";

const KitConverter = ({ kitData }) => {
  const auth = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateKit = (values) => {
    // console.log("kit creation", values);
    createKit(values, auth.apiToken).then((response) => {
      console.log(response);
      if (response.status === 201) {
        onOpen();
      } else {
        alert("Ocorreu algum problema, tente novamente!");
      }
    });
  };

  const initialValues = {
    title: kitData?.title,
    questions: [{ question: "O que você está pensando sobre isso?" }],
    references: [],
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
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleCreateKit}
        // validateOnChange={false}
        // validateOnBlur={false}
        // validateOnMount
      >
        {(formik) => {
          // console.log("Formik props", formik);
          return (
            <Form className="kitConverter">
              <div className="form-control">
                <label htmlFor="title">título</label>
                <Field type="text" id="title" name="title" required />
              </div>

              <div className="form-control">
                <label htmlFor="questions">perguntas</label>
                <FieldArray name="questions">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { questions } = values;
                    return (
                      <div>
                        {questions.map((question, index) => (
                          <div key={index} className="array-field">
                            <Field name={`questions[${index}].question`} />
                            {index > 0 && (
                              <button
                                className="remove-btn"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <FiTrash2 size={20} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          className="add-btn"
                          type="button"
                          onClick={() => push("")}
                        >
                          adicionar pergunta
                          <IoMdAddCircleOutline size={18} />
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>
              </div>

              <div className="form-control">
                <label htmlFor="references">referências</label>
                <FieldArray name="references">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { references } = values;
                    return (
                      <div>
                        {references.map((reference, index) => (
                          <div key={index} className="array-field">
                            <Field
                              name={`references[${index}].description`}
                              placeholder="descrição"
                            />
                            <Field
                              name={`references[${index}].url`}
                              placeholder="link"
                            />
                            <button
                              className="remove-btn"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              <FiTrash2 size={20} />
                            </button>
                          </div>
                        ))}
                        <button
                          className="add-btn"
                          type="button"
                          onClick={() => push({ description: "", url: "" })}
                        >
                          <IoMdAddCircleOutline size={18} />
                          adicionar link
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
              <button className="footer-btns" type="submit">
                salvar em ferramentas no strateegia
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default KitConverter;
