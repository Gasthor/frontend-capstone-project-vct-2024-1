import { ButtonSecundary } from "@/components/UI/Buttons/ButtonSecundary";
import { BarRechart } from "@/components/UI/Chart/BarRechart";
import { Container } from "@/components/UI/Container/Container";
import { TitleContainer } from "@/components/UI/Container/TitleContainer";
import { FC, useEffect, useState } from "react"

interface Props {
    data: {
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
    } | undefined
}


export const ChartAndTable: FC<Props> = ({
    data
}) => {
    const [selectedWeek, setSelectedWeek] = useState<number | undefined>(undefined);

    const [dataweek, setDataWeek] = useState<{
        NUM_SEMANA: number;
        AREA: string;
        FAMILIA: string;
        KILOS_ENTREGADOS: number;
        TOTAL_KILOS: number;
        PORCENTAJE_PARTICIPACION: number;
    }[] | undefined>(undefined)

    useEffect(() => {
        if (selectedWeek && data) {
            const ranking = data.ranking
            const newDataWeek = ranking.filter((x) => x.NUM_SEMANA === selectedWeek)
            setDataWeek(newDataWeek)
        }
    }, [selectedWeek])


    return (
        <Container>
                <TitleContainer number={3} title={"Resultados de planificación"} />
                <div className="min-h-[400px] w-full px-8">
                    {
                        data && (
                            <div className="flex flex-col gap-4 items-center">
                                <BarRechart data={data.data} setSelectedWeek={setSelectedWeek} />

                                <p>Semana seleccionada: {selectedWeek && selectedWeek + 1}</p>
                                <div className="w-full">
                                    <p className="font-medium text-center w-fit">Total kilos planificados: <span className=" font-normal">{new Intl.NumberFormat("es-CL").format(data.total)} kg</span></p>
                                </div>
                                {
                                    dataweek ? (
                                        <div className="flex justify-center my-4 rounded-2xl overflow-auto w-full md:w-fit max-h-96 border shadow-sm">
                                            <table className="table-auto w-fit overflow-y-auto text-left md:w-[800px]">
                                                <thead className="text-sm sticky top-0 overflow-x-scroll">
                                                    <tr className="border-b bg-gray-100 leading-none">
                                                        <th className="p-4">Variedad</th>
                                                        <th className="p-4">Area</th>
                                                        <th className="p-4">Kilos historicos</th>
                                                        <th className="p-4">Participacion</th>
                                                        <th className="p-4"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dataweek.map(({ AREA, FAMILIA, KILOS_ENTREGADOS, PORCENTAJE_PARTICIPACION }, index) => {
                                                            const classes = "p-4 border-b border-gray-1000 text-sm"
                                                            return (
                                                                <tr>
                                                                    <td className={classes}>{AREA}</td>
                                                                    <td className={classes}>{FAMILIA}</td>
                                                                    <td className={classes}>{KILOS_ENTREGADOS}</td>
                                                                    <td className={classes}>{PORCENTAJE_PARTICIPACION}%</td>
                                                                    <td className="border-b border-gray-1000 px-2">
                                                                        <ButtonSecundary title="Ver detalle" />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p>Seleccione una semana para visualizar la tabla</p>
                                    )
                                }




                            </div>
                        )
                    }
                </div>
            </Container>

    )
}