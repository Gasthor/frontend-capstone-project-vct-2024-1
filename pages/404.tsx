import { Layout } from "@/components/Layout/Layout";
import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";
import { NextPageWithLayout } from "./_app";
import { pages } from "next/dist/build/templates/app-page";
import { ReactElement } from "react";

const Custom404: NextPageWithLayout = () => {
    return (
        <>
            <p>Pagina no encontrada o sitio en construccion</p>
            <ButtonPrincipal title="Regresar al inicio" goTo="/" />
        </>
    )
}

Custom404.getLayout = function getLayout(page : ReactElement){
    return(
        <Layout title="Pagina no encontrada" pageDescription="Error al redireccionar la pagina" linkIco="/logo-CII.svg">
            {page}
        </Layout>
    )
}
export default Custom404