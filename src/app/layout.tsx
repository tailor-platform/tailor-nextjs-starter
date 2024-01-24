"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const client = new ApolloClient({
  uri: "https://localhost:8000",
  cache: new InMemoryCache(),
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Tailor Next.js starter</title>
      </head>
      <body className={inter.className}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
};

export default RootLayout;
