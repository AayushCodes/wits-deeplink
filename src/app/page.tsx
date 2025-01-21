"use client";

import { ConnectWallet } from "@/components/ConnectWallet";
import { CreateSession } from "@/components/CreateSession";
import { unityBaseUrl } from "@/constants";
import { SessionConfig } from "@abstract-foundation/agw-client/sessions";
import { Button, Heading } from "@radix-ui/themes";
import { useState } from "react";
import { Account } from "viem";
import { useAccount } from "wagmi";

type SessionData = {
  session: SessionConfig;
  sessionSigner: Account;
  signerPrivateKey: `0x${string}`;
} | null;

export default function Home() {
  const { status } = useAccount();
  const [sessionData, setSessionData] = useState<SessionData>(null);

  const handleSessionCreated = (data: NonNullable<SessionData>) => {
    setSessionData(data);
  };

  const handleUnityRedirect = () => {
    const url = `${unityBaseUrl}?signerAddress=${sessionData?.sessionSigner.address}&signerPrivateKey=${sessionData?.signerPrivateKey}&sessionTimeout=${sessionData?.session.expiresAt}`;

    // Fallback: try opening in new window after a short delay
    setTimeout(() => {
      if (document.hasFocus()) {
        window.open(url, "_blank");
      }
    }, 100);
  };

  return (
    <div className="flex flex-col gap-20 items-center justify-center min-h-screen bg-black overflow-hidden text-white">
      <div className="flex flex-col items-center w-full max-w-md space-y-6 mx-auto">
        <Heading>WITS Login</Heading>
        <ConnectWallet />

        {status === "connected" && !sessionData && (
          <CreateSession onSessionCreated={handleSessionCreated} />
        )}

        {sessionData && (
          <Button onClick={handleUnityRedirect}>Back to game</Button>
        )}
      </div>
    </div>
  );
}
