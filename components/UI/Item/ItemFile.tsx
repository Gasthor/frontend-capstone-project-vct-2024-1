import { interTitle } from "@/styles/fonts";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { ButtonSecundary } from "../Buttons/ButtonSecundary";
import { DeleteButton } from "../Buttons/DeleteButton";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import Modal from "../Modals/Modal";

interface Props {
    name: string
    year: number
    listFile: {
        name: string;
        year: number;
    } [] | undefined,
    setListFile: Dispatch<SetStateAction<{
        name: string;
        year: number;
    } [] | undefined>>
}

export const ItemFile: FC<Props> = ({
    name,
    year,
    listFile,
    setListFile
}) => {

    const [openModalDelete, setOpenModalDelete] = useState(false)

    const deleteFile = () => {
        console.log("delete")
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/delete/${name}_${year}`)
            .then((response: any | JSON) => {
                const updateList = () => {
                    const newList = listFile?.filter((x) => {
                        return !(x.name === name && x.year === year);
                    });
                    return newList;
                };
                setListFile(updateList());

                toast.success(`Archivo ${name} ${year} eliminado`)

            })
            .catch(() => {
                toast.error("Error al obtener datos de las vendimias, reintente más tarde")
            })
    }

    return (
        <div className="m-2 p-2 flex flex-col gap-3 w-fit min-w-fit">
            <Image height={70} width={70} alt="Archivo xslx" src="/xlsx.png" className=" object-contain h-14 md:h-16 mx-auto" priority quality={30} />
            <p className={`text-center  ${interTitle.className}`}>{name} {year}</p>
            <div className="flex flex-row gap-2">
                <ButtonSecundary title={"Ver grafico"} />
                <DeleteButton action={() => setOpenModalDelete(true)} />
            </div>
            <Modal open={openModalDelete} onClose={()=>setOpenModalDelete(false)} type={"Delete"} title={"Eliminar archivo"} message={`¿Estas seguro en eliminar ${name} ${year}?`}action={() => deleteFile()}>

            </Modal>
        </div>
    )
}