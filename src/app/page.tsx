"use client";
import { DataGrid, useDataGrid } from "@tailor-platform/datagrid";
import { Button } from "@tailor-platform/design-systems";
import { Box, HStack, Stack } from "@tailor-platform/styled-system/jsx";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import {
  useCreateTaskMutation,
  useTasksSuspenseQuery,
} from "@/graphql/schema.generated";
import { Modal } from "@/components/organisms/Modal";
import { NewTaskSchema, useNewTaskForm } from "@/hooks/newTaskForm";
import { InputGroup } from "@/components/forms/InputGroup";

const Page = () => {
  const { data, refetch } = useTasksSuspenseQuery();
  const table = useDataGrid({
    columns: [
      {
        accessorKey: "name",
        header: "タスク名",
      },
      {
        accessorKey: "description",
        header: "タスク詳細",
      },
      {
        accessorKey: "startAt",
        header: "開始日",
      },
      {
        accessorKey: "endAt",
        header: "終了日",
      },
    ],
    data: data.tasks?.collection || [],
  });
  const [isOpen, setOpen] = useState(false);

  return (
    <Box w="full">
      <Box p={3} w="full">
        <HStack>
          <Button onClick={() => refetch()}>Reload</Button>
          <Button onClick={() => setOpen(true)}>New task</Button>
        </HStack>
        <Box py={3}>
          <DataGrid table={table} />
        </Box>
      </Box>
      <Modal isOpen={isOpen} setOpen={setOpen} title="New Task">
        <NewTaskModalContent close={() => setOpen(false)} />
      </Modal>
    </Box>
  );
};

const NewTaskModalContent = (props: { close: () => void }) => {
  const [createTask] = useCreateTaskMutation();
  const { control, handleSubmit, reset } = useNewTaskForm();
  const onSubmit: SubmitHandler<NewTaskSchema> = async (data) => {
    await createTask({
      variables: {
        input: data,
      },
    });

    reset();
    props.close();
    window.alert("Successfully submitted!");
  };

  return (
    <form className="w_full" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={3}>
        <InputGroup label="タスク名" name="name" control={control} />
        <InputGroup label="説明" name="description" control={control} />
        <InputGroup
          label="開始日"
          type="date"
          name="startAt"
          control={control}
        />
        <InputGroup label="終了日" type="date" name="endAt" control={control} />
        <Button type="submit">Add</Button>
      </Stack>
    </form>
  );
};

export default Page;
