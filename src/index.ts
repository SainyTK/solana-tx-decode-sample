import { Connection, PartiallyDecodedInstruction } from "@solana/web3.js";
import { Idl, BorshCoder } from "@coral-xyz/anchor";
import dotenv from "dotenv";
import driftIDL from "./idl/drift.json";

dotenv.config();

async function main() {
  const endpoint = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
  const connection = new Connection(endpoint, "confirmed");
  const borshCoder = new BorshCoder(driftIDL as Idl);

  const signature = "your-transaction-signature";
  const transaction = await connection.getParsedTransaction(signature);

  const instructions = transaction?.transaction?.message?.instructions;

  if (instructions) {
    for (const instruction of instructions) {
      const decodedIx = borshCoder.instruction.decode(
        (instruction as PartiallyDecodedInstruction).data,
        "base58"
      );
      console.log(decodedIx);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
