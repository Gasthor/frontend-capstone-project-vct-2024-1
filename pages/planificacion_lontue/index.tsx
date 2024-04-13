import { Layout } from "@/components/Layout/Layout";
import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function Home(){

    return(
        <Layout title={"Modulo de planificacion Lontué"} pageDescription={"Modulo de planificacion Lontué"}>
            <h1 className={`m-4 text-4xl ${poppins.className}`}>Planificación bodega Lontué</h1>
            <ButtonPrincipal title={"Regresar al inicio"} goTo="/"/>

        </Layout>
    )
}