import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { Input, Text } from "@tailor-platform/design-systems";
import { Box } from "@tailor-platform/styled-system/jsx";
import { HTMLInputTypeAttribute, useMemo } from "react";

type InputGroupProps<T extends FieldValues> = {
  type?: HTMLInputTypeAttribute;
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
};

export const InputGroup = <T extends FieldValues>(
  props: InputGroupProps<T>,
) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name: props.name,
    control: props.control,
  });

  const errorMessage = useMemo(() => {
    if (props.name in errors) {
      return errors[props.name]?.message;
    }
  }, [errors, props.name]);

  return (
    <Box>
      <Text fontWeight="bold">{props.label}</Text>
      <Input
        type={props.type || "text"}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={field.ref}
        disabled={field.disabled}
      />
      <Text color="red">{errorMessage?.toString()}</Text>
    </Box>
  );
};
