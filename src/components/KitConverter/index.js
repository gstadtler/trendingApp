import { useContext } from "react";
import { AuthContext } from "../providers/auth";
import { createKit } from "../../services/requestFunctions";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import "./styles.scss";
// import InputReferences from "../InputReferences";

const KitConverter = ({ kitData }) => {
  const auth = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      questions: [{ question: "O que você está pensando sobre isso?" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const handleCreateKit = (values) => {
    console.log("kit creation", values);
    createKit(values, auth.apiToken).then((response) => {
      console.log(response);
      if (response.status === 201) {
        alert("Kit criado, acesse em sua página de ferramentas no strateegia!");
      } else {
        alert("Ocorreu algum problema, tente novamente!");
      }
    });
  };

  return (
    <>
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
              <Button
                className="remove-question-btn"
                onClick={() => remove(index)}
              >
                <FiTrash2 size={20} />
              </Button>
            </div>
          ))}
          <Button
            className="add-question-btn"
            display="flex"
            rightIcon={<IoMdAddCircleOutline size={18} />}
            type="button"
            onClick={() => append({ question: "" })}
          >
            adicionar pergunta
          </Button>
        </FormControl>

        {/* <FormControl isInvalid={errors.references}>
          <FormLabel htmlFor="references">referências</FormLabel>
          <InputReferences {...{ control, register, errors }} />
          <FormErrorMessage>
            {errors.references && errors.references.message}
          </FormErrorMessage>
        </FormControl> */}

        <Button
          className="footer-btns"
          isLoading={isSubmitting}
          type="submit"
          width={"100px"}
        >
          salvar em ferramentas no strateegia
        </Button>
      </form>
    </>
  );
};

export default KitConverter;
