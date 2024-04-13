import { Layout } from "@/components/Layout/Layout";
import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";

export default function Custom404(){
    return(
        <Layout title="Pagina no encontrada" pageDescription="Error al redireccionar la pagina">
            <p>Pagina no encontrada o sitio en construccion</p>
            <ButtonPrincipal title="Regresar al inicio" goTo="/"/>
        </Layout>
    )
}