import Link from "next/link"
import { FC } from "react"

interface Props {
    title: string
    goTo?: string
    action?: () => {}

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
                    <Link href={goTo} className=" bg-orange-600 py-2 px-4 rounded-xl cursor-pointer hover:bg-orange-700">
                        <p className=" text-white">{title}</p>
                    </Link>
                ) : (
                    <button className=" bg-orange-600 py-2 px-4 rounded-xl cursor-pointer hover:bg-orange-700">
                        <p className=" text-white">{title}</p>
                    </button>
                )
            }

        </>

    )
}