import { FC } from "react"

interface Props {
    title : string
}

export const ButtonPrincipal: FC<Props> = ({
    title
}) => {
    return(
        <button className=" bg-orange-600 py-2 px-4 rounded-xl cursor-pointer hover:bg-orange-700">
            <p className=" text-white">{title}</p>
        </button>
    )
}