import { FC, SetStateAction, useState } from "react";
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Rectangle, BarChart } from "recharts";

interface Props {
    data: {
        Semana: string;
        Kilos: number;
    }[]
    setSelectedWeek: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const BarRechart: FC<Props> = ({
    data,
    setSelectedWeek
}) => {



    const formatNumberTooltip = (number: number): string => {
        return number.toLocaleString('es-ES') + " kg";
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
        setSelectedWeek(week + 1);
    };
    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={"450px"}>
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
                    contentStyle={{"borderRadius":"15px",borderColor : "black", backgroundColor: 'rgba(45, 42, 38, 0.85)', color: '#fff', padding: '8px', fontSize: '14px' }}
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
