import { useContext, createContext } from "react";
import { OverlayContextType } from "@/components/providers/OverlayProvider.type";

export const OverlayContext = createContext<OverlayContextType>({
  showToast: () => void 0,
  showModal: () => void 0,
  closeModal: () => void 0,
});

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};
