"use client";
import "@/styles/datagrid.css";
import "@/styles/globals.css";
import { Heading } from "@tailor-platform/design-systems";
import { Box, Flex } from "@tailor-platform/styled-system/jsx";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { Header } from "./(layout)/Header";

const inter = Inter({ subsets: ["latin"] });

const TailorProvider = dynamic(
  () =>
    import("@tailor-platform/client").then(
      ({ TailorProvider }) => TailorProvider,
    ),
  { ssr: false },
);

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Tailor Next.js starter</title>
      </head>
      <body className={inter.className}>
        <Flex minH="100%">
          <Box w="full">
            <TailorProvider graphqlEndpoint="http://localhost:8000">
              <Header />
              <Box p={5}>
                <Heading p={3}>Task Management</Heading>
                {children}
              </Box>
            </TailorProvider>
          </Box>
        </Flex>
      </body>
    </html>
  );
};

export default RootLayout;
