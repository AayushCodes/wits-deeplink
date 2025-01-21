"use client";

import { ConnectWallet } from "@/components/ConnectWallet";
import { CreateSession } from "@/components/CreateSession";
import { SessionConfig } from "@abstract-foundation/agw-client/sessions";
import { Heading } from "@radix-ui/themes";
import { useState } from "react";
import { Account } from "viem";
import { useAccount } from "wagmi";

type SessionData = {
  session: SessionConfig;
  sessionSigner: Account;
} | null;

export default function Home() {
  const { status } = useAccount();
  const [sessionData, setSessionData] = useState<SessionData>(null);

  const handleSessionCreated = (data: NonNullable<SessionData>) => {
    setSessionData(data);
  };

  return (
    <div className="flex flex-col gap-20 items-center justify-center min-h-screen bg-black overflow-hidden text-white">
      <div className="flex flex-col items-center w-full max-w-md space-y-6 mx-auto">
        <Heading>WITS Login</Heading>
        <ConnectWallet />

        {status === "connected" && !sessionData && (
          <CreateSession onSessionCreated={handleSessionCreated} />
        )}
      </div>
    </div>
  );
}
