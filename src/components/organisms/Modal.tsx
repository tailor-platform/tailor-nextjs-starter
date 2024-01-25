import { Dialog, Portal } from "@ark-ui/react";
import { IconButton, Text } from "@tailor-platform/design-systems";
import { HStack, Stack } from "@tailor-platform/styled-system/jsx";
import { dialog } from "@tailor-platform/styled-system/recipes";
import { XIcon } from "lucide-react";

export const Modal = (props: {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  title: string;
  children: React.ReactNode;
}) => {
  const dialogClasses = dialog();

  return (
    <Dialog.Root
      open={props.isOpen}
      onOpenChange={(e) => props.setOpen(e.open)}
      closeOnInteractOutside={false}
    >
      <Portal>
        <Dialog.Backdrop className={dialogClasses.backdrop} />
        <Dialog.Positioner className={dialogClasses.positioner}>
          <Dialog.Content className={dialogClasses.content}>
            <HStack
              borderBottom="1px solid"
              borderColor="border.default"
              p={4}
              justify="space-between"
              w="full"
            >
              <Dialog.Title>
                <Text textStyle="lg" fontWeight="bold">
                  {props.title}
                </Text>
              </Dialog.Title>
              <IconButton
                aria-label="Close Dialog"
                variant="tertiary"
                size="sm"
                onClick={() => {
                  props.setOpen(false);
                }}
              >
                <XIcon />
              </IconButton>
            </HStack>
            <Stack direction="row" width="full" px={4} pb={6} pt={4}>
              {props.children}
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
