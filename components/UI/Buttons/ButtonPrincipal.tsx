import { interSecondary } from "@/styles/fonts"
import Link from "next/link"
import { FC } from "react"
import { FaHouse } from "react-icons/fa6"

type functionButton = () => void

interface Props {
    title?: string
    goTo?: string
    action?: functionButton
    isDisable?: boolean
    messageDisable?: string
    children?: React.ReactNode
    bgColor?: string
}

export const ButtonPrincipal: FC<Props> = ({
    title,
    goTo,
    action,
    isDisable,
    messageDisable,
    children,
    bgColor

}) => {
    return (
        <>
            {
                goTo ? (
                    <div className="flex">
                        <Link href={goTo} className={`bg-orange-vct rounded-2xl py-2 px-4 text-white text-center sm:rounded-xl cursor-pointer hover:bg-orange-700 mx-auto ${interSecondary} ${!title && "text-xl md:text-3xl bg-transparent hover:bg-transparent"}`}>
                            {title ? title : <FaHouse className="text-black" />}
                        </Link>
                    </div>

                ) : (
                    <button className={`flex flex-row justify-center py-2 px-4 shadow-md rounded-2xl sm:rounded-xl cursor-pointer  h-fit w-full sm:w-fit disabled:pointer-events-none transition-all duration-1000 ${isDisable && " bg-orange-vct/80"} ${bgColor ? bgColor :"hover:bg-orange-700 bg-orange-vct"}`} onClick={() => action && action()} disabled={isDisable} type="button" >

                        <p className={`text-white ${interSecondary}`}>{!isDisable ? title : messageDisable}</p>
                        {children}
                    </button>
                )
            }

        </>

    )
}