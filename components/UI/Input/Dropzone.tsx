import { interSecondary } from "@/styles/fonts"
import { ChangeEvent, FC, DragEvent, useState } from "react"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { toast } from "sonner"

interface Props {
    description: string
    type?: string
    setValue: React.Dispatch<React.SetStateAction<File | null>>
}

export const Dropzone: FC<Props> = ({
    description,
    type,
    setValue
}) => {

    const [highlighted, setHighlighted] = useState(false);
    const [file, setFile] = useState<File | null>(null)


    const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            console.log(file)
            if (type === file.type) {
                if (file) {
                    setValue(file)
                    setFile(file)

                }
            } else {
                toast.error("Archivo no corresponde a la extensión")
            }
        }
    }


    const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setHighlighted(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setHighlighted(false);
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setHighlighted(false);
        const file = e.dataTransfer.files[0];
        if (type === file.type) {
            if (file) {
                setValue(file);
                setFile(file)
            }
        } else {
            toast.error("Archivo no corresponde a la extensión correspondiente")
        }
    };

    const fileSelected = () => {
        if (file == null) {
            return (
                <label id="dropzone-file" className="cursor-pointer h-44 flex flex-col items-center justify-center w-full"
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                    <p className="text-4xl mb-4"><AiOutlineCloudUpload /></p>
                    <p className={`text-center text-sm ${interSecondary.className}`}>{description}</p>
                    <p className={`text-center text-sm ${interSecondary.className}`}>o arrastra el archivo</p>
                    <input type="file" id="dropzone-file" className="hidden" onChange={e => selectFile(e)} />
                </label>
            )
        } else {
            return (
                <div className="flex gap-2 flex-col items-center">
                    {
                        type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                            <img src="/xlsx.png" className=" object-contain h-16"/>
                        ):(
                            <img src="/pdf.png" className=" object-contain h-16"/>
                        )

                    }
                    <p className={`text-center text-xs ${interSecondary.className}`}>{file?.name}</p>
                    <button className={`px-2 py-1 bg-red-500 rounded w-fit text-white text-sm ${interSecondary.className} hover:bg-red-600`} onClick={() => {setFile(null); setValue(null)}}>Eliminar</button>
                </div>
            )
        }

    }

    return (
        <div className={` mt-4 mb-2 flex flex-col h-44 bg-orange-50 justify-center items-center border-2 min-h-24 border-orange-500 rounded-xl w-full ${highlighted ? "border-dashed bg-orange-100" : "border-solid"}`}>

            {fileSelected()}
        </div>
    )
}