"use client";
import "@/styles/datagrid.css";
import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Heading } from "@tailor-platform/design-systems";
import { Box, Flex } from "@tailor-platform/styled-system/jsx";
import { Inter } from "next/font/google";
import { Header } from "./(layout)/Header";

const inter = Inter({ subsets: ["latin"] });

const client = new ApolloClient({
  uri: "http://localhost:8000",
  cache: new InMemoryCache(),
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Tailor Next.js starter</title>
      </head>
      <body className={inter.className}>
        <Flex minH="100%">
          <Box w="full">
            <ApolloProvider client={client}>
              <Header />
              <Box p={5}>
                <Heading p={3}>Task Management App</Heading>
                {children}
              </Box>
            </ApolloProvider>
          </Box>
        </Flex>
      </body>
    </html>
  );
};

export default RootLayout;
