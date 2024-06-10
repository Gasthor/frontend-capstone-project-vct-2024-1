import { FC } from "react"

interface Props {
    title: string
    value?: string
    setValue?: React.Dispatch<React.SetStateAction<string>>
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name?: string
    placeholder?: string
    type?: string
    id?: string
    unit?: string
}

export const Input: FC<Props> = ({
    title,
    value,
    setValue,
    placeholder,
    onChange,
    type,
    id,
    unit
}) => {

    const action = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setValue) {
            setValue(e.target.value)
        } 
        if (onChange) {
            onChange(e)
        }
    }


    switch (type) {
        case "out-label":
            return (
                <div className="relative">
                    <input
                        type="text"
                        id={id}
                        className="block md:max-w-36 text-black px-2.5 pb-1.5 pt-3 w-full bg-transparent rounded-lg border border-gray-300 appearance-nonefocus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={onChange}
                        value={value}
                    />
                    <label
                        htmlFor={id}
                        className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                        {title}
                    </label>
                    {unit && <p className="absolute grid w-5 top-2/4 right-3  -translate-y-2/4 font-medium ">{unit}</p>}

                </div>
            )
        default:
            return (
                <div className="relative w-full sm:w-fit">
                    <label className="flex flex-col">{title}</label>
                    <input
                        className="border p-2 rounded-lg w-full sm:w-fit"
                        value={value}
                        onChange={action}
                        placeholder={placeholder}
                    />
                    {unit && <p className="absolute grid w-5 top-2/4 right-3  -translate-y-2/4 font-medium ">{unit}</p>}
                </div>
            )

    }

}