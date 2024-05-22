import { interTitle } from "@/styles/fonts";
import { FC } from "react";
import { ButtonSecundary } from "../Buttons/ButtonSecundary";
import { DeleteButton } from "../Buttons/DeleteButton";

interface Props {
    name: string
    year: number
}

export const ItemFile: FC<Props> = ({
    name,
    year
}) => {
    return (
        <div className="m-2 p-2 flex flex-col gap-3 w-fit min-w-fit">
            <img src="/xlsx.png" className=" object-contain h-14 md:h-16" />
            <p className={`text-center  ${interTitle.className}`}>{name} {year}</p>
            <div className="flex flex-row gap-2">
                <ButtonSecundary title={"Ver grafico"} />
                <DeleteButton />
            </div>
        </div>
    )
}