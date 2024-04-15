import { Layout } from "@/components/Layout/Layout";
import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useState } from "react";
import { interSecondary, interTitle } from "@/styles/fonts";
import { Container } from "@/components/UI/Container/Container";
import { Dropzone } from "@/components/UI/Input/Dropzone";
import { opcionesVelocidad, opcionescapacidadMaxima } from "@/utils/options_labels";

const Home: NextPageWithLayout = () => {

    const [fileXlsx, setFileXlsx] = useState<File | null>(null)
    const [filePDF, setFilePDF] = useState<File | null>(null)

    const [task, setTast] = useState("")
    const [maxCapacity, setMaxCapacity] = useState("")
    const [processingTime, setProcessingTime] = useState("")

    const uploadFiles = () => {
        console.log("hola")
        console.log(fileXlsx)
        console.log(filePDF)
    }

    const handleSelectChangeTask = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTast(e.target.value)
        setMaxCapacity("")
        setProcessingTime("")
    }

    const handleSelectChangeMaxCapacity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMaxCapacity(e.target.value)
        setProcessingTime("")
    }

    const handleSelectChangeProcessingTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProcessingTime(e.target.value)
    }

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
                <div>
                    <div className="flex flex-col sm:flex-row gap-16">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Tarea</label>
                            <select className="border p-2 rounded-lg" value={task} onChange={handleSelectChangeTask}>
                                <option value="">Seleccione una opcion</option>
                                <option value="Despalillado">Despalillado</option>
                                <option value="Prensado">Prensado</option>
                                <option value="Pre-flotación">Pre-flotacion</option>
                                <option value="Flotación">Flotación</option>
                                <option value="Fermentación">Fermentación</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Capacidad Maxima</label>
                            <select className="border p-2 rounded-lg" value={maxCapacity} onChange={handleSelectChangeMaxCapacity} >
                                {task ? (
                                    opcionescapacidadMaxima[task].map((option, index) => (
                                        <option value={option}>
                                            {option}
                                        </option>
                                    ))
                                ) : (
                                    <option>Seleccione una tarea</option>
                                )}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Tiempo de procesamiento</label>
                            <select className="border p-2 rounded-lg" value={processingTime} onChange={handleSelectChangeProcessingTime}>
                                {task ? (
                                    opcionesVelocidad[task].map((option, index) => (
                                        <option value={option}>
                                            {option}
                                        </option>
                                    ))
                                ) : (
                                    <option>Seleccione una tarea</option>
                                )}
                            </select>
                            {task}
                            {maxCapacity}
                            {processingTime}
                        </div>
                        <div className="flex items-end">
                            <ButtonPrincipal title="Guardar maquina" />
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