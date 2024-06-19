import { Alert } from "@/components/UI/Alert/Alert";
import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";
import { ButtonSecundary } from "@/components/UI/Buttons/ButtonSecundary";
import { BarRechart } from "@/components/UI/Chart/BarRechart";
import { Container } from "@/components/UI/Container/Container";
import { TitleContainer } from "@/components/UI/Container/TitleContainer";
import { Select } from "@/components/UI/Input/Select";
import Modal from "@/components/UI/Modals/Modal";
import axios from "axios";
import { FC, useEffect, useState } from "react"
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { toast } from "sonner";

interface Props {
    data: {
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
    } | undefined
}


const ChartAndTable: FC<Props> = ({
    data
}) => {
    const [selectedWeek, setSelectedWeek] = useState<number | undefined>(undefined);
    const [kilosWeek, setKilosWeek] = useState(0)
    const [selectFamily, setSelectFamily] = useState("")
    const [filter, setFilter] = useState<string[]>()

    const [openModalDetails, setOpenModalDetails] = useState(false)
    const [dataDetails, setDataDetails] = useState<{
        AREA: string
        FAMILIA: string
        list: {
            CONTRATO: number
            PRODUCTOR: string
            NUM_SEMANA: number
            KILOS_ENTREGADOS: number
        }[]
    } | undefined>(undefined)



    const [dataweek, setDataWeek] = useState<{
        NUM_SEMANA: number;
        AREA: string;
        FAMILIA: string;
        KILOS_ENTREGADOS: number;
        TOTAL_KILOS: number;
        PORCENTAJE_PARTICIPACION: number;
    }[] | undefined>(undefined)

    const [filterDataWeek, setFilterDataWeek] = useState<{
        NUM_SEMANA: number;
        AREA: string;
        FAMILIA: string;
        KILOS_ENTREGADOS: number;
        TOTAL_KILOS: number;
        PORCENTAJE_PARTICIPACION: number;
    }[] | undefined>(undefined)


    const detailsModal = (numWeek: number, area: string, family: string) => {
        console.log(data)
        if (data !== undefined && data.contract_producer) {
            const contractProducer = data.contract_producer;

            const newContractProducer = contractProducer?.filter((x) => x.NUM_SEMANA === numWeek && x.AREA === area && x.FAMILIA === family);

            setDataDetails({
                AREA: area,
                FAMILIA: family,
                list: newContractProducer.map(({ CONTRATO, PRODUCTOR, NUM_SEMANA, KILOS_ENTREGADOS }) => ({
                    CONTRATO,
                    PRODUCTOR,
                    NUM_SEMANA,
                    KILOS_ENTREGADOS
                }))
            });

            setOpenModalDetails(true);
        } else {
            toast.error("No se pudo recuperar la información");
        }
    }
    const downloadFile = () => {
        const toastId = toast.loading("Iniciando descarga")
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LOURDES_URL}/api/vendimia/download/`, { responseType: 'blob' })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', "Resumen-planificacion.xlsx")
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link)
                toast.success(`Descargando resumen de la planificación generada`, { id: toastId })
            }).catch(() => {
                toast.error(`Error al desacargar la planificación, reintente mas tarde`, { id: toastId })
            })
    }

    useEffect(() => {
        if (selectedWeek && data) {
            const ranking = data.ranking
            const newDataWeek = ranking.filter((x) => x.NUM_SEMANA === selectedWeek)
            setDataWeek(newDataWeek)
            const selectDataWeek = data.data[selectedWeek - 1]
            setKilosWeek(selectDataWeek.Kilos)

            const family: string[] = []

            for (let i = 0; i < newDataWeek.length; i++) {
                if (!family.includes(newDataWeek[i].FAMILIA)) {
                    family.push(newDataWeek[i].FAMILIA);
                }
            }
            setFilter(family)

        }
    }, [selectedWeek])
    useEffect(() => {
        if (dataweek) {
            if (selectFamily === "") {
                console.log(dataweek)
                setFilterDataWeek(dataweek)
            }
            else {
                const newFilterDataWeek = dataweek.filter((x) => x.FAMILIA === selectFamily)
                setFilterDataWeek(newFilterDataWeek)
                console.log(filterDataWeek)
            }
        }
    }, [selectFamily, dataweek])


    return (
        <Container>
            <TitleContainer number={3} title={"Resultados de planificación"} />
            <div className="min-h-[400px] w-full" id="result">
                {
                    data && (
                        <div className="flex flex-col gap-8 items-center lg:w-[800px] mx-auto">
                            <h2 className="text-center text-xl font-semibold mt-4">Gráfico de distribución de kilos</h2>

                            <BarRechart data={data.data} setSelectedWeek={setSelectedWeek} minHeight={450} />
                            <div className="w-full md:px-4 bg-gray-100 border p-6 rounded-2xl shadow mt-4">
                                <h2 className="text-center text-xl font-semibold mb-7">Resumen planificación</h2>
                                <div className="flex flex-col md:flex-row md:justify-between">
                                    <p className="font-medium text-center w-fit">Total kilos planificados: <span className=" font-normal">{new Intl.NumberFormat("es-CL").format(data.total)} kg</span></p>
                                    <p className="font-medium text-center w-fit">Años de vendimia: <span className=" font-normal">{data.years.toString().replaceAll(",", " - ")}</span></p>
                                </div>
                                {
                                    selectedWeek &&
                                    <div className="flex flex-col md:flex-row md:justify-between mt-4">
                                        <p className="font-medium text-center w-fit">Semana seleccionada: <span className="font-normal">{selectedWeek}</span></p>
                                        <p className="font-medium text-center w-fit">Kilos a cosechar: <span className="font-normal">{new Intl.NumberFormat("es-CL").format(Math.round(kilosWeek))} kg</span></p>
                                    </div>
                                }
                            </div>
                            <h2 className="text-center text-xl font-semibold mt-4">Tabla de participación</h2>

                            {
                                dataweek && selectedWeek ? (
                                    <div className="w-full">

                                        <div className="flex md:flex-row items-center gap-2 p-2 text-xs justify-end">
                                            <p>Flitro por variedad</p>
                                            <Select name={""} value={selectFamily} setValue={setSelectFamily} list={filter} defaultValue="TODOS" />
                                        </div>

                                        <div className="flex justify-center my-2 rounded-2xl overflow-auto w-full md:w-fit max-h-[480px] border shadow-sm">
                                            <table className=" table-auto md:table-fixed w-fit md:w-full overflow-y-auto text-left lg:w-[800px]">
                                                <thead className="text-sm sticky top-0 overflow-x-scroll">
                                                    <tr className="border-b bg-gray-100 leading-none">
                                                        <th className="p-4 font-semibold">Variedad</th>
                                                        <th className="p-4 font-semibold">Área</th>
                                                        <th className="p-4 font-semibold">Kilos históricos</th>
                                                        <th className="p-4 font-semibold">Participación</th>
                                                        <th className="p-4 "></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        filterDataWeek?.map(({ AREA, FAMILIA, KILOS_ENTREGADOS, PORCENTAJE_PARTICIPACION }, index) => {
                                                            const classes = "p-4 border-b border-gray-1000 text-sm"
                                                            return (
                                                                <tr>
                                                                    <td className={classes}>{FAMILIA}</td>
                                                                    <td className={classes}>{AREA}</td>
                                                                    <td className={classes}>{KILOS_ENTREGADOS}</td>
                                                                    <td className={classes}>{PORCENTAJE_PARTICIPACION}%</td>
                                                                    <td className="border-b border-gray-1000 px-2">
                                                                        <ButtonSecundary title="Ver detalle" action={() => detailsModal(selectedWeek, AREA, FAMILIA)} />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                ) : (
                                    <Alert message="Seleccione una semana para visualizar la tabla" type="information" />
                                )
                            }
                            <div className="w-full flex flex-row justify-end mt-4">
                                <ButtonPrincipal title="Exportar" bgColor="bg-green-600 hover:bg-green-700" action={()=>downloadFile()}>
                                    <PiMicrosoftExcelLogoFill className="text-white ml-2 text-2xl" />
                                </ButtonPrincipal>
                            </div>
                            <Modal open={openModalDetails} onClose={() => setOpenModalDetails(false)} title="Información" action={() => { }} type="information">
                                <div className="flex flex-col w-fit gap-6">
                                    <div className="flex flex-row justify-between px-4">
                                        <div className="flex flex-row items-center gap-2">
                                            <p className=" font-medium text-lg">Área:</p>
                                            <p>{dataDetails?.AREA}</p>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <p className=" font-medium text-lg">Variedad:</p>
                                            <p>{dataDetails?.FAMILIA}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center my-2 rounded-2xl overflow-auto w-full md:w-fit max-h-[300px] border shadow-sm">
                                        <table className=" table-auto w-fit md:w-full overflow-y-auto text-left lg:w-[700px]">
                                            <thead className="text-sm sticky top-0 overflow-x-scroll">
                                                <tr className="border-b bg-gray-100 leading-none">
                                                    <th className="p-4 font-semibold">Contrato</th>
                                                    <th className="p-4 font-semibold">Productor</th>
                                                    <th className="p-4 font-semibold">Kilos cosechados</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dataDetails?.list.map(({ CONTRATO, PRODUCTOR, KILOS_ENTREGADOS }, index) => {
                                                        const classes = "p-4 border-b border-gray-1000 text-sm"
                                                        return (
                                                            <tr>
                                                                <td className={classes}>{CONTRATO}</td>
                                                                <td className={classes}>{PRODUCTOR}</td>
                                                                <td className={classes}>{KILOS_ENTREGADOS}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </Modal>
                        </div>
                    )
                }
            </div>
        </Container>

    )
}

export default ChartAndTable