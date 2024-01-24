"use client";
import { Button, Heading, Text } from "@tailor-platform/design-systems";
import {
  Box,
  Container,
  HStack,
  Stack,
} from "@tailor-platform/styled-system/jsx";
import { cva } from "@tailor-platform/styled-system/css";
import Image from "next/image";

const hoverableLink = cva({
  base: {
    textAlign: "center",
    borderRadius: 10,
    p: 4,
    _hover: {
      bgColor: "bg.subtle",
    },
  },
});

const Home = () => {
  return (
    <Container w="100%" p={10}>
      <HStack justifyContent={"center"} m={50}>
        <Image
          src="/tailor.png"
          alt="Tailor Logo"
          width={332}
          height={100}
          priority
        />
      </HStack>
      <HStack justifyContent={"center"} m={50}>
        <Text color="fg.emphasized">
          This is starter app for integrating Next.js and Tailor Platform
          backend
        </Text>
      </HStack>
      <HStack m={50} justifyContent={"center"}>
        <Box className={hoverableLink()}>
          <Button
            variant="link"
            href="https://docs.tailor.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Stack>
              <Heading>
                Docs <span>-&gt;</span>
              </Heading>
              <Text>Find in-depth information about the Tailor Platform.</Text>
            </Stack>
          </Button>
        </Box>
        <Box className={hoverableLink()}>
          <Button
            variant="link"
            href="https://www.tailor.tech/templates"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Stack>
              <Heading>
                Templates <span>-&gt;</span>
              </Heading>
              <Text>
                Explore ERP templates to jump start your Tailor application.
              </Text>
            </Stack>
          </Button>
        </Box>
      </HStack>
    </Container>
  );
};

export default Home;
