import { Heading, Text } from "@tailor-platform/design-systems";
import { Box, Container } from "@tailor-platform/styled-system/jsx";
import Image from "next/image";

const Home = () => {
  return (
    <Container>
      <Box>
        <Image
          src="/tailor.png"
          alt="Tailor Logo"
          width={332}
          height={100}
          priority
        />
      </Box>

      <Box>
        <a
          href="https://docs.tailor.tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading>
            Docs <span>-&gt;</span>
          </Heading>
          <Text>Find in-depth information about the Tailor Platform.</Text>
        </a>

        <a
          href="https://www.tailor.tech/templates"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading>
            Templates <span>-&gt;</span>
          </Heading>
          <Text>
            Explore ERP templates to jump start your Tailor application.
          </Text>
        </a>
      </Box>
    </Container>
  );
};

export default Home;
