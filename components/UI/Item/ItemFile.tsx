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
        data: [{
            Semana: string;
            Kilos: number;
        }]
    }[] | undefined,
    setListFile: Dispatch<SetStateAction<{
        name: string;
        year: number;
        data: [{
            Semana: string;
            Kilos: number;
        }]
    }[] | undefined>>
    data: [{
        Semana: string;
        Kilos: number;
    }]
}

export const ItemFile: FC<Props> = ({
    name,
    year,
    listFile,
    setListFile,
    data
}) => {

    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalGraphic, setOpenModalGraphic] = useState(false)


    const deleteFile = () => {
        console.log("delete")
        const toastId = toast.loading("Eliminando archivo")
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_LOURDES_URL}/api/files/delete/${name}/${year}`)
            .then((response: any | JSON) => {
                const updateList = () => {
                    const newList = listFile?.filter((x) => {
                        return !(x.name === name && x.year === year);
                    });
                    return newList;
                };
                setListFile(updateList());

                toast.success(`Archivo ${name} ${year} eliminado`, { id: toastId })

            })
            .catch(() => {
                toast.error("Error al eliminar el archivo, reintente más tarde", { id: toastId })
            })
    }

    const kilosTotal = (data: [{
        Semana: string;
        Kilos: number;
    }]) => {
        const totalKilos = data.reduce((acumulador, item) => acumulador + item.Kilos, 0)

        return totalKilos.toLocaleString('es-ES')
    }

    return (
        <div className="m-2 p-2 flex flex-col gap-3 w-fit min-w-fit">
            <Image height={70} width={70} alt="Archivo xslx" src="/xlsx.png" className=" object-contain h-14 md:h-16 mx-auto" priority quality={30} />
            <p className={`text-center  ${interTitle.className}`}>{name} {year}</p>
            <div className="flex flex-row gap-2">
                <ButtonSecundary title={"Ver gráfico"} action={() => setOpenModalGraphic(true)} />
                <DeleteButton action={() => setOpenModalDelete(true)} />
            </div>
            <Modal open={openModalDelete} onClose={() => setOpenModalDelete(false)} type={"Delete"} title={"Eliminar archivo"} message={`¿Estas seguro que quieres eliminar ${name} ${year}?`} action={() => deleteFile()} />
            <Modal open={openModalGraphic} onClose={() => setOpenModalGraphic(false)} data={data} action={() => { }} type={"Graphic"} title={`Gráfico vendimia ${year}`} message={`Gráfico representativo de la cantidad de kilos obtenidos en la bodega en las distintas semanas de vendimia del año ${year}.`}>
                <p>La vendimia contó con un total de {kilosTotal(data)} kilos entregados a la bodega en {data.length} semanas.</p>
            </Modal>
        </div>
    )
}