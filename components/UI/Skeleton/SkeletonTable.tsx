import { FC } from "react";


export const SkeletonTable: FC<{}> = ({

}) => {
    return (
        <div className={`mx-auto flex flex-col md:w-11/12 text-left rtl:text-right border-2 border-gray-200 animate-pulse rounded-lg p-2 overflow-x-auto`}>
            <div className={` h-10 overflow-x-auto`}>
                <div className="flex gap-2">
                    <div className="px-3 py-3 bg-gray-300 max-h-1 w-32 rounded-lg"></div>
                    <div className="px-3 py-3 bg-gray-300 max-h-1 w-32 rounded-lg"></div>
                    <div className="px-3 py-3 bg-gray-300 max-h-1 w-32 rounded-lg"></div>
                    <div className="px-3 py-3 bg-gray-300 max-h-1 w-32 rounded-lg"></div>
                    <div className="px-3 py-3 w-32 bg-gray-300 max-h-1 rounded-lg"></div>
                    <div className="px-3 py-3 bg-gray-300 max-h-1 w-32 rounded-lg"></div>
                </div>
            </div>
            <div className=" h-64 text-xs sm:text-sm">
                <div className="flex gap-2 h-64">
                    <div className="px-3 py-3 bg-gray-300 h-full w-32 rounded-lg"></div>
                    <div className="px-3 py-3 bg-gray-300 h-full w-32 rounded-lg"></div>
                    <div className="px-3 py-3 bg-gray-300 h-full w-32 rounded-lg"></div>
                    <div className="px-3 py-3 bg-gray-300 h-full w-32 rounded-lg"></div>
                    <div className="px-3 py-3 bg-gray-300 h-full w-32 rounded-lg"></div>
                    <div className="p-3  bg-gray-300 h-full w-32 rounded-lg"></div>
                </div>

            </div>
        </div>
    )
}