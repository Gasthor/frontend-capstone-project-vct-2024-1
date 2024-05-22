import { FC } from "react"

interface Props {
    title: string
    value?: string
    setValue?: React.Dispatch<React.SetStateAction<string>>
}

export const Input: FC<Props> = ({
    title,
    value,
    setValue
}) => {
    return (
        <div className="flex flex-col gap-2 w-full sm:w-fit">
            <label className="flex flex-col">{title}</label>
            <input className="border p-2 rounded-lg" />
        </div>
    )
}