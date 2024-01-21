import "./globals.css";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import React, { Suspense } from "react";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import { TailorFirebaseProvider } from "@/libs/google-firebase-client"
import { ProviderConfig } from "@/libs/google-firebase-client/provider";
import { TeamsProvider } from "@/components/providers/teams";
import NotFound from "@/app/not-found";
import Loading from "@/components/templates/Loading";
import Error from "@/components/templates/Error";

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

// <tenantId>.example.com
const getTenantId = async () => {
  "use server";
  return new Promise<string>((resolve) => {
    const headersList = headers();
    const host = headersList.get('host');
    const hs = host.split(".")
    if (hs.length >= 2) {
      resolve(hs[0]);
    } else {
      resolve(undefined);
    }
  })
}

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
          <TeamsProvider tenantId={tenantId} notFound={<NotFound />}>
            <TailorFirebaseProvider tenantId={tenantIdMap[tenantId]} config={firebaseConfig}>
              <ErrorBoundary FallbackComponent={Error}>
                <Suspense fallback={<Loading />}>
                {children}
                </Suspense>
              </ErrorBoundary>
            </TailorFirebaseProvider>
          </TeamsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
