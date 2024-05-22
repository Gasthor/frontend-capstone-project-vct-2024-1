import { interTitle } from "@/styles/fonts"
import { FC } from "react"

interface Props {
    number: number
    title: string
}

export const TitleContainer: FC<Props> = ({
    number,
    title
}) => {
    return (
        <div className="flex flex-row items-center gap-2">
            <div className="border-[3px] border-orange-500 px-[10px] rounded-full text-orange-500 text-xl font-semibold">{number}</div>
            <h2 className={`text-xl sm:text-2xl ${interTitle.className}`}>{title}</h2>
        </div>
    )
}