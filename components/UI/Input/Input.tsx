import { FC } from "react"

interface Props {
    title: string
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    name ?: string
}

export const Input: FC<Props> = ({
    title,
    value,
    setValue,
    name
}) => {
    return (
        <div className="flex flex-col gap-2 w-full sm:w-fit">
            <label className="flex flex-col">{title}</label>
            <input className="border p-2 rounded-lg" value={value} onChange={(e) => setValue(e.target.value)} name={name}/>
        </div>
    )
}