import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

const PackageDetails = ({ displayPackage }: any) => {
  const wallet: any = useWallet();
  const idl: any = IDL;

  async function callPurchasePackage(package_id: any, package_price: any) {
    // integrate api here to call /get-referral-uplinks
    const referrals = [
      "7h7rhCPzaFFJBJ4zScfMGXPCiNctJXejNaQSeDDbkoBa",
      "22gbQiUoDqcyp2jPBtrewBVT5axX4vm1PFpXfc9AzXRC",
    ];
    const commissions: any = [new BN(10), new BN(10)];

    if (!wallet.connected) {
      console.log("Wallet is not connected!");
      return;
    }

    const connection = new Connection(network, "confirmed");
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "confirmed",
    });

    const program = new Program(idl, programID, provider);
    const lpWallet = new PublicKey(NETWORK.lp_wallet);
    const founder = new PublicKey(NETWORK.founder_wallet);

    const listener = program.addEventListener(
      "PurchaseEvent",
      (event, slot) => {
        console.log("Purchase event:", event);
        console.log("Slot:", slot);
        // call purchase-package api here
      }
    );

    try {
      const response = await program.methods
        .purchasePackage(new BN(package_price * LAMPORTS_PER_SOL), commissions)
        .accounts({
          user: provider.wallet.publicKey,
          lpWallet: lpWallet,
          founder: founder,
          systemProgram: web3.SystemProgram.programId,
        })
        .remainingAccounts(
          referrals.map((key: any) => ({
            pubkey: new PublicKey(key),
            isWritable: true,
            isSigner: false,
          }))
        )
        .signers([])
        .rpc();

      console.log("purchase_package function called successfully.");
    } catch (error) {
      console.error("Error calling purchase_package:", error);
    } finally {
      // Remove listener after the transaction is confirmed
      program.removeEventListener(listener);
    }
  }

  return (
    <Box>
      <Text fontSize="32px">Packages details</Text>
      <Box p="15px" bg="#f5f5f5">
        <Image
          w="100%"
          maxH="366px"
          src="https://i.ibb.co/9HM56Zb/Rectangle-66.png"
        />
      </Box>
      <Text fontSize="32px" mt="50px" mb="20px">
        EMERALD plan
      </Text>
      <Text fontSize="16px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
      <Text fontSize="16px" mt="30px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.
      </Text>
      <Text fontSize="32px" mt="30px" mb="20px">
        Price: 10 SOL
      </Text>
      <Text fontSize="16px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
    </Box>
  );
};

export default PackageDetails;
