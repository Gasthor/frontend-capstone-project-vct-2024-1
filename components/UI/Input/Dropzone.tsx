import { interSecondary } from "@/styles/fonts"
import { ChangeEvent, FC, DragEvent, useState } from "react"

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


    const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            console.log(file)
            if(type === file.type){
                if (file) {
                    setValue(file);
                }
            }else{
                alert("Archivo no corresponde a la extensión correspondiente")
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
        if(type === file.type){
            if (file) {
                setValue(file);
            }
        }else{
            alert("Archivo no corresponde a la extensión correspondiente")
        } 
    };

    return (
        <div className="flex my-4">
            <label id="dropzone-file" className={`flex flex-col bg-orange-50 p-4 justify-center items-center cursor-pointer border-2 min-h-24 border-orange-500 rounded-xl w-full ${highlighted ? "border-dashed bg-orange-100" : "border-solid"}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <p className={`text-center text-sm ${interSecondary.className}`}>{description}</p>
                <p className={`text-center text-sm ${interSecondary.className}`}>o arrastra tus archivo aqui</p>
                <input type="file" id="dropzone-file" className="hidden" onChange={e => selectFile(e)} />
            </label>
        </div>
    )
}