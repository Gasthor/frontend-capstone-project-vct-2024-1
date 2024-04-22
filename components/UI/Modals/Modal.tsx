import { interSecondary, interTitle } from "@/styles/fonts";


interface Props {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    action: () => void
    type: string
    title: string
    message?: string
}

export default function Modal({ open, onClose, action, type, message, children, title }: Props) {

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        action()
        onClose()
    }
    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onClose()
    }

    const typeModalRender = () => {
        switch (type) {
            case "Delete":
                return (
                    <>
                        <h1 className={`text-xl ${interTitle.className}`}>{title}</h1>
                        <h2 className={`text-lg ${interSecondary.className}`}>{message}</h2>
                        <footer className="flex flex-row gap-8">
                            <button className="bg-red-600 p-2 shadow-xl rounded-md text-white transition-shadow hover:shadow" onClick={(e) => handleSubmit(e)}>Eliminar</button>
                            <button onClick={(e) => handleCancel(e)}>Cancelar</button>
                        </footer>
                    </>
                )
            case "Input":
                return (
                    <form className="flex flex-col gap-4 items-center justify-center max-w-lg">
                        <h1 className={`text-xl ${interTitle.className}`}>{title}</h1>
                        {
                            message && <h2 className={`text-lg ${interSecondary.className}`}>{message}</h2>
                        }
                        <div className="flex flex-row justify-center gap-4 flex-wrap w-full">
                            {
                                children
                            }
                        </div>

                        <footer className="flex flex-row gap-8 mt-5">
                            <button className="bg-orange-600 p-2 rounded-md text-white" onClick={(e) => handleSubmit(e)}>Guardar cambios</button>
                            <button onClick={(e) => handleCancel(e)}>Cancelar</button>
                        </footer>

                    </form>
                )
            default:
                return (
                    <>
                        <h1 className={`text-xl ${interTitle.className}`}>Error inesperado con la accion, contactar al administrador</h1>
                    </>
                )
        }
    }

    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors  ${open ? "visible bg-black/20" : " invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`flex flex-col justify-center items-center bg-white p-6 rounded-xl shadow-lg min-w-80 gap-4 transition-all ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                {
                    typeModalRender()
                }
            </div>
        </div>
    );
}
