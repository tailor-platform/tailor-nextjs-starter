"use client";
import { Box } from "@tailor-platform/styled-system/jsx";
import { useEffect } from "react";
import { logger } from "@/libs/logger";

const Error = ({ error }: { error: Error }) => {
  useEffect(() => {
    logger.error(error.message);
  }, [error]);

  return <Box w="full">Error occured</Box>;
};

export default Error;
