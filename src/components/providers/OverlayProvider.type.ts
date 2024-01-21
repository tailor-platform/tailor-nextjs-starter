export type ToastType = {
  title: string;
  description?: string;
  // variant: "success" | "status" | "error";
};

export type ModalType = {
  header: string;
  content: React.ReactNode;
};

export type OverlayContextType = {
  showToast: (toastData: ToastType) => void;
  showModal: (modalData: ModalType) => void;
  closeModal: () => void;
};
