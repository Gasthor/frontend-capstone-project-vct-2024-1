import { interSecondary } from "@/styles/fonts"
import Link from "next/link"
import { FC } from "react"

type functionButton = () => void

interface Props {
    title: string
    goTo?: string
    action?: functionButton
    isDisable?: boolean
    messageDisable?: string

}

export const ButtonSecundary: FC<Props> = ({
    title,
    goTo,
    action,
    isDisable,
    messageDisable

}) => {
    return (
        <>
            {
                goTo ? (
                    <Link href={goTo} className=" bg-orange-vct py-2 px-4 rounded-full sm:rounded-xl cursor-pointer hover:bg-orange-700 mx-auto">
                        <p className={`text-white text-center ${interSecondary}`}>{title}</p>
                    </Link>
                ) : (
                    <button className={`py-2 px-4 shadow-md rounded-full sm:rounded-xl cursor-pointer hover:bg-orange-700 h-fit w-full sm:w-fit disabled:pointer-events-none transition-all duration-1000 ${!isDisable ?  "bg-orange-vct":"bg-green-500"}`} onClick={() => action && action()} disabled={isDisable} type="button" >
                        <p className={`text-white text-sm ${interSecondary}`}>{!isDisable ? title : messageDisable}</p>
                    </button>
                )
            }

        </>

    )
}