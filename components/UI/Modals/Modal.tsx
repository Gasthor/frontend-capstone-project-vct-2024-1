import { interSecondary, interTitle } from "@/styles/fonts";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    action: () => void
    type: string
    title: string
    message?: string
    data?: {
        Semana: string;
        Kilos: number;
    }[]
}

export default function Modal({ open, onClose, action, type, message, children, title, data }: Props) {

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        action()
        onClose()
    }
    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onClose()
    }

    const typeModalRender = () => {
        switch (type) {
            case "Delete":
                return (
                    <>
                        <h1 className={`text-xl ${interTitle.className}`}>{title}</h1>
                        <h2 className={`text-lg ${interSecondary.className}`}>{message}</h2>
                        <footer className="flex flex-row gap-8">
                            <button className="bg-red-600 p-2 shadow-xl rounded-md text-white transition-shadow hover:shadow" onClick={(e) => handleSubmit(e)}>Eliminar</button>
                            <button onClick={(e) => handleCancel(e)}>Cancelar</button>
                        </footer>
                    </>
                )
            case "Input":
                return (
                    <form className="flex flex-col gap-4 items-center justify-center max-w-lg ">
                        <h1 className={`text-xl ${interTitle.className}`}>{title}</h1>
                        {
                            message && <h2 className={`text-lg ${interSecondary.className}`}>{message}</h2>
                        }
                        <div className="flex flex-row justify-center gap-4 flex-wrap w-full max-h-[550px] overflow-y-auto">
                            {
                                children
                            }
                            <footer className="flex flex-row gap-8 mt-5 w-full justify-center">
                                <button className="bg-orange-600 p-2 rounded-md text-white" onClick={(e) => handleSubmit(e)}>Guardar</button>
                                <button onClick={(e) => handleCancel(e)}>Cancelar</button>
                            </footer>
                        </div>

                    </form>
                )
            case "Graphic":
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

                useEffect(() => {
                    window.addEventListener('resize', handleResize);
                    handleResize(); // Llamar inicialmente para establecer el tamaño correcto

                    return () => window.removeEventListener('resize', handleResize);
                }, []);

                return (
                    <div className="max-w-2xl flex flex-col items-center gap-2 md:mx-8 h-[470px]">
                        <h1 className={`text-xl ${interTitle.className}`}>{title}</h1>
                        <h2 className={`text-sm md:text-base text-center ${interSecondary.className}`}>{message}</h2>
                        {data && (
                            <ResponsiveContainer width="100%" height="100%">
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
                                    <Tooltip formatter={formatTooltipValue} labelFormatter={formatTooltipLabel} />
                                    <Legend verticalAlign="top" height={36} />
                                    <Bar dataKey="Kilos" fill="#ff5b35" isAnimationActive={true} animationBegin={1} animationDuration={1000} animationEasing="linear" activeBar={<Rectangle fill="#2d2a26" />} />
                                </BarChart>
                            </ResponsiveContainer>

                        )}

                        {children}
                        <footer className="flex flex-row gap-8 p-4">
                        </footer>
                    </div>
                )
            default:
                return (
                    <>
                        <h1 className={`text-xl ${interTitle.className}`}>Error inesperado con la accion, contactar al administrador</h1>
                    </>
                )
        }
    }

    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors  ${open ? "visible bg-black/20" : " invisible"}`}>

            <div onClick={(e) => e.stopPropagation()} className={`flex flex-col justify-center items-center bg-white p-6 rounded-xl shadow-lg min-w-80 gap-4 transition-all ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                <button className="fixed top-3 right-3 p-2 text-3xl" onClick={(e) => handleCancel(e)}><IoIosClose /></button>

                {
                    typeModalRender()
                }
            </div>
        </div>
    );
}
