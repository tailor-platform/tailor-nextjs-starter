"use client";
import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { createContext, type ReactNode, useContext } from "react";

export type ProviderConfig = {
  apiUrl: string;
  authServiceTokenPath?: string;
  authServiceRefreshTokenPath?: string;
  authServiceUserInfoPath?: string;

  firebaseConfig?: FirebaseOptions;
}

type Config = {
  tenantId?: string;
  config: ProviderConfig;
  app: FirebaseApp;
  auth: Auth;
}

const TailorFirebaseContext = createContext<Config | undefined>(undefined);

export const useTailorFirebase = () => {
  const context = useContext(TailorFirebaseContext);
  if (context === undefined) {
    throw new Error("useTailorFirebase must be used within as TailorFirebaseProvider")
  }
  return context;
}

type ConfigProviderProps = {
  config: ProviderConfig;
  tenantId?: string;
  children: ReactNode;
};

export const TailorFirebaseProvider = ({
   config,
   tenantId,
   children,
 }: ConfigProviderProps) => {
  const app = initializeApp(config.firebaseConfig);
  const auth: Auth = getAuth(app);
  if (tenantId) {
    auth.tenantId = tenantId;
  }
  if (!config.authServiceRefreshTokenPath) {
    config.authServiceRefreshTokenPath = "/auth/refresh-token";
  }
  if (!config.authServiceTokenPath) {
    config.authServiceTokenPath = "/auth/token";
  }
  if (!config.authServiceUserInfoPath) {
    config.authServiceUserInfoPath = "/auth/userinfo";
  }
  return <TailorFirebaseContext.Provider value={{
    tenantId: tenantId,
    config: config,
    auth: auth,
    app: app,
  }}>
    {children}
    </TailorFirebaseContext.Provider>
}