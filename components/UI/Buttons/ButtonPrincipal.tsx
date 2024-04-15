import { interSecondary } from "@/styles/fonts"
import Link from "next/link"
import { FC } from "react"

type functionButton = () => void

interface Props {
    title: string
    goTo?: string
    action?: functionButton

}

export const ButtonPrincipal: FC<Props> = ({
    title,
    goTo,
    action
}) => {
    return (
        <>
            {
                goTo ? (
                    <Link href={goTo} className=" bg-orange-600 py-2 px-4 rounded-xl cursor-pointer hover:bg-orange-700 w-fit mx-auto">
                        <p className={`text-white ${interSecondary}`}>{title}</p>
                    </Link>
                ) : (
                    <button className=" bg-orange-600 py-2 px-4 rounded-xl cursor-pointer hover:bg-orange-700 w-fit" onClick={() => action && action()}>
                        <p className={`text-white ${interSecondary}`}>{title}</p>
                    </button>
                )
            }

        </>

    )
}