import { interSecondary, interTitle } from "@/styles/fonts"
import { ChangeEvent, FC, DragEvent, useState } from "react"
import { toast } from "react-toastify"

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
                toast.error("Archivo no corresponde a la extensión correspondiente")
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
            alert("Archivo no corresponde a la extensión correspondiente")
        }
    };

    const fileSelected = () => {
        if (file == null) {
            return (
                <label id="dropzone-file" className="cursor-pointer p-4"
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                    <p className={`text-center text-sm ${interSecondary.className}`}>{description}</p>
                    <p className={`text-center text-sm ${interSecondary.className}`}>o arrastra tus archivo</p>
                    <input type="file" id="dropzone-file" className="hidden" onChange={e => selectFile(e)} />
                </label>
            )
        } else {
            return (
                <div className="flex flex-col items-center">
                    <p className={`text-center text- ${interTitle.className}`}>{file?.name}</p>
                    <button className={`px-2 py-1 bg-red-500 rounded w-fit text-white text-sm ${interSecondary.className} hover:bg-red-600`} onClick={() => setFile(null)}>Eliminar</button>
                </div>
            )
        }

    }

    return (
        <div className={` mt-4 mb-2 flex flex-col bg-orange-50 justify-center items-center border-2 min-h-24 border-orange-500 rounded-xl w-full ${highlighted ? "border-dashed bg-orange-100" : "border-solid"}`}>

            {fileSelected()}
        </div>
    )
}