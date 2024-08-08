import Image from "next/image";
import FaucetForm from "./components/FauetForm";
import TransactionRecord from "./components/TransactionRecord";

export default function Home() {
  return (
    <main className="flex lg:px-20 sm:px-4 min-h-screen flex-col justify-center items-center">
      <FaucetForm />
      <TransactionRecord />
    </main>   
  );
}
