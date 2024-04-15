import { FC } from "react"

interface Props {
    name: string
    value: string
    previousValue?: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    list?: string[]
    record?: Record<string, string[]>
}

export const Select: FC<Props> = ({
    name,
    value,
    previousValue,
    record,
    setValue,
    list
}) => {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value)
    }

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="">{name}</label>
            <select className="border p-2 rounded-lg" value={value} onChange={handleSelectChange}>
                <option value="">Seleccione una opcion</option>
                {previousValue && record? (
                    record[previousValue].map((option, index)=>(
                        <option key={index} value={option}>{option}</option>
                    ))
                ):(
                    list && list.map((option, index) => (

                        <option key={index} value={option}>{option}</option>
                    ))
                )
                }
            </select>
        </div >
    )
}