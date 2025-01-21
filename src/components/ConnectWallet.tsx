import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import { Button } from "@radix-ui/themes";

export function ConnectWallet() {
  const { login, logout } = useLoginWithAbstract();
  const { address, status } = useAccount();

  if (status === "reconnecting" || status === "connecting") {
    return (
      <div className="flex items-center justify-center w-10 h-10">
        <div className="animate-spin">
          <Image src="/abs.svg" alt="Loading" width={24} height={24} />
        </div>
      </div>
    );
  }

  if (status === "connected") {
    return (
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg backdrop-blur-sm w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <p className="text-sm sm:text-base font-medium font-[family-name:var(--font-roobert)] mb-1">
              Connected to Abstract Global Wallet
            </p>
            <p className="text-xs text-gray-400 font-mono break-all">
              {address}
            </p>
          </div>
          <Button
            className="rounded-full border border-solid border-white/20 transition-colors flex items-center justify-center bg-white/10 text-white gap-2 hover:bg-white/20 text-sm !h-11 min-h-[44px] px-5 font-[family-name:var(--font-roobert)] w-full sm:flex-1"
            onClick={logout}
          >
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <button
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] hover:text-white dark:hover:bg-[#e0e0e0] dark:hover:text-black text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 font-[family-name:var(--font-roobert)] mx-auto w-fit"
      onClick={login}
    >
      <Image
        className="dark:invert"
        src="/abs.svg"
        alt="Abstract logomark"
        width={20}
        height={20}
        style={{ filter: "brightness(0)" }}
      />
      Sign in with Abstract
    </button>
  );
}
