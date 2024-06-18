import { FC, useState } from "react";
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Rectangle, BarChart } from "recharts";

interface Props {
    data: {
        Semana: string;
        Kilos: number;
        Years?: [number, number, string, string][]


    }[] | undefined
    setSelectedWeek?: React.Dispatch<React.SetStateAction<number | undefined>>
    minHeight: number
}

interface CustomTooltip {
    data?: {
        Semana: string;
        Kilos: number;
        Years?: [number, number, string, string][]
    }[] | undefined
    label?: number
    active?: boolean;
    payload?: { value: number }[];
}

export const BarRechart: FC<Props> = ({
    data,
    setSelectedWeek,
    minHeight
}) => {

    const formatNumberTooltip = (number: number): string => {
        const numberRounded = Math.round(number)
        return numberRounded.toLocaleString('es-ES') + " kg";
    }
    const formatNumber = (number: number): string => {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + ' M'
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'k'
        } else {
            return number.toString()
        }
    }
    const formatTooltipValue = (value: string | number | (string | number)[]): string => {
        if (Array.isArray(value)) {
            return value.map(v => (typeof v === 'number' ? formatNumber(v) : v)).join(', ')
        }
        return typeof value === 'number' ? formatNumberTooltip(value) : value
    }
    const formatTooltipLabel = (label: string): string => {
        return `Semana ${label}`
    }
    const [tickFontSize, setTickFontSize] = useState(12);
    const handleResize = () => {
        if (window.innerWidth < 768) { // Ancho típico para considerar dispositivo móvil
            setTickFontSize(10);
        } else {
            setTickFontSize(14);
        }
    };
    const handleBarClick = (week: number) => {
        if (setSelectedWeek) setSelectedWeek(week + 1);
    };

    const CustomTooltip: React.FC<CustomTooltip> = ({ label, payload, active, data }) => {
        if (payload && active && label && data) {
            const years = data[label - 1]?.Years
            return (
                <div className="custom-tooltip bg-black-vct/85 p-4 text-sm text-white rounded-xl border border-black">
                    <p className="label text-base mb-1">{`Semana ${label}`}</p>
                    <p className="mb-1">{`Kilogramos: ${formatTooltipValue(payload[0].value)}`}</p>

                    {
                        years && (
                            <div>
                                <p>Fecha de inicio</p>
                                {
                                    years?.map((x) => (
                                        <p>{x[0]} : {x[2]} {x[1]} de {x[3]}</p>
                                    ))
                                }
                            </div>
                        )
                    }

                </div>
            )
        }

    }

    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={minHeight}>
            <BarChart
                width={300}
                height={45}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 15,
                    bottom: 27,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Semana" orientation="bottom" label={{ value: "Semana", position: "bottom" }} tick={{ fontSize: tickFontSize }}>
                </XAxis>
                <YAxis tickFormatter={formatNumber} label={{ value: 'Kilos', angle: -90, position: 'left' }} tick={{ fontSize: tickFontSize }} />
                <Tooltip
                    formatter={formatTooltipValue}
                    labelFormatter={formatTooltipLabel}
                    content={<CustomTooltip data={data} />}
                    contentStyle={{ "borderRadius": "15px", borderColor: "black", backgroundColor: 'rgba(45, 42, 38, 0.85)', color: '#fff', padding: '8px', fontSize: '14px' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar
                    dataKey="Kilos"
                    fill="#ff5b35"
                    isAnimationActive={true}
                    animationBegin={1}
                    animationDuration={1000}
                    animationEasing="linear"
                    activeBar={<Rectangle fill="#2d2a26" />}
                    onClick={(_, index) => handleBarClick(index)}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
