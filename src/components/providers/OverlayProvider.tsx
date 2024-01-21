import React, { useCallback, useState } from "react";
import { createToaster, Dialog, Portal, Toast } from "@ark-ui/react";
import { IconButton, Text } from "@tailor-platform/design-systems";
import { XIcon } from "lucide-react";
import { Stack, Box, HStack } from "@tailor-platform/styled-system/jsx";
import { dialog, toast } from "@tailor-platform/styled-system/recipes";
import { ToastType, ModalType } from "./OverlayProvider.type";
import { OverlayContext } from "@/hooks/useOverlay";

type ModalProps = ModalType & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const OverlayProvider = ({ children }: React.PropsWithChildren) => {
  const toastClasses = toast();
  const dialogClasses = dialog();

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<ModalType>({
    header: "",
    content: <></>,
  });
  const [Toaster, toaster] = createToaster({
    placement: "bottom-end",
    render: (toast) => {
      return (
        <Toast.Root className={toastClasses.root}>
          <Toast.Title className={toastClasses.title}>
            {toast.title}
          </Toast.Title>
          <Toast.Description className={toastClasses.description}>
            {toast.description}
          </Toast.Description>
          <Toast.CloseTrigger asChild className={toastClasses.closeTrigger}>
            <IconButton
              aria-label="close"
              size="sm"
              variant="link"
              icon={<XIcon />}
            />
          </Toast.CloseTrigger>
        </Toast.Root>
      );
    },
  });

  const Modal = ({ isOpen, setIsOpen, header, content }: ModalProps) => {
    return (
      <Dialog open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop className={dialogClasses.backdrop} />
          <Dialog.Positioner className={dialogClasses.positioner}>
            <Dialog.Content className={dialogClasses.content}>
              <Box width="560px">
                <HStack
                  borderBottom="1px solid"
                  borderColor="border.default"
                  p={4}
                  justify="space-between"
                >
                  <Dialog.Title>
                    <Text textStyle="lg" fontWeight="bold">
                      {header}
                    </Text>
                  </Dialog.Title>
                  <Dialog.CloseTrigger asChild>
                    <IconButton
                      aria-label="Close Dialog"
                      variant="tertiary"
                      size="sm"
                    >
                      <XIcon />
                    </IconButton>
                  </Dialog.CloseTrigger>
                </HStack>
                <Stack direction="row" width="full" px={4} pb={6} pt={4}>
                  {content}
                </Stack>
              </Box>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog>
    );
  };

  const showToast = useCallback(
    ({ title, description }: ToastType) => {
      toaster.create({ title, description });
    },
    [toaster],
  );

  const showModal = ({ header, content }: ModalType) => {
    setModal({ header, content });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <OverlayContext.Provider value={{ showToast, showModal, closeModal }}>
      {children}
      <Toaster />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={modal.header}
        content={modal.content}
      />
    </OverlayContext.Provider>
  );
};
