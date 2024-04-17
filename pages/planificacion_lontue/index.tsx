import { Layout } from "@/components/Layout/Layout";
import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";
import { NextPageWithLayout } from "../_app";
import React, { ReactElement, useEffect, useState } from "react";
import { interSecondary, interTitle } from "@/styles/fonts";
import { Container } from "@/components/UI/Container/Container";
import { Dropzone } from "@/components/UI/Input/Dropzone";
import { opcionesVelocidad, opcionescapacidadMaxima } from "@/utils/options_labels";
import { Select } from "@/components/UI/Input/Select";
import { DeleteButton } from "@/components/UI/Buttons/DeleteButton";
import { EditButton } from "@/components/UI/Buttons/EditButton";
import axios from "axios";
import { toast } from "react-toastify";


const Home: NextPageWithLayout = () => {

    const [fileXlsx, setFileXlsx] = useState<File | null>(null)
    const [filePDF, setFilePDF] = useState<File | null>(null)

    const [buttonUpload, setButtonUpload] = useState(false)
    const toastIdUpload = React.useRef<string>(null)

    const [task, setTast] = useState("")
    const [maxCapacity, setMaxCapacity] = useState("")
    const [processingTime, setProcessingTime] = useState("")

    const uploadFiles = () => {

        if (fileXlsx && filePDF) {
            //toastIdUpload.current = toast.loading("Cargando los archivos al servidor")
            const formData = new FormData()

            formData.append("myfile", fileXlsx)
            formData.append("mypdf", filePDF)
            
            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/postFile`, formData)
                .then(response => {
                    
                    toast.success(`Los archivos ${fileXlsx.name} y ${filePDF.name} se subieron correctamente`)
                    setButtonUpload(true)
                })
                .catch(error => {
                    toast.error(`Error al subir los archivos. Tipo de error: ${error}`)
                })
        }
        else{
            toast.error("Se deben seleccionar los 2 archivos requeridos.")
        }
    }

    useEffect(() => {
        setMaxCapacity("")
        setProcessingTime("")
    }, [task])

    useEffect(() => {
        setButtonUpload(false)
    },[filePDF,fileXlsx])

    return (
        <>
            <h1 className={`m-4 text-3xl sm:text-4xl text-center ${interTitle.className}`}>Planificación bodega Lontué</h1>
            <Container>
                <div className="flex flex-row items-center gap-2">
                    <div className="border-[3px] border-orange-500 px-[10px] rounded-full text-orange-500 text-xl font-semibold">1</div>
                    <h2 className={`text-xl sm:text-2xl ${interTitle.className}`}>Carga de archivos</h2>
                </div>
                <div className="flex flex-col sm:flex-row w-full justify-center mt-2 sm:gap-16">
                    <div>
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Programa vendimia</h3>
                        <p className={`text-center ${interSecondary.className}`}>Solo archivo .xlsx con menos de x mb</p>
                        <Dropzone description={"Selecciona aquí para subir el archivo"} type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" setValue={setFileXlsx} />
                        
                    </div>
                    <div>
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Plan Lontué</h3>
                        <p className={`text-center ${interSecondary.className}`}>Solo archivo .pdf con menos de x mb</p>
                        <Dropzone description={"Selecciona aquí para subir el archivo"} type="application/pdf" setValue={setFilePDF} />
                        
                    </div>
                </div>
                <div className="flex flex-col justify-center w-full mt-4 items-center gap-1">
                    <ButtonPrincipal title={"Subir archivos"} action={uploadFiles} isDisable={buttonUpload}/>
                    {buttonUpload && <p className={`my-2 text-xs text-center ${interSecondary.className}`}>Selecciona otro archivo para subirlo nuevamente</p>}
                </div>

            </Container>
            <Container>
                <div className="flex flex-row items-center gap-2 mb-4">
                    <div className="border-[3px] border-orange-500 px-[10px] rounded-full text-orange-500 text-xl font-semibold">2</div>
                    <h2 className={`text-2xl ${interTitle.className}`}>Administración de maquinarias</h2>
                </div>
                <div>
                    <div className="flex flex-col gap-2 sm:gap-8">
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Agregar maquinaria</h3>
                        <form className="flex flex-col gap-4 flex-wrap sm:flex-row lg:gap-8 xl:gap-16">

                            <Select name="Tarea" value={task} setValue={setTast} list={["Despalillado", "Prensado", "Pre-flotación", "Flotación", "Fermentación"]} />

                            <Select name="Capacidad maxima" value={maxCapacity} setValue={setMaxCapacity} record={opcionescapacidadMaxima} previousValue={task} />

                            <Select name="Tiempo de procesamiento" value={processingTime} setValue={setProcessingTime} record={opcionesVelocidad} previousValue={task} />

                            <div className="flex items-end">
                                <ButtonPrincipal title="Guardar maquina" />
                            </div>

                        </form>
                    </div>
                    <div>

                    </div>
                    <div className="flex flex-col mt-8 gap-5">
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Maquinarias en el sistema</h3>
                        <div className="relative overflow-x-auto shadow-md rounded-md border">
                            <table className="w-full text-sm text-left rtl:text-right">
                                <thead className={`uppercase bg-slate-100 ${interTitle.className}`}>
                                    <tr>
                                        <th className="px-3 py-3">ID maquina</th>
                                        <th className="px-3 py-3">Tarea</th>
                                        <th className="px-3 py-3">Capacidad maxima</th>
                                        <th className="px-3 py-3">Tiempo de procesamiento</th>
                                        <th className="px-3 py-3">Estado</th>
                                        <th className="px-3 py-3">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b bg-slate-50">
                                        <th className="px-3 py-3">P_01</th>
                                        <th className="px-3 py-3">Despalillado</th>
                                        <th className="px-3 py-3">100</th>
                                        <th className="px-3 py-3">1</th>
                                        <th className="px-3 py-3">Habilitado</th>
                                        <th className="p-3 flex gap-2">
                                            <DeleteButton />
                                            <EditButton />
                                        </th>
                                    </tr>
                                    <tr className="border-b bg-slate-50">
                                        <th className="px-3 py-3">P_01</th>
                                        <th className="px-3 py-3">Despalillado</th>
                                        <th className="px-3 py-3">100</th>
                                        <th className="px-3 py-3">1</th>
                                        <th className="px-3 py-3">Habilitado</th>
                                        <th className="p-3 flex gap-2">
                                            <DeleteButton />
                                            <EditButton />
                                        </th>
                                    </tr>
                                    <tr className="border-b bg-slate-50">
                                        <th className="px-3 py-3">P_01</th>
                                        <th className="px-3 py-3">Despalillado</th>
                                        <th className="px-3 py-3">100</th>
                                        <th className="px-3 py-3">1</th>
                                        <th className="px-3 py-3">Habilitado</th>
                                        <th className="p-3 flex gap-2">
                                            <DeleteButton />
                                            <EditButton />
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </Container >
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