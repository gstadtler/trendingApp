import { useContext, useState } from "react";
import { AuthContext } from "../providers/auth";
import { createKit } from "../../services/requestFunctions";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import "./styles.css";

const KitConverter = ({ kitData }) => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState(
    "O que você está pensando sobre isso?"
  );

  const auth = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  // const questionsExample = [
  //   {
  //     id: Math.random(),
  //     question: "O que você está pensando sobre isso?",
  //   },
  // ];

  const handleCreateKit = (values) => {
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
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            {...register("title", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.question}>
          <FormLabel htmlFor="question">perguntas</FormLabel>
          <Input
            id="question"
            type="text"
            defaultValue={question}
            onChange={(e) => setQuestion(e.target.value)}
            {...register("question", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.question && errors.question.message}
          </FormErrorMessage>
        </FormControl>
        <FormLabel htmlFor="references">referências</FormLabel>
        <Button leftIcon={<IoMdAddCircleOutline />}>adicionar link</Button>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
          width={"100px"}
          style={{
            display: "flex",
            margin: "auto",
          }}
        >
          salvar em ferramentas no strateegia
        </Button>
      </form>
    </>
  );
};

export default KitConverter;
