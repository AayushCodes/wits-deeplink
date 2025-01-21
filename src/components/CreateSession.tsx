import { useState } from "react";
import { useCreateSession } from "@abstract-foundation/agw-react";
import {
  LimitType,
  SessionConfig,
} from "@abstract-foundation/agw-client/sessions";
import { parseEther, toFunctionSelector, Account } from "viem";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { getGeneralPaymasterInput } from "viem/zksync";
import { Button } from "@radix-ui/themes";

type CreateSessionProps = {
  onSessionCreated: (data: {
    session: SessionConfig;
    sessionSigner: Account;
  }) => void;
};

export function CreateSession({ onSessionCreated }: CreateSessionProps) {
  const { createSessionAsync } = useCreateSession();
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreateSession() {
    try {
      setIsCreating(true);
      const sessionSigner = privateKeyToAccount(generatePrivateKey());

      const { session } = await createSessionAsync({
        session: {
          signer: sessionSigner.address,
          expiresAt: BigInt(Math.floor(Date.now() / 1000) + 60 * 60 * 24),
          feeLimit: {
            limitType: LimitType.Lifetime,
            limit: parseEther("1"),
            period: BigInt(0),
          },
          callPolicies: [
            {
              target: "0xc7EA500a11e2491D1217EDe3C6F3931F699c5716", // Staking contract
              selector: toFunctionSelector(
                "stakeNFT(address,uint256, uint256)"
              ),
              valueLimit: {
                limitType: LimitType.Unlimited,
                limit: BigInt(0),
                period: BigInt(0),
              },
              maxValuePerUse: BigInt(0),
              constraints: [],
            },
            {
              target: "0xc7EA500a11e2491D1217EDe3C6F3931F699c5716", // Staking contract
              selector: toFunctionSelector(
                "batchStakeNFTs(address,uint256[], uint256)"
              ),
              valueLimit: {
                limitType: LimitType.Unlimited,
                limit: BigInt(0),
                period: BigInt(0),
              },
              maxValuePerUse: BigInt(0),
              constraints: [],
            },
            {
              target: "0xc7EA500a11e2491D1217EDe3C6F3931F699c5716", // Staking contract
              selector: toFunctionSelector("unstakeNFT(uint256)"),
              valueLimit: {
                limitType: LimitType.Unlimited,
                limit: BigInt(0),
                period: BigInt(0),
              },
              maxValuePerUse: BigInt(0),
              constraints: [],
            },
            {
              target: "0xc7EA500a11e2491D1217EDe3C6F3931F699c5716", // Staking contract
              selector: toFunctionSelector("unstakeNFT(uint256[])"),
              valueLimit: {
                limitType: LimitType.Unlimited,
                limit: BigInt(0),
                period: BigInt(0),
              },
              maxValuePerUse: BigInt(0),
              constraints: [],
            },
          ],
          transferPolicies: [
            {
              target: "0x4294DeBa041FBa241B906d935F1f6fe6971d8a6e", // Allowed recipient 1
              maxValuePerUse: parseEther("0.1"), // Max 0.1 ETH per transfer
              valueLimit: {
                limitType: LimitType.Allowance,
                limit: parseEther("1"), // Max 1 ETH per day
                period: BigInt(60 * 60 * 24 * 7), // 7 days
              },
            },
          ],
        },
        paymaster: "0x5407B5040dec3D339A9247f3654E59EEccbb6391",
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });

      onSessionCreated({ session, sessionSigner });
    } catch (error) {
      console.error("Failed to create session:", error);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <Button onClick={handleCreateSession} disabled={isCreating}>
      {isCreating ? "Creating Session..." : "Create Session"}
    </Button>
  );
}
