import { interSecondary } from "@/styles/fonts"
import Link from "next/link"
import { FC } from "react"

type functionButton = () => void

interface Props {
    title: string
    goTo?: string
    action?: functionButton
    isDisable?: boolean

}

export const ButtonPrincipal: FC<Props> = ({
    title,
    goTo,
    action,
    isDisable
}) => {
    return (
        <>
            {
                goTo ? (
                    <Link href={goTo} className=" bg-orange-600 py-2 px-4 rounded-xl cursor-pointer hover:bg-orange-700 w-fit mx-auto">
                        <p className={`text-white ${interSecondary}`}>{title}</p>
                    </Link>
                ) : (
                    <button className=" bg-orange-600 py-2 px-4 rounded-xl cursor-pointer hover:bg-orange-700 h-fit w-fit disabled:bg-orange-500 disabled:pointer-events-none" onClick={() => action && action()} disabled={isDisable} >
                        <p className={`text-white ${interSecondary}`}>{title}</p>
                    </button>
                )
            }

        </>

    )
}