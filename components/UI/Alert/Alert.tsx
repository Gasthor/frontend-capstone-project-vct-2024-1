import React, { FC, useState } from "react"
import { IoIosClose, IoIosInformationCircleOutline } from "react-icons/io"
import { PiWarning } from "react-icons/pi"

interface Props {
    type: string
    message: string
    isOpen?: boolean
}

export const Alert: FC<Props> = ({
    type,
    message,
    isOpen = true
}) => {
    const [open, setOpen] = useState(isOpen)

    switch (type) {
        case "warning":
            return (
                <div className={`flex-row items-center m-1 my-2 order-first md:order-last bg-amber-50 w-fit p-2 rounded-lg border border-amber-500 transition-all ${open ? "flex scale-200" : " invisible scale-0 h-0 p-0 m-0"}`}>
                    <PiWarning className=" text-3xl md:text-xl text-amber-700 mx-2" />
                    <p className=" font-extralight text-xs text-amber-600 text-justify">
                        {message}
                    </p>
                    <button className="text-3xl text-amber-600 ml-3" onClick={() => setOpen(false)}> <IoIosClose /></button>
                </div>
            )

        case "information":
            return (
                <div className={` inset-0 flex-row items-center m-1 my-2 order-first md:order-last bg-slate-100 w-fit p-2 rounded-lg border border-slate-400 transition-all ${open ? "flex scale-200" : " invisible scale-0 h-0 p-0 m-0"}`}>
                    <IoIosInformationCircleOutline className=" text-3xl md:text-xl mx-2" />
                    <p className=" font-extralight text-xs text-slate-700 text-justify">
                        {message}
                    </p>
                    <button className="text-3xl text-slate-700 ml-3" onClick={() => setOpen(false)}> <IoIosClose /></button>
                </div>
                
            )
    }
}