import Navbar from "@/components/UI/Navbar/Navbar";
import { Inter } from "next/font/google";
import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>DSS - Viña Concha y Toro</title>
      </Head>
      <Navbar/>
      <main>

      </main>
    </>

  );
}
