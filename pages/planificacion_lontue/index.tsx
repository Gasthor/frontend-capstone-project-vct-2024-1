import { Layout } from "@/components/Layout/Layout";
import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useState } from "react";
import { interSecondary, interTitle } from "@/styles/fonts";
import { Container } from "@/components/UI/Container/Container";
import { Dropzone } from "@/components/UI/Input/Dropzone";


const Home: NextPageWithLayout = () => {

    const [fileXlsx, setFileXlsx] = useState<File | null>(null)
    const [filePDF, setFilePDF] = useState<File | null>(null)

    const uploadFiles = () => {
        console.log("hola")
        console.log(fileXlsx)
        console.log(filePDF)
    }

    return (
        <>
            <h1 className={`m-4 text-3xl sm:text-4xl text-center ${interTitle.className}`}>Planificación bodega Lontué</h1>
            <Container>
                <div className="flex flex-row items-center gap-2">
                    <div className="border-[3px] border-orange-500 px-[10px] rounded-full text-orange-500 text-xl font-semibold">1</div>
                    <h2 className={`text-xl sm:text-2xl ${interTitle.className}`}>Carga de archivos</h2>
                </div>
                <div className="flex flex-col sm:flex-row w-full justify-center mt-2 sm:gap-8">
                    <div>
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Programa vendimia</h3>
                        <Dropzone description={"Selecciona aqui para subir el archivo"} type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" setValue={setFileXlsx} />
                    </div>
                    <div>
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Plan Lontué</h3>
                        <Dropzone description={"Selecciona aqui para subir el archivo"} type="application/pdf" setValue={setFilePDF} />
                    </div>
                </div>
                <div className="flex flex-col justify-center w-full items-center gap-1">
                    <h4 className={`text-center text-lg ${interTitle.className}`}>Archivos selecionados:</h4>
                    <p className={`text-sm text-center ${interSecondary.className}`}>{fileXlsx?.name}</p>
                    <p className={`text-sm text-center ${interSecondary.className}`}>{filePDF?.name}</p>
                    <ButtonPrincipal title={"Subir archivos"} action={uploadFiles} />
                </div>

            </Container>
            <Container>
                <div className="flex flex-row items-center gap-2">
                    <div className="border-[3px] border-orange-500 px-[10px] rounded-full text-orange-500 text-xl font-semibold">2</div>
                    <h2 className={`text-2xl ${interTitle.className}`}>Administración de maquinarias</h2>
                </div>
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