import { useFieldArray } from "react-hook-form";
import { Input, Button } from "@chakra-ui/react";
import { IoMdAddCircleOutline, IoMdTrash } from "react-icons/io";

const InputReferences = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "references",
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="references">
          <Input
            type="text"
            name={`references.${index}.link`}
            ref={register()}
            defaultValue={`references.${index}.link`}
          />
          <Button onClick={() => remove(index)}>
            <IoMdTrash />
          </Button>
        </div>
      ))}
      <Button
        rightIcon={<IoMdAddCircleOutline />}
        type="button"
        onClick={() => append({ link: "" })}
      >
        adicionar link
      </Button>
    </>
  );
};

export default InputReferences;
