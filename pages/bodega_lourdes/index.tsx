import { ReactElement, SetStateAction, useEffect, useState } from "react";
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
import axios from "axios";
import { toast } from "sonner";
import { SkeletonListFiles } from "@/components/UI/Skeleton/SkeletonListFiles";

const Home: NextPageWithLayout = () => {

    const [loadingFile, setLoadingFile] = useState(true)

    const [openModalLoadFile, setOpenModalLoadFile] = useState(false)

    const [listFileVendimia, setListFileVendimia] = useState<{ name: string; year: number }[] | undefined>(undefined)

    const [file, setFile] = useState<File | null>(null)

    const [date, setDate] = useState("FECHA")

    const getFileVendimia = () => {
        setLoadingFile(true)
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LOURDES_URL}/api/files/`)
            .then((response: any | JSON) => {
                setListFileVendimia(response.data)
                console.log(response.data)
            })
            .catch(() => {
                toast.error("Error al obtener datos de las vendimias, reintente más tarde")
            })
            .finally(() => setLoadingFile(false))
    }

    const uploadFile = () => {
        if (file) {
            const formData = new FormData()

            formData.append("file", file)
            formData.append("FECHA", date)


            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LOURDES_URL}/api/files/upload`, formData)
                .then((response: any | JSON) => {
                    toast.success(response.data.message)
                    getFileVendimia()
                    setFile(null)
                    console.log(response.data.message)
                })
                .catch((e) => {
                    console.log(e)
                    toast.error(e.response.data.error)
                })
        }
    }

    useEffect(() => {
        getFileVendimia()
    }, [])

    return (
        <>
            <h1 className={`m-4 text-3xl sm:text-4xl text-center ${interTitle.className}`}>Planificación táctica Bodega Lourdes</h1>
            <Container>
                <TitleContainer number={1} title="Carga de archivos" />
                <div className="flex flex-row overflow-x-auto my-3 min-h-48 ">
                    {
                        loadingFile ? (
                            <SkeletonListFiles />
                        ) : (
                            listFileVendimia &&
                                listFileVendimia.length !== 0 ? (
                                listFileVendimia.map((x) => (<ItemFile name={x.name} year={x.year} listFile={listFileVendimia} setListFile={setListFileVendimia} />))
                            ) :
                                (
                                    <div className="m-auto flex flex-col justify-center items-center">
                                        <h3>No hay informacion historica de vendimias.</h3>
                                        <p>Ir a cargar archivo para subir informacion de vendimias.</p>
                                    </div>
                                )
                        )
                    }

                </div>
                <div className="flex gap-2 flex-col md:flex-row mx-auto w-full md:w-fit">
                    <ButtonPrincipal title={"Cargar archivo"} action={() => setOpenModalLoadFile(true)} />
                    <ButtonPrincipal title={"Descargar archivo"} />
                </div>
                <Modal open={openModalLoadFile} onClose={() => setOpenModalLoadFile(false)} action={() => uploadFile()} title="Cargar archivo" type="Input">
                    <Dropzone description={"Selecciona aquí para subir el archivo"} setValue={setFile} type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                    <div>
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Configuración de columnas</h3>
                        <p className={`text-center ${interSecondary.className}`}>Modifique de ser necesario el nombre de la columna correspondiente a su archivo .xlsx</p>
                    </div>
                    <Input title={"Fecha de cosecha"} value={date} setValue={setDate} />


                </Modal>

            </Container>
            <ButtonPrincipal title={"Regresar al inicio"} goTo="/" />
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title={"Modulo de planificacion Lontué"} pageDescription={"Modulo de planificacion Lontué"} linkIco="/logo-CII.svg">
            {page}
        </Layout>
    )
}

export default Home