import { Layout } from "@/components/Layout/Layout";
import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";
import { Poppins } from "next/font/google";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const Home: NextPageWithLayout = () => {
    return (
        <>
            <h1 className={`m-4 text-4xl ${poppins.className}`}>Planificación bodega Lontué</h1>
            <ButtonPrincipal title={"Regresar al inicio"} goTo="/" />
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title={"Modulo de planificacion Lontué"} pageDescription={"Modulo de planificacion Lontué"}>
            {page}
        </Layout>
    )
}

export default Home