import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const ISODateRegex = /\d{4}-[01]\d-[0-3]\d/;

const schema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    startAt: z.string().optional(),
    endAt: z.string().optional(),
  })
  .refine(
    (value) => {
      const startAt = Date.parse(value.startAt || "");
      const endAt = Date.parse(value.endAt || "");
      if (Number.isNaN(startAt) && Number.isNaN(endAt)) {
        return true;
      } else {
        return startAt < endAt;
      }
    },
    {
      message: "startAt should be earlier than endAt",
      path: ["endAt"],
    },
  );

export type NewTaskSchema = z.infer<typeof schema>;
export const useNewTaskForm = () => {
  return useForm<NewTaskSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      startAt: "",
      endAt: "",
    },
  });
};
