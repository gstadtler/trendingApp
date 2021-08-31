import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/auth";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import "./styles.css";

const KitConverter = () => {
  const auth = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const CreateKit = async (values) => {
    try {
      const response = await axios(
        "https://api.strateegia.digital/kits/v1/kit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.apiToken}`,
          },
          data: {
            title: values.title,
            description: "trending topic do twitter",
            tier: "CUSTOM",
            type: "LEARNING",
            questions: [
              {
                id: Math.random(),
                question:
                  values.question || "O que você está pensando sobre isso?",
              },
            ],
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="kitConverter" onSubmit={handleSubmit(CreateKit)}>
        <FormControl isInvalid={errors.title}>
          <FormLabel htmlFor="title" style={{ textAlign: "center" }}>
            Título
          </FormLabel>
          <Input
            id="title"
            type="text"
            placeholder="#titulo"
            {...register("title", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.question}>
          <FormLabel htmlFor="question" style={{ textAlign: "center" }}>
            Perguntas
          </FormLabel>
          <Input
            id="question"
            type="text"
            value="O que você está pensando sobre isso?"
            {...register("question", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.question && errors.question.message}
          </FormErrorMessage>
        </FormControl>
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
          Submit
        </Button>
      </form>
    </>
  );
};

export default KitConverter;
