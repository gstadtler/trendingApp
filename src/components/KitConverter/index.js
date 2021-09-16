import { useContext, useState } from "react";
import { AuthContext } from "../providers/auth";
import { createKit } from "../../services/requestFunctions";
import { useDisclosure } from "@chakra-ui/react";
import { Formik, Form, FieldArray, Field } from "formik";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CustomModal from "../CustomModal";
import "./styles.scss";

const KitConverter = ({ kitData }) => {
  const [creationFailed, setCreationFailed] = useState(false);

  const auth = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues = {
    title: kitData?.name,
    questions: [{ question: "O que você está pensando sobre isso?" }],
    references: [{ description: kitData?.name, url: kitData?.url }],
  };

  const handleCreateKit = (values, onSubmitProps) => {
    console.log("kit creation", values);
    createKit(values, auth.apiToken).then((response) => {
      console.log(response);
      if (response.status === 201) {
        onOpen();
        onSubmitProps.resetForm(initialValues);
      } else {
        setCreationFailed(!creationFailed);
        onOpen();
        onSubmitProps.resetForm(initialValues);
      }
    });
  };

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        failedModal={creationFailed}
      />

      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleCreateKit}
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
              {/* <button className="footer-btns" type="button" onClick={onOpen}>
                feedback
              </button> */}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default KitConverter;
