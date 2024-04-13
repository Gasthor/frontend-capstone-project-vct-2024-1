import { FC } from "react"

interface Props {
    children : React.ReactNode | React.ReactNode[]
    width?: string
}

export const Container: FC<Props> = ({
    children,
    width
}) => {
    return(
        <section className= {`gap-2 flex flex-col justify-center items-center bg-white p-8 rounded-xl shadow-lg ${width?width: "w-fit"}`}>
            {children}
        </section>
    )
}