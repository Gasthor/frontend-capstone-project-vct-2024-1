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
    children?: React.ReactNode

}

export const ButtonPrincipal: FC<Props> = ({
    title,
    goTo,
    action,
    isDisable,
    messageDisable,
    children

}) => {
    return (
        <>
            {
                goTo ? (
                    <Link href={goTo} className=" bg-orange-vct rounded-2xl py-2 px-4  sm:rounded-xl cursor-pointer hover:bg-orange-700 mx-auto">
                        <p className={`text-white text-center ${interSecondary}`}>{title}</p>
                    </Link>
                ) : (
                    <button className={`flex flex-row justify-center py-2 px-4 shadow-md rounded-2xl sm:rounded-xl cursor-pointer hover:bg-orange-700 h-fit w-full sm:w-fit disabled:pointer-events-none transition-all duration-1000 ${!isDisable ?  "bg-orange-vct":" bg-orange-vct/80"}`} onClick={() => action && action()} disabled={isDisable} type="button" >
                        
                        <p className={`text-white ${interSecondary}`}>{!isDisable ? title : messageDisable}</p>
                        {children}
                    </button>
                )
            }

        </>

    )
}