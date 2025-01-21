import type { Metadata } from "next";
import "./globals.css";
import AbstractWalletWrapper from "../components/AbstractWalletProvider";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Wits Deeplink",
  description: "Deeplink for WITS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AbstractWalletWrapper>
        <body>
          <Theme>{children}</Theme>
        </body>
      </AbstractWalletWrapper>
    </html>
  );
}
