import { Layout } from "@/components/Layout/Layout";
import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { interTitle } from "@/styles/fonts";


const Home: NextPageWithLayout = () => {
    return (
        <>
            <h1 className={`m-4 text-4xl ${interTitle.className}`}>Planificación bodega Lontué</h1>
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