import { FC } from "react"

interface Props {
    name: string
    value: string
    previousValue?: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    list?: string[]
    record?: Record<string, string[][]>
    isDisable?: boolean
    defaultValue ?: string
}

export const Select: FC<Props> = ({
    name,
    value,
    previousValue,
    record,
    setValue,
    list,
    isDisable,
    defaultValue
}) => {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(record)
        setValue(e.target.value)
    }

    return (
        <div className="flex flex-col gap-2 w-full sm:w-fit">
            <label htmlFor="">{name}</label>
            <select className="border p-2 rounded-lg" value={value} onChange={handleSelectChange} disabled={isDisable} required>
                <option value="">{defaultValue ? defaultValue : "Seleccione una opción"}</option>
                {previousValue && record && !isDisable? (
                    record[previousValue].map((option, index)=>(
                        <option key={index} value={option[0]}>{option[1]}</option>
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