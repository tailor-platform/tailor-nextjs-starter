import "./globals.css";
import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import { Flex } from "@tailor-platform/styled-system/jsx";
import { TailorFirebaseProvider } from "@/libs/google-firebase-client"
import { ProviderConfig } from "@/libs/google-firebase-client/provider";
import { TeamsProvider } from "@/components/providers/teams";
import NotFound from "@/app/not-found";
import Loading from "@/components/templates/Loading";
import Error from "@/components/templates/Error";
import {getTenantId} from "@/libs/tenant";
import {Header} from "@/components/templates/Header";
import {QueryToaster} from "@/components/organisms/queryToaster";
import AuthGuard from "@/components/atoms/authGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tailor Next.js Starter",
  description: "Frontend application starter for Tailor applications",
};

const firebaseConfig: ProviderConfig = {
  apiUrl: "https://api.example.com",
  firebaseConfig: {
    apiKey: "AIzaSyAHo9YbXdaoRoL3XG8h7J67DxPs8nsjSSY",
    authDomain: "teams-411717.firebaseapp.com",
    projectId: "teams-411717",
  }
};

const tenantIdMap = {
  "tailor": "tailor-zwnkv",
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const tenantId = await getTenantId();
  if (!tenantIdMap[tenantId]) {
    return <NotFound />
  }
  return (
    <html lang="en">
      <body className={inter.className}>
      <ErrorBoundary FallbackComponent={Error}>
        <TeamsProvider tenantId={tenantId} notFound={<NotFound />}>
          <TailorFirebaseProvider tenantId={tenantIdMap[tenantId]} config={firebaseConfig}>
            <AuthGuard loginPath={'/login'} publicPaths={["/login"]}>
              <Header title={"Teams"} />
              <Flex minH="100%">
                <QueryToaster />
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </Flex>
            </AuthGuard>
          </TailorFirebaseProvider>
        </TeamsProvider>
      </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
