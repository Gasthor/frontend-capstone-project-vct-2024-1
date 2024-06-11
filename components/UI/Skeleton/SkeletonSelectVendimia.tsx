import { FC } from "react";


export const SkeletonSelectVendimia: FC<{}> = ({

}) => {
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center animate-pulse">
                <h3 className="ml-8 mr-4  md:text-end w-28 h-6 rounded-md bg-neutral-200"></h3>
                <div className="flex flex-col md:flex-row gap-3 flex-wrap my-2">

                    <div className="flex items-center me-4">
                        <input
                            className="w-5 h-5 appearance-none border-2 cursor-pointer rounded-md mr-2 bg-neutral-200"
                        />
                        <label className="ms-2 text-sm font-medium bg-neutral-200 h-5 w-11 rounded-md"></label>
                    </div>
                    <div className="flex items-center me-4">
                        <input
                            className="w-5 h-5 appearance-none border-2 cursor-pointer rounded-md mr-2 bg-neutral-200"
                        />
                        <label className="ms-2 text-sm font-medium bg-neutral-200 h-5 w-11 rounded-md"></label>
                    </div>
                    <div className="flex items-center me-4">
                        <input
                            className="w-5 h-5 appearance-none border-2 cursor-pointer rounded-md mr-2 bg-neutral-200"
                        />
                        <label className="ms-2 text-sm font-medium bg-neutral-200 h-5 w-11 rounded-md"></label>
                    </div>
                    <div className="flex items-center me-4">
                        <input
                            className="w-5 h-5 appearance-none border-2 cursor-pointer rounded-md mr-2 bg-neutral-200"
                        />
                        <label className="ms-2 text-sm font-medium bg-neutral-200 h-5 w-11 rounded-md"></label>
                    </div>

                </div>

            </div>
            <div className="flex flex-col md:flex-row w-full gap-4 justify-center  animate-pulse">
                <button className="h-8 w-24 bg-neutral-200 rounded-md"></button>
                <button className="h-8 w-24 bg-neutral-200 rounded-md"></button>
            </div>
        </>

    )
}