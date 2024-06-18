import { ReactElement, useEffect, useState } from "react";
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
import { FiDownload, FiUpload } from "react-icons/fi";
import { Select } from "@/components/UI/Input/Select";
import { ButtonSecundary } from "@/components/UI/Buttons/ButtonSecundary";
import { Alert } from "@/components/UI/Alert/Alert";
import { SkeletonSelectVendimia } from "@/components/UI/Skeleton/SkeletonSelectVendimia";
import ChartAndTable from "./ChartAndTable";
import { BarRechart } from "@/components/UI/Chart/BarRechart";

type GraphicData = {
    duration: number;
    years: string;
    total: number;
    data: {
        Semana: string;
        Kilos: number;
        Years: [number, number, string, string][]
    }[];
    weeks: [number, string][]
};

const Home: NextPageWithLayout = () => {

    const [loadingFile, setLoadingFile] = useState(true)

    const [openModalLoadFile, setOpenModalLoadFile] = useState(false)

    const [listFileVendimia, setListFileVendimia] = useState<{
        name: string; year: number; data: [{
            Semana: string;
            Kilos: number;
        }]
    }[] | undefined>(undefined)

    const [file, setFile] = useState<File | null>(null)

    const [date, setDate] = useState("FECHA")
    const [contract, setContract] = useState("CONTRATO")
    const [producer, setProducer] = useState("PRODUCTOR")
    const [kilosDelivered, setKilosDeliveder] = useState("KILOS ENTREGADOS")
    const [family, setFamily] = useState("FAMILIA")
    const [area, setArea] = useState("AREA")
    const [color, setColor] = useState("COLOR VARIEDAD")
    const [rut, setRut] = useState("RUT")
    const [quality, setQuality] = useState("CALIDAD")
    const [brix, setBrix] = useState("GRADO BRIX")
    const [temperature, setTemperature] = useState("TEMPERATURA")

    const [openModalGraphic, setOpenModalGraphic] = useState(false)
    const [dataGraphic, setDataGraphic] = useState<GraphicData | undefined>(undefined);

    const [weeklyLimit, setWeeklyLimit] = useState("0")

    const [yearsSelected, setYearsSelected] = useState<number[]>()
    const [limitWeek, setLimitWeek] = useState<{ [key: number]: string }>({})
    const [factorWeek, setFactorWeek] = useState<{ [key: number]: string | undefined }>({})
    const [objKg, setObjKg] = useState("0")

    const [data, setData] = useState<{
        contract_producer: {
            AREA: string
            FAMILIA: string
            CONTRATO: number
            PRODUCTOR: string
            NUM_SEMANA: number
            KILOS_ENTREGADOS: number
        }[]
        data: {
            Semana: string;
            Kilos: number;
        }[]
        total: number;
        ranking: {
            NUM_SEMANA: number
            AREA: string
            FAMILIA: string
            KILOS_ENTREGADOS: number
            TOTAL_KILOS: number
            PORCENTAJE_PARTICIPACION: number
        }[]
        years: [number]
    } | undefined>(undefined)



    const getFileVendimia = () => {
        setLoadingFile(true)
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LOURDES_URL}/api/files/`)
            .then((response: any | JSON) => {
                setListFileVendimia(response.data)
            })
            .catch(() => {
                toast.error("Error al obtener datos de las vendimias, reintente más tarde")
            })
            .finally(() => setLoadingFile(false))
    }
    const uploadFile = () => {
        if (file) {
            const formData = new FormData()

            const data = { "FECHA": date, "CONTRATO": contract, "PRODUCTOR": producer, "KILOS ENTREGADOS": kilosDelivered, "FAMILIA": family, "AREA": area, "CALIDAD": quality, "RUT": rut, "TEMPERATURA": temperature, "GRADO BRIX": brix }

            formData.append("file", file)
            formData.append("data", JSON.stringify(data))
            if (color !== "") {
                formData.append("COLOR VARIEDAD", color)
            }
            const toastId = toast.loading("Subiendo los archivos al servidor")
            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LOURDES_URL}/api/files/upload`, formData)
                .then((response: any | JSON) => {
                    toast.success(response.data.message, { id: toastId })
                    getFileVendimia()
                    setFile(null)
                    console.log(response.data.message)
                })
                .catch((e) => {
                    console.log(e)
                    toast.error(e.response.data.error, { id: toastId })
                })
        }
    }
    const downloadFile = (path: string, fileName: string) => {
        const toastId = toast.loading("Iniciando descarga")
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LOURDES_URL}/${path}`, { responseType: 'blob' })
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
    const getVendimia = () => {
        setDataGraphic(undefined)
        const formData = new FormData();
        formData.append('years', JSON.stringify(yearsSelected));
        const toastId = toast.loading("Obteniendo datos de las vendimias seleccionadas")
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LOURDES_URL}/api/vendimia/`, formData)
            .then((response: any | JSON) => {
                toast.success("Datos de vendimias seleccionadas obtenidos con exito", { id: toastId })
                setDataGraphic(response.data);
            })
            .catch(() => {
                toast.error("Error al obtener datos de las vendimias, reintente más tarde", { id: toastId });
            });
    }
    const weeksLimit = () => {
        const weeksElements = []
        const quantityWeeks = parseInt(weeklyLimit)

        for (let i = 0; i < quantityWeeks; i++) {
            weeksElements.push(
                <Input
                    title={"Semana " + (i + 1)}
                    value={limitWeek[i]}
                    onChange={(e) => handleInputChangeLimit(i, e)}
                    id={`limit-${i.toString()}`}
                    type="out-label"
                    unit="kg"
                />
            )
        }
        if (weeksElements.length === 0) {
            return <p className=" text-sm font-light pt-5">Seleccione la duracion de la vendimia</p>
        } else {
            return weeksElements
        }

    }
    const weeksFactor = () => {

        const weeksElements = []
        const quantityWeeks = parseInt(weeklyLimit)

        for (let i = 0; i < quantityWeeks; i++) {
            weeksElements.push(
                <Input
                    title={"Semana " + (i + 1)}
                    value={factorWeek[i]}
                    onChange={(e) => handleInputChangeFactor(i, e)}
                    id={`factor-${i.toString()}`}
                    type="out-label"
                    unit="%"
                />
            )
        }
        if (weeksElements.length === 0) {
            return <p className=" text-sm font-light pt-5">Seleccione la duracion de la vendimia</p>
        } else {
            return weeksElements
        }
    }
    const handleInputChangeLimit = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const unformattedValue = event.target.value.replace(/\D/g, '');
        event.target.classList.remove("border-red-500")
        if (unformattedValue !== "") {
            const intValue = parseInt(unformattedValue, 10);
            const formattedValue = new Intl.NumberFormat("es-CL").format(intValue);
            setLimitWeek({ ...limitWeek, [id]: formattedValue });
        } else {
            setLimitWeek({ ...limitWeek, [id]: "0" });
        }
    }
    const handleInputChangeFactor = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const unformattedValue = event.target.value.replace(/\D/g, '');
        if (unformattedValue !== "") {
            const intValue = parseInt(unformattedValue, 10);
            const formattedValue = new Intl.NumberFormat("es-CL").format(intValue);
            setFactorWeek({ ...factorWeek, [id]: formattedValue });
        } else {
            const newFactorWeek = { ...factorWeek };
            delete newFactorWeek[id];
            setFactorWeek(newFactorWeek);
        }

        if (parseInt(unformattedValue) === 0) {
            event.target.classList.add("border-amber-400", "focus:border-amber-400", "focus:ring-amber-400")
        } else {
            event.target.classList.remove("border-amber-400", "focus:border-amber-400", "focus:ring-amber-400")
        }

    }
    const handleInputChangeObjKg = (value: string) => {
        console.log("hola")
        if (value !== "") {
            const unformattedValue = value.replace(/\./g, '');
            const formattedValue = new Intl.NumberFormat("es-CL").format(parseInt(unformattedValue));
            setObjKg(formattedValue)
        } else {
            setObjKg("0")
        }
    }
    const isYearInList = (year: number) => {
        let newYearsSelected = [...(yearsSelected || [])];

        if (newYearsSelected.length === 0 || !newYearsSelected.includes(year)) {
            newYearsSelected.push(year);
        } else {
            newYearsSelected = newYearsSelected.filter(x => x !== year);
        }
        if (newYearsSelected.length > 1) {
            newYearsSelected = newYearsSelected.sort((a, b) => a - b)
        }
        setYearsSelected(newYearsSelected.length > 0 ? newYearsSelected : undefined);
    }
    const startPlanning = () => {
        const inputs = Array.from(document.querySelectorAll('#weeksLimit input[type="text"]')) as HTMLInputElement[];
        let hasEmptyInputs = false
        inputs.forEach((input: HTMLInputElement) => {
            if (input.value.trim() === "") {
                input.classList.add('border-red-500')
                hasEmptyInputs = true
            } else {
                input.classList.remove('border-red-500')
            }
        })
        if (hasEmptyInputs) {
            toast.error("Complete todos los campos en la sección Limites semanales.")
            return
        }

        const formData = new FormData()
        formData.append("years", JSON.stringify(yearsSelected))
        formData.append("obj_kilos", objKg)
        formData.append("limit_week", JSON.stringify(limitWeek))
        formData.append("factor_week", JSON.stringify(factorWeek))

        formData.append("duration", weeklyLimit)

        const toastId = toast.loading("Iniciando planificación")

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_LOURDES_URL}/api/vendimia/planificacion`, formData)
            .then((response: any | JSON) => {
                toast.success(response.data.message, { id: toastId })
                setData(response.data)
                const result = document.getElementById("result")
                result?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
                console.log(response.data)
            })
            .catch((e) => {
                toast.error(e.message, { id: toastId })
            })
    }

    useEffect(() => {
        getFileVendimia()
    }, [])

    useEffect(() => {
        Object.keys(limitWeek).forEach(key => {
            if (parseInt(key) > parseInt(weeklyLimit) - 1) {
                delete limitWeek[parseInt(key)];
            }
        });
        Object.keys(factorWeek).forEach(key => {
            if (parseInt(key) > parseInt(weeklyLimit) - 1) {
                delete factorWeek[parseInt(key)];
            }
        });
    }, [weeklyLimit])

    return (
        <>
            <div className="relative w-11/12 sm:max-w-5xl h-fit">
                <h1 className={`m-4 text-3xl sm:text-4xl text-center ${interTitle.className}`}>Planificación Táctica Bodega Lourdes</h1>
                <div className=" absolute top-1/2 left-5 transform -translate-y-1/2">
                    <ButtonPrincipal goTo="/" />
                </div>
            </div>

            <Container>
                <TitleContainer number={1} title="Datos históricos" />
                <div className="flex flex-row overflow-x-auto mt-3 min-h-48 ">
                    {
                        loadingFile ? (
                            <SkeletonListFiles />
                        ) : (
                            listFileVendimia &&
                                listFileVendimia.length > 0 ? (
                                listFileVendimia.map((x) => (<ItemFile name={x.name} year={x.year} listFile={listFileVendimia} setListFile={setListFileVendimia} data={x.data} />))
                            ) :
                                (
                                    <div className="m-auto flex flex-col justify-center items-center">
                                        <h3>No hay información historica de vendimias.</h3>
                                        <p>Ir a cargar archivo para subir información de vendimias.</p>
                                    </div>
                                )
                        )
                    }

                </div>
                <Modal open={openModalLoadFile} onClose={() => setOpenModalLoadFile(false)} action={() => uploadFile()} title="Cargar archivo" type="Input">
                    <div className="md:w-[90%]">
                        <Dropzone description={"Selecciona aquí para subir el archivo"} value={file} setValue={setFile} type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                    </div>
                    <div>
                        <h3 className={`text-center text-xl ${interTitle.className}`}>Configuración de columnas</h3>
                        <p className={`text-center ${interSecondary.className}`}>Modifique, de ser necesario, el nombre de la columna correspondiente a su archivo. .xlsx</p>
                    </div>
                    <Input title={"Fecha de cosecha"} name="FECHA" value={date} setValue={setDate} />
                    <Input title={"Número de contrato"} value={contract} setValue={setContract} />
                    <Input title={"Productor"} value={producer} setValue={setProducer} />
                    <Input title={"RUT Productor"} value={rut} setValue={setRut} />
                    <Input title={"Kilos entregados"} value={kilosDelivered} setValue={setKilosDeliveder} />
                    <Input title={"Familia o variedad"} value={family} setValue={setFamily} />
                    <Input title={"Área o zona de cosecha"} value={area} setValue={setArea} />
                    <Input title={"Calidad"} value={quality} setValue={setQuality} />
                    <Input title={"Grados Brix"} value={brix} setValue={setBrix} />
                    <Input title={"Temperatura"} value={temperature} setValue={setTemperature} />

                    <div className="flex flex-col justify-center items-center gap-2">
                        <Input title={"Color variedad"} value={color} setValue={setColor} />
                        <p className="font-thin text-xs text-center w-56">Si el archivo no posee la columna, deje en blanco esta entrada</p>
                    </div>
                </Modal>

            </Container>
            <div className="flex gap-4 flex-col md:flex-row mx-auto w-full md:w-fit px-4">
                <ButtonPrincipal title={"Cargar archivo"} action={() => setOpenModalLoadFile(true)}>
                    <p className="text-white my-auto ml-3 text-xl">
                        <FiUpload />
                    </p>
                </ButtonPrincipal>
                <ButtonPrincipal title={"Descargar archivo"} action={() => downloadFile("api/files/download/Vendimia_historica.xlsx", "Vendimia_historica.xlsx")}>
                    <p className="text-white my-auto ml-3 text-xl">
                        <FiDownload />
                    </p>
                </ButtonPrincipal>
            </div>
            <Container>
                <TitleContainer number={2} title={"Configuración de vendimia"} />
                <div className="flex flex-col my-4 md:mx-4 gap-4">
                    {
                        loadingFile ? (
                            <SkeletonSelectVendimia />
                        ) : (
                            <>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <h3 className="mr-4 min-w-40 md:text-end">Seleccionar años:</h3>
                                    <div className="flex  flex-col md:flex-row gap-3 flex-wrap my-2">
                                        {
                                            listFileVendimia && listFileVendimia.length > 0 ?
                                                listFileVendimia.map((x) => (
                                                    <div className="flex items-center me-4">
                                                        <input
                                                            className="w-5 h-5 appearance-none border-2 cursor-pointer border-orange-vct/80  rounded-md mr-2 hover:border-orange-vct checked:bg-no-repeat checked:bg-center checked:border-orange-vct checked:bg-orange-vct/60 transition-colors duration-500"
                                                            type="checkbox"
                                                            value={x.year}
                                                            onChange={(x) => isYearInList(parseInt(x.target.value))} />
                                                        <label className="ms-2 text-sm font-medium text-gray-900 ">{x.year}</label>
                                                    </div>
                                                ))
                                                :
                                                <p>No hay vendimias cargadas.</p>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row w-full gap-4 justify-center">
                                    <ButtonSecundary title={dataGraphic ? "Actualizar información" : "Obtener información"} action={() => getVendimia()} isDisable={yearsSelected === undefined} messageDisable={dataGraphic ? "Actualizar información" : "Obtener información"} />
                                </div>
                            </>
                        )
                    }

                    {
                        dataGraphic &&
                        <div className="flex flex-col transition-transform translate-x-1 z-0 gap-7">
                            <div className="flex flex-col md:flex-row justify-center items-start min-h-80 bg-gray-100 border p-6 rounded-2xl shadow">
                               
                                <div className="order-first  md:order-last flex flex-col gap-2 md:mt-4">
                                    <p className="text-center font-semibold text-xl">Distribución de kilogramos históricos</p>
                                    <p>Gráfico representativo a las vendimias <span className=" font-medium">{dataGraphic?.years} </span>con un total de kilos procesados promedio de <span className=" font-medium">{dataGraphic && new Intl.NumberFormat("es-CL").format(dataGraphic.total)} kg.</span></p>
                                </div>
                                <BarRechart data={dataGraphic && dataGraphic.data} minHeight={300} />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center">
                                <h3 className="mr-4 min-w-40 md:text-end">Duración:</h3>
                                <div className="flex  flex-col md:flex-row gap-3 flex-wrap my-2">
                                    <Select name="" value={weeklyLimit} setValue={setWeeklyLimit} isDisable={yearsSelected ? false : true} list={dataGraphic?.weeks} />
                                </div>

                            </div>
                            <div className="flex flex-col md:flex-row md:items-center ">
                                <h3 className="mr-4 min-w-40 md:text-end">Kilogramos objetivos:</h3>
                                <Input
                                    title=""
                                    onChange={(e) => handleInputChangeObjKg(e.target.value)}
                                    value={objKg}
                                    unit="kg"
                                />

                            </div>

                            <div className="flex flex-col md:flex-row">
                                <h3 className="mr-4 min-w-40 md:text-end md:pt-6">Limite semanal:</h3>
                                <div className="flex flex-col">
                                    <div id="weeksLimit" className="flex  flex-col md:flex-row gap-3 flex-wrap my-2">
                                        {weeksLimit()}
                                    </div>
                                    {
                                        weeklyLimit !== "0" && weeklyLimit !== "" &&
                                        <Alert
                                            type="warning"
                                            message="Todas las entradas son obligatorias."
                                        />
                                    }
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row ">
                                <h3 className="mr-4 min-w-40 md:text-end md:pt-6">Factor semanal:</h3>
                                <div className="flex flex-col">
                                    <div className="flex  flex-col md:flex-row gap-3 flex-wrap my-2">
                                        {weeksFactor()}
                                    </div>
                                    {
                                        weeklyLimit !== "0" && weeklyLimit !== "" &&
                                        <Alert
                                            type="information"
                                            message="El ingreso de factores semanales es OPCIONAL."
                                        />

                                    }
                                </div>
                            </div>

                            <div className="mx-auto">
                                <ButtonPrincipal title={"Iniciar planificación"} action={() => startPlanning()} isDisable={weeklyLimit !== "0" && objKg > "0" ? false : true} messageDisable="Iniciar planificación" />
                            </div>
                        </div>

                    }

                </div>
            </Container>
            {
                data && <ChartAndTable data={data} />
            }
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title={"Módulo de planificación Lontué"} pageDescription={"Módulo de planificación Lontué"} linkIco="/logo-CII.svg">
            {page}
        </Layout>
    )
}

export default Home