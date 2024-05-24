import { FC } from "react";


export const SkeletonListFiles: FC<{}> = ({

}) => {
    return (
        <div className={`mx-auto flex flex-row md:w-11/12 text-left rtl:text-right animate-pulse gap-10`}>
            <div className="h-44 w-36 flex flex-col gap-2 justify-center items-center">
                <div className="h-28 w-28 bg-neutral-200 rounded-2xl" />
                <div className="flex flex-row gap-2 w-full">
                    <div className="h-8 w-full bg-neutral-200 rounded-2lg"/>
                    <div className="h-8 w-10 bg-neutral-200 rounded-lg"/>
                </div>
            </div>
            <div className="h-44 w-36 flex flex-col gap-2 justify-center items-center">
                <div className="h-28 w-28 bg-neutral-200 rounded-2xl" />
                <div className="flex flex-row gap-2 w-full">
                    <div className="h-8 w-full bg-neutral-200 rounded-lg"/>
                    <div className="h-8 w-10 bg-neutral-200 rounded-lg"/>
                </div>
            </div>
            <div className="h-44 w-36 flex flex-col gap-2 justify-center items-center">
                <div className="h-28 w-28 bg-neutral-200 rounded-2xl" />
                <div className="flex flex-row gap-2 w-full">
                    <div className="h-8 w-full bg-neutral-200 rounded-lg"/>
                    <div className="h-8 w-10 bg-neutral-200 rounded-lg"/>
                </div>
            </div>
            <div className="h-44 w-36 flex flex-col gap-2 justify-center items-center">
                <div className="h-28 w-28 bg-neutral-200 rounded-2xl" />
                <div className="flex flex-row gap-2 w-full">
                    <div className="h-8 w-full bg-neutral-200 rounded-lg"/>
                    <div className="h-8 w-10 bg-neutral-200 rounded-lg"/>
                </div>
            </div>
            <div className="h-44 w-36 flex flex-col gap-2 justify-center items-center">
                <div className="h-28 w-28 bg-neutral-200 rounded-2xl" />
                <div className="flex flex-row gap-2 w-full">
                    <div className="h-8 w-full bg-neutral-200 rounded-lg"/>
                    <div className="h-8 w-10 bg-neutral-200 rounded-lg"/>
                </div>
            </div>
        </div>
    )
}