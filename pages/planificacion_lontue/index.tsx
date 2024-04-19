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
import Modal from "@/components/UI/Modals/Modal";


const Home: NextPageWithLayout = () => {

    const [fileXlsx, setFileXlsx] = useState<File | null>(null)
    const [filePDF, setFilePDF] = useState<File | null>(null)
    const [listMachine, setListMachine] = useState<{ habilitado: any[], deshabilitado: any[] } | null>()

    const [buttonUpload, setButtonUpload] = useState(false)
    const [buttonStartPlanning, setButtonStartPlanning] = useState(false)

    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)

    const [idMachineDelete, setIdMachineDelete] = useState("")
    const [idMachineEdit, setIdMachineEdit] = useState("")

    const [task, setTast] = useState("")
    const [maxCapacity, setMaxCapacity] = useState("")
    const [processingTime, setProcessingTime] = useState("")

    const [taskEdit, setTaskEdit] = useState("")
    const [maxCapacityEdit, setMaxCapacityEdit] = useState("")
    const [processingTimeEdit, setProcessingTimeEdit] = useState("")
    const [statusEdit, setStatusEdit] = useState("")

    //Funcion para subir los archivos al backend
    const uploadFiles = async () => {

        if (fileXlsx && filePDF) {
            const formData = new FormData()

            formData.append("myfile", fileXlsx)
            formData.append("mypdf", filePDF)

            const toastId = toast.loading("Subiendo los archibos al servidor", { theme: "colored", position: "top-center" })

            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/postFile`, formData)
                .then(() => {
                    toast.update(toastId, { render: `Los archivos ${fileXlsx.name} y ${filePDF.name} se subieron correctamente`, type: "success", isLoading: false, autoClose: 5000 })
                })
                .catch(error => {
                    toast.update(toastId, { render: `Error al subir los archivos. Tipo de error: ${error}`, type: "error", isLoading: false, autoClose: 5000 })
                })
                .finally(() => {
                    setButtonUpload(true)
                })
        }
        else {
            toast.error("Se deben seleccionar los 2 archivos requeridos.")
        }
    }

    const downloadFile = (path: string, fileName: string) => {
        const toastId = toast.loading("Iniciando descarga")
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`, { responseType: 'blob' })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName) //or any other extension
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link)
                toast.update(toastId, { render: `Descargando ${fileName}`, isLoading: false, autoClose: 5000, type: "success", theme: "colored" })
            }).catch(() => {
                toast.update(toastId, { render: `Error al desacargar ${fileName}, reintente mas tarde`, isLoading: false, autoClose: 5000, type: "error", theme: "colored" })
            })
    }
    const startPlanning = () => {
        setButtonStartPlanning(true)
        const toastId = toast.loading("Iniciando planificacion, porfavor espere un momento", { theme: "colored" })
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/iniciarPlanificacion`, { is_switch_enabled: true })
            .then(() => {
                toast.dismiss(toastId)
                downloadFile("getFileOutputModelo", "Panificacion del dia.pdf")
                downloadFile("getFileOutputResumen", "Resumen.xlsx")
            }).catch(() => {
                toast.update(toastId, { render: `Error al iniciar la planificacion, reintente mas tarde`, isLoading: false, autoClose: 5000, type: "error", theme: "colored" })
            }).finally(() => {
                setButtonStartPlanning(false)
            })

    }
    //Funcion para tranformar los datos correspondiente al tiempo de procesamineto y maxima capacidad
    const getDigit = (option: string, task: string) => {
        if (task === 'Despalillado' || task === 'Prensado') {
            const numberPoint = option.split(' ')[0]
            return numberPoint.split('.')[0]
        }
        else {
            const numberPoint = option.split(' ')[0]
            return numberPoint.split('.').join('')
        }
    };
    //Funcion para agregar maquina al sistema
    const addMachine = () => {
        if (task && maxCapacity && processingTime) {
            const toastId = toast.loading("Guardando nueva maquina")
            //se transforma el valor de la variable en uno valido para el backend a traves de la funcion getDigit ej: 1 hrs => 1 ; 10.000 kilos => 10 ; 10.000 litros => 10000
            const newMax = getDigit(maxCapacity, task)
            const newProcessing = getDigit(processingTime, task)

            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/setAgregarMaquina`, {
                tarea: task,
                capacidadMaxima: newMax,
                tiempoProcesado: newProcessing
            })
                .then((response) => {
                    setTast("")
                    getListMachine()
                    toast.update(toastId, { render: "Maquina agregada correctamente", isLoading: false, type: "success", theme: "colored", autoClose: 5000, position: "top-center" })
                })
                .catch(() => {
                    toast.update(toastId, { render: "Error al ingresar la maquina", isLoading: false, type: "error", theme: "colored", autoClose: 5000 })
                })
        } else {
            toast.warning("Completa todos los campos con valores validos para realizar la acción", { theme: "colored", position: "top-center" })
        }
    }
    //Funcion para obtener lista de maquinarias
    const getListMachine = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getListas_habilitar`)
            .then((response: any | JSON) => {
                setListMachine(response.data)
                console.log(response.data)
            })
            .catch(() => {
                toast.error("Error al obtener datos de las maquinarias, reintente mas tarde")
            })
    }
    //*** Funcion para generar dialogo de confirmacion al eliminar maquina EVALUAR EXPORTAR O CAMBIAR POR SWAL
    const modalDelete = (idMachine: string) => {
        setIdMachineDelete(idMachine)
        setOpenModalDelete(true)

    }
    const modalEdit = (idMachineEdit: string, task: string, maxCapacity: string, processingTime: string, status: string) => {
        setTaskEdit(task)
        setMaxCapacityEdit(maxCapacity)
        setProcessingTimeEdit(processingTime)
        setStatusEdit(status)
        setIdMachineEdit(idMachineEdit)
        setOpenModalEdit(true)
    }
    //Funcion para eliminar maquina
    const deleteMachine = (idMachine: string) => {

        const toastId = toast.loading(`Eliminando maquina: ${idMachine}`, { theme: "colored", position: "top-center" })
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/eliminar_maquina`, {
            maquina: idMachine
        }).then((response) => {
            toast.update(toastId, { render: `Maquina ${idMachine} eliminada correctamente`, isLoading: false, type: "success", autoClose: 5000 })
            const updatedList = listMachine
                ? {
                    habilitado: listMachine.habilitado.filter(
                        (row) => row[0] !== idMachine
                    ),
                    deshabilitado: listMachine.deshabilitado,
                }
                : null;
            setListMachine(updatedList)
        }).catch(() => {
            toast.update(toastId, { render: `Error al eliminar la maquina ${idMachine}, intente nuevamente`, isLoading: false, type: "error", autoClose: 5000 })
        })
    }
    const editMachine = (idMachineEdit: string) => {
        if (taskEdit && maxCapacityEdit && processingTimeEdit && idMachineEdit) {
            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/setModificarParametros`, {
                maquinaSeleccionada: idMachineEdit,
                capacidadMaxima: maxCapacityEdit,
                tiempoProcesado: processingTimeEdit,
                tarea: taskEdit
            }).then(() => {
                axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cambiar_estado_maquina`, {
                    maquina: idMachineEdit,
                    estado: statusEdit
                }).then(() => {
                    toast.success("Maquina modificada con exito")
                    getListMachine()
                }).catch(() => {
                    toast.error("Error al modificar la maquina")
                })
            }).catch(() => {
                toast.error("Error al modificar la maquina")
            })
        }
    }
    useEffect(() => {
        getListMachine()
    }, [])

    useEffect(() => {
        setMaxCapacity("")
        if (task === "Fermentación") {
            setProcessingTime("1")
        } else {
            setProcessingTime("")
        }
    }, [task])

    useEffect(() => {
        setButtonUpload(false)
    }, [filePDF, fileXlsx])

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
                <div className="flex flex-col  w-full mt-4 items-center gap-4 h-20">
                    <div className="flex flex-row gap-4">
                        <ButtonPrincipal title={"Subir archivos"} action={uploadFiles} isDisable={buttonUpload} messageDisable="Archivos cargados" />

                        <ButtonPrincipal title={"Descargar"} action={() => downloadFile("getFileInput", "Info-dia.xlsx")} />
                    </div>

                    {buttonUpload && <p className={`my-2 text-xs text-center ${interSecondary.className}`}>Selecciona otro archivo para subirlo nuevamente</p>}
                </div>

            </Container>
            <Container>
                <div className="flex flex-row items-center gap-2 mb-4">
                    <div className="border-[3px] border-orange-500 px-[10px] rounded-full text-orange-500 text-xl font-semibold">2</div>
                    <h2 className={`text-2xl ${interTitle.className}`}>Administración de maquinarias</h2>
                </div>
                <div className="flex flex-col justify-center items-center gap-5">
                    <div className="flex flex-col gap-2 sm:gap-8">
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Agregar maquinaria</h3>
                        <div className="flex flex-col gap-4 flex-wrap sm:flex-row lg:gap-8 xl:gap-16">

                            <Select name="Tarea" value={task} setValue={setTast} list={["Despalillado", "Prensado", "Pre-flotación", "Flotación", "Fermentación"]} />

                            <Select name="Capacidad maxima" value={maxCapacity} setValue={setMaxCapacity} record={opcionescapacidadMaxima} previousValue={task} />

                            <Select name="Tiempo de procesamiento" value={processingTime} setValue={setProcessingTime} record={opcionesVelocidad} previousValue={task} isDisable={task === "Fermentación" ? true : false} />

                            <div className="flex items-end">
                                <ButtonPrincipal title="Guardar maquina" action={addMachine} />
                            </div>

                        </div>
                    </div>
                    <div>

                    </div>
                    <div className="flex items-center flex-col mt-8 gap-5 w-full">
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Maquinarias en el sistema</h3>
                        <div className="max-h-96 overflow-auto w-full rounded-lg sm:w-fit">
                            <table className={`w-fit text-left rtl:text-right ${interTitle.className}`}>
                                <thead className={`sticky text-xs sm:text-sm top-0 overflow-x-auto  uppercase bg-slate-200 ${interTitle.className}`}>
                                    <tr>
                                        <th className="px-3 py-3">ID maquina</th>
                                        <th className="px-3 py-3">Tarea</th>
                                        <th className="px-3 py-3">Capacidad maxima</th>
                                        <th className="px-3 py-3">Tiempo de procesamiento</th>
                                        <th className="px-3 py-3 w-32">Estado</th>
                                        <th className="px-3 py-3">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="h-96 text-xs sm:text-sm">
                                    {
                                        listMachine && Array.isArray(listMachine["deshabilitado"]) &&
                                        listMachine["deshabilitado"].map((row) => (
                                            <tr className="border-b-2 bg-slate-100">
                                                <th className="px-3 py-3">{row[0]}</th>
                                                <th className="px-3 py-3">{row[5]}</th>
                                                <th className="px-3 py-3">{row[1]}</th>
                                                <th className="px-3 py-3">{row[2]} hrs</th>
                                                <th className="px-3 py-3"><p className={`px-3 py-1 text-white text-center rounded-2xl ${row[4] === "Habilitado" ? "bg-green-500/80" : "bg-red-500/80"}`}>{row[4]}</p></th>
                                                <th className="p-3 flex gap-2">
                                                    <EditButton action={() => modalEdit(row[0], row[5], row[1], row[2], row[4])} />
                                                    <DeleteButton action={() => modalDelete(row[0])} />
                                                </th>
                                            </tr>
                                        ))
                                    }
                                    {
                                        listMachine && Array.isArray(listMachine["habilitado"]) &&
                                        listMachine["habilitado"].map((row) => (
                                            <tr className="border-b-2 bg-slate-100">
                                                <th className="px-3 py-3">{row[0]}</th>
                                                <th className="px-3 py-3">{row[5]}</th>
                                                <th className="px-3 py-3">{row[1]}</th>
                                                <th className="px-3 py-3">{row[2]} hrs</th>
                                                <th className="px-3 py-3"><p className={`px-4 py-1 w-fit text-center text-white rounded-2xl ${row[4] === "Habilitado" ? "bg-green-500/80" : "bg-red-500/80"}`}>{row[4]}</p></th>
                                                <th className="p-3 flex gap-2">
                                                    <EditButton action={() => modalEdit(row[0], row[5], row[1], row[2], row[4])} />
                                                    <DeleteButton action={() => modalDelete(row[0])} />
                                                </th>
                                            </tr>
                                        ))
                                    }
                                    

                                </tbody>
                            </table>
                            <Modal open={openModalDelete} onClose={() => setOpenModalDelete(false)} action={() => deleteMachine(idMachineDelete)} type={"Delete"} message={`¿Estas seguro en eliminar la maquina ${idMachineDelete}?`} title={"Eliminar maquina"} />
                            <Modal open={openModalEdit} onClose={() => setOpenModalEdit(false)} action={() => editMachine(idMachineEdit)} type="Input" title={`Editar maquina ${idMachineDelete}`} message={`Realiza los cambios pertinente a la maquina ${idMachineEdit} :`}>
                                <Select name="Tarea" value={taskEdit} setValue={setTaskEdit} list={["Despalillado", "Prensado", "Pre-flotación", "Flotación", "Fermentación"]} />
                                <Select name="Capacidad maxima" value={maxCapacityEdit} setValue={setMaxCapacityEdit} record={opcionescapacidadMaxima} previousValue={taskEdit} />
                                <Select name="Tiempo de procesamiento" value={processingTimeEdit} setValue={setProcessingTimeEdit} record={opcionesVelocidad} isDisable={taskEdit === "Fermentación" ? true : false} previousValue={taskEdit} />
                                <Select name="Estado" value={statusEdit} setValue={setStatusEdit} list={["Habilitado", "Deshabilitado"]} />
                            </Modal>
                        </div>
                    </div>
                    <ButtonPrincipal title={"Iniciar planificacion"} action={startPlanning} isDisable={buttonStartPlanning} messageDisable="Iniciando planificacion" />

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