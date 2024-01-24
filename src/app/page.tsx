"use client";
import { Box } from "@tailor-platform/styled-system/jsx";
import { DataGrid, useDataGrid } from "@tailor-platform/datagrid";
import { Button } from "@tailor-platform/design-systems";
import { useTasksSuspenseQuery } from "@/graphql/schema.generated";

const Home = () => {
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

  return (
    <Box w="full">
      <Box p={3} w="full">
        <Button onClick={() => refetch()}>Reload</Button>
        <Box py={3}>
          <DataGrid table={table} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
