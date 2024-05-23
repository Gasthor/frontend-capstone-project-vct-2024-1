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
import { toast } from "sonner";
import Modal from "@/components/UI/Modals/Modal";
import { Skeleton } from "@/components/UI/Skeleton/Skeleton";
import { TitleContainer } from "@/components/UI/Container/TitleContainer";


const Home: NextPageWithLayout = () => {

    const [fileXlsx, setFileXlsx] = useState<File | null>(null)
    const [filePDF, setFilePDF] = useState<File | null>(null)
    const [listMachine, setListMachine] = useState<{ habilitado: any[], deshabilitado: any[] } | null>()
    const [listMachineFilter, setListMachineFilter] = useState<{ habilitado: any[], deshabilitado: any[] } | null>()
    const [filter, setFilter] = useState("")


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

            const toastId = toast.loading("Subiendo los archivos al servidor")

            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/postFile`, formData)
                .then(() => {
                    setButtonUpload(true)
                    toast.success(`Los archivos ${fileXlsx.name} y ${filePDF.name} se subieron correctamente`, { id: toastId })
                    downloadFile("getFileInput", "Info-dia.xlsx")
                })
                .catch(() => {
                    toast.error(`Error al subir los archivos. Tipo de error:`, { id: toastId })
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
                link.setAttribute('download', fileName)
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link)
                toast.success(`Descargando ${fileName}`, { id: toastId })
            }).catch(() => {
                toast.error(`Error al desacargar ${fileName}, reintente mas tarde`, { id: toastId })
            })
    }

    const startPlanning = () => {
        setButtonStartPlanning(true)
        const toastId = toast.loading("Iniciando planificacion, porfavor espere un momento")
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/iniciarPlanificacion`, { is_switch_enabled: true })
            .then(() => {
                toast.dismiss(toastId)
                downloadFile("getFileOutputModelo", "Programación del dia.pdf")
                downloadFile("getFileOutputResumen", "Resumen.xlsx")
            }).catch(() => {
                toast.error(`Error al iniciar la programación, reintente mas tarde`, { id: toastId })
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
            const toastId = toast.loading("Guardando nueva máquina")
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
                    toast.success("Máquina agregada correctamente", { id: toastId })
                })
                .catch(() => {
                    toast.error("Error al ingresar la máquina", { id: toastId })
                })
        } else {
            toast.warning("Completa todos los campos con valores válidos para realizar la acción")
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
                toast.error("Error al obtener datos de las maquinarias, reintente más tarde")
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

        const toastId = toast.loading(`Eliminando maquina ${idMachine}`)
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/eliminar_maquina`, {
            maquina: idMachine
        }).then(() => {
            toast.success(`Máquina ${idMachine} eliminada correctamente`, { id: toastId })
            const updatedList = listMachine
                ? {
                    habilitado: listMachine.habilitado.filter(
                        (row) => row[0] !== idMachine
                    ),
                    deshabilitado: listMachine.deshabilitado.filter(
                        (row) => row[0] !== idMachine
                    )
                }
                : null;
            setListMachine(updatedList)
        }).catch(() => {
            toast.error(`Error al eliminar la máquina ${idMachine}, intente nuevamente`, { id: toastId })
        })
    }
    const editMachine = (idMachineEdit: string) => {
        const toastId = toast.loading(`Guardando cambios de la maquina ${idMachineEdit}`)
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
                    toast.success(`Máquina ${idMachineEdit} actualizada`, { id: toastId })
                    getListMachine()
                }).catch(() => {
                    toast.error(`Error al guardar los cambios de ${idMachineEdit}, intente nuevamente`, { id: toastId })
                })
            }).catch(() => {
                toast.error(`Error al guardar los cambios de ${idMachineEdit}, intente nuevamente`, { id: toastId })
            })
        }
    }
    useEffect(() => {
        getListMachine()
        setListMachineFilter(listMachineFilter)
        console.log(listMachineFilter)

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

    useEffect(() => {
        if (listMachine) {
            console.log(filter)

            if (filter === "") {
                console.log()
                setListMachineFilter(listMachine)
            } else {
                const updatedList = {
                    habilitado: listMachine.habilitado.filter(
                        (row) => row[5] === filter
                    ),
                    deshabilitado: listMachine.deshabilitado.filter(
                        (row) => row[5] === filter
                    )
                };
                setListMachineFilter(updatedList);
            }
        } else {
            setListMachineFilter(null);
        }
    }, [filter, listMachine]);

    return (
        <>
            <h1 className={`m-4 text-3xl sm:text-4xl text-center ${interTitle.className}`}>Programación bodega Lontué</h1>
            <Container>
                <TitleContainer number={1} title="Carga de archivos" />
                <div className="flex flex-col sm:flex-row w-full justify-center mt-2 sm:gap-16">
                    <div className="w-full max-w-sm">
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Programa vendimia</h3>
                        <p className={`text-center ${interSecondary.className}`}>Solo archivo .xlsx con menos de 5 mb</p>
                        <Dropzone description={"Selecciona aquí para subir el archivo"} type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" setValue={setFileXlsx} />

                    </div>
                    <div className="w-full max-w-sm">
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Plan Lontué</h3>
                        <p className={`text-center ${interSecondary.className}`}>Solo archivo .pdf con menos de 5 mb</p>
                        <Dropzone description={"Selecciona aquí para subir el archivo"} type="application/pdf" setValue={setFilePDF} />

                    </div>
                </div>
                <div className="flex flex-col w-full mt-4 items-center gap-4 h-32 sm:h-20">
                    <div className="flex flex-col sm:justify-center w-full sm:flex-row gap-4">
                        <ButtonPrincipal title={"Cargar archivos"} action={uploadFiles} isDisable={buttonUpload} messageDisable="Archivos cargados" />

                        <ButtonPrincipal title={"Descargar archivos"} action={() => downloadFile("getFileInput", "Info-dia.xlsx")} />
                    </div>

                    {buttonUpload && <p className={`my-2 text-xs text-center ${interSecondary.className}`}>Selecciona otro archivo para subirlo nuevamente</p>}
                </div>

            </Container>
            <Container>
                <TitleContainer number={2} title="Administración de maquinarias" />
                <div className="flex flex-col justify-center items-center gap-5">
                    <div className="flex flex-col w-full gap-2 sm:gap-8">
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Agregar maquinaria</h3>
                        <div className="flex flex-col md:justify-between lg:justify-center gap-4 flex-wrap sm:flex-row lg:gap-5 xl:gap-8">

                            <Select name="Tarea" value={task} setValue={setTast} list={["Despalillado", "Prensado", "Pre-flotación", "Flotación", "Fermentación"]} />

                            <Select name="Capacidad máxima" value={maxCapacity} setValue={setMaxCapacity} record={opcionescapacidadMaxima} previousValue={task} />

                            <Select name="Tiempo de procesamiento" value={processingTime} setValue={setProcessingTime} record={opcionesVelocidad} previousValue={task} isDisable={task === "Fermentación" ? true : false} />

                            <div className="flex items-end">
                                <ButtonPrincipal title="Guardar máquina" action={addMachine} />
                            </div>

                        </div>
                    </div>
                    <div>

                    </div>




                    <div className="flex items-center flex-col mt-8 gap-5 w-full lg:w-fit mx-auto">
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Maquinarias en el sistema</h3>
                        <div className="flex flex-col items-center gap-4 -auto w-full mx-auto overflow-y-auto">
                            {listMachine &&
                                <div className="flex flex-row items-center justify-center ml-auto gap-4  w-fit">
                                    <p className={`my-auto text-center text-sm ${interSecondary.className}`}>Tarea:</p>

                                    <Select name="" sm={true} value={filter} setValue={setFilter} list={["Despalillado", "Prensado", "Pre-flotación", "Flotación", "Fermentación"]} defaultValue="Todos" />
                                </div>
                            }


                            <div className=" max-h-96 overflow-auto w-full rounded-lg lg:w-fit">
                                {
                                    listMachine ? (
                                        <table className={`w-fit text-left rtl:text-right ${interTitle.className}`}>
                                            <thead className={`sticky text-xs sm:text-sm top-0 overflow-x-auto  uppercase bg-slate-200 ${interTitle.className}`}>
                                                <tr>
                                                    <th className="px-3 py-3">ID máquina</th>
                                                    <th className="px-3 py-3">Tarea</th>
                                                    <th className="px-3 py-3">Capacidad máxima</th>
                                                    <th className="px-3 py-3">Tiempo de procesamiento</th>
                                                    <th className="px-3 py-3 w-32">Estado</th>
                                                    <th className="px-3 py-3">Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody className="max-h-96 text-xs sm:text-sm">
                                                {
                                                    listMachineFilter && Array.isArray(listMachineFilter["deshabilitado"]) &&
                                                    listMachineFilter["deshabilitado"].map((row) => (
                                                        <tr className="border-b-2 bg-slate-100">
                                                            <th className="px-3 py-3">{row[0]}</th>
                                                            <th className="px-3 py-3">{row[5]}</th>
                                                            <th className="px-3 py-3">{row[1]}{row[5] === "Despalillado" || row[5] === "Prensado" ? ".000 Kilos" : ".000 Litros"}</th>
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
                                                    listMachineFilter && Array.isArray(listMachineFilter["habilitado"]) &&
                                                    listMachineFilter["habilitado"].map((row) => (
                                                        <tr className="border-b-2 bg-slate-100">
                                                            <th className="px-3 py-3">{row[0]}</th>
                                                            <th className="px-3 py-3">{row[5]}</th>
                                                            <th className="px-3 py-3">{row[1]}{row[5] === "Despalillado" || row[5] === "Prensado" ? ".000 Kilos" : " Litros"}</th>
                                                            <th className="px-3 py-3">{row[2]} hrs</th>
                                                            <th className="px-3 py-3"><p className={`px-4 py-1 mx-auto w-fit text-center text-white rounded-2xl ${row[4] === "Habilitado" ? "bg-green-500/90" : "bg-red-500/90"}`}>{row[4]}</p></th>
                                                            <th className="p-3 flex gap-2">
                                                                <EditButton action={() => modalEdit(row[0], row[5], row[1], row[2], row[4])} />
                                                                <DeleteButton action={() => modalDelete(row[0])} />
                                                            </th>
                                                        </tr>
                                                    ))
                                                }


                                            </tbody>
                                        </table>
                                    ) : (
                                        <Skeleton />
                                    )
                                }

                                <Modal open={openModalDelete} onClose={() => setOpenModalDelete(false)} action={() => deleteMachine(idMachineDelete)} type={"Delete"} message={`¿Estas seguro que quieres eliminar la máquina ${idMachineDelete}?`} title={"Eliminar máquina"} />
                                <Modal open={openModalEdit} onClose={() => setOpenModalEdit(false)} action={() => editMachine(idMachineEdit)} type="Input" title={`Editar máquina ${idMachineDelete}`} message={`Realiza los cambios correspondientes a la máquina ${idMachineEdit} :`}>
                                    <Select name="Tarea" value={taskEdit} setValue={setTaskEdit} list={["Despalillado", "Prensado", "Pre-flotación", "Flotación", "Fermentación"]} />
                                    <Select name="Capacidad máxima" value={maxCapacityEdit} setValue={setMaxCapacityEdit} record={opcionescapacidadMaxima} previousValue={taskEdit} />
                                    <Select name="Tiempo de procesamiento" value={processingTimeEdit} setValue={setProcessingTimeEdit} record={opcionesVelocidad} isDisable={taskEdit === "Fermentación" ? true : false} previousValue={taskEdit} />
                                    <Select name="Estado" value={statusEdit} setValue={setStatusEdit} list={["Habilitado", "Deshabilitado"]} />
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <ButtonPrincipal title={"Iniciar programación"} action={startPlanning} isDisable={buttonStartPlanning} messageDisable="Iniciando programación" />

                </div>

            </Container >
            <ButtonPrincipal title={"Regresar al inicio"} goTo="/" />
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title={"Programación diaria Lontué"} pageDescription={"Modulo de progamación de vendimia en la bodega Lontué"} linkIco="/OpEno.png">
            {page}
        </Layout>
    )
}

export default Home