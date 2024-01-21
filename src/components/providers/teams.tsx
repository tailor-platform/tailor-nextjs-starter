"use client";
import dynamic from "next/dynamic";
import { createContext, type ReactNode } from "react";
import { OverlayProvider } from "@/components/providers/OverlayProvider";

export type Context = {
  tenantId?: string;
}

const TailorProvider = dynamic(
  () =>
    import("@tailor-platform/client").then(
      ({ TailorProvider }) => TailorProvider,
    ),
  { ssr: false },
);

const TeamsContext = createContext<Context | undefined>(undefined);

type TeamsProviderProps = {
  tenantId?: string;
  notFound: ReactNode;
  children: ReactNode;
};

export const TeamsProvider = ({
    tenantId,
    notFound,
    children,
  }: TeamsProviderProps) => {
    if (tenantId === undefined) {
      return notFound
    }
    return <TeamsContext.Provider value={{
      tenantId: tenantId,
    }}>
        <TailorProvider>
          <OverlayProvider>
            {children}
          </OverlayProvider>
        </TailorProvider>
      </TeamsContext.Provider>
}