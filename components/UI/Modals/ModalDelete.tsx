import { interSecondary, interTitle } from "@/styles/fonts";


interface ModalDeleteProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    action: () => void
    type: string
    message: string
}

export default function ModalDelete({ open, onClose, action, type, message}: ModalDeleteProps) {

    const handleDelete = () => {
        console.log("hola")
        action()
        onClose()
    }

    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors  ${open ? "visible bg-black/20" : " invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`flex flex-col justify-center items-center bg-white p-8 rounded-xl shadow-lg min-w-80 gap-5 transition-all ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                <header className={``}>
                    <h1 className={`text-xl ${interTitle.className}`}>Eliminar {type}</h1>
                </header>
                <div className=" bg-transparent">
                    <h2 className={`text-lg${interSecondary.className}`}>{message}</h2>
                </div>
                <footer className="flex flex-row gap-8">
                    <button className="bg-red-600 p-2 rounded-md text-white" onClick={()=>handleDelete()}>Eliminar</button>
                    <button onClick={onClose}>Cancelar</button>
                </footer>
            </div>
        </div>
    );
}
