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
        <section className= {`gap-2 flex flex-col bg-white p-4 sm:p-8 rounded-xl shadow-lg ${width?width: " w-11/12 sm:max-w-6xl"}`}>
            {children}
        </section>
    )
}