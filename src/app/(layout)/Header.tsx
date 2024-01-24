import { appBar } from "@tailor-platform/styled-system/recipes";
import { AppBar, Text } from "@tailor-platform/design-systems";
import { Box } from "@tailor-platform/styled-system/jsx";

export const Header = () => {
  const classes = appBar();

  return (
    <Box bg="accent.fg" borderBottom="1px solid" borderColor="border.default">
      <AppBar bg="accent.fg" border="1px solid" borderColor="border.default">
        <Text className={classes.title}>Tailor Next.js starter</Text>
      </AppBar>
    </Box>
  );
};
