import { ReactElement, SetStateAction, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { Layout } from "@/components/Layout/Layout";
import { Container } from "@/components/UI/Container/Container";
import { TitleContainer } from "@/components/UI/Container/TitleContainer";
import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";
import { ItemFile } from "@/components/UI/Item/ItemFile";
import Modal from "@/components/UI/Modals/Modal";
import { Dropzone } from "@/components/UI/Input/Dropzone";
import { interSecondary, interTitle } from "@/styles/fonts";
import { Input } from "@/components/UI/Input/Input";

const Home: NextPageWithLayout = () => {

    const [openModalLoadFile, setOpenModalLoadFile] = useState(false)

    return (
        <>
            <Container>
                <TitleContainer number={1} title="Carga de archivos" />
                <div className="flex flex-row overflow-x-auto my-3">
                    <ItemFile name="Vendimia" year={2016} />
                </div>
                <div className="flex gap-2 flex-col md:flex-row mx-auto">
                    <ButtonPrincipal title={"Cargar archivo"} action={() => setOpenModalLoadFile(true)} />
                    <ButtonPrincipal title={"Descargar archivo"} />
                </div>
                <Modal open={openModalLoadFile} onClose={() => setOpenModalLoadFile(false)} action={() => { }} title="Cargar archivo" type="Input">
                    <Dropzone description={"Selecciona aquí para subir el archivo"} setValue={() => { }} type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                    <div>
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Configuración de columnas</h3>
                        <p className={`text-center ${interSecondary.className}`}>Modifique de ser necesario el nombre de la columna correspondiente a su archivo .xlsx</p>
                    </div>
                    <Input title={"Fecha de cosecha"} />
                    <Input title="Contrato"/>
                    <Input title="Productor"/>
                    <Input title="Kilos entregados"/>
                    <Input title="Densidad"/>
                    <Input title="Temperatura"/>
                    <Input title="Variedad"/>
                    <Input title="Area"/>

                </Modal>

            </Container>
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