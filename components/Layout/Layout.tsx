import Head from "next/head"
import { FC } from "react"
import Navbar from "../UI/Navbar/Navbar"
import Footer from "../UI/Footer/Footer"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    children: React.ReactNode | React.ReactNode[]
    title: string
    pageDescription: string
}
export const Layout: FC<Props> = ({
    children, title, pageDescription
}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
            </Head>
            <Navbar />
            <main className="flex flex-col gap-4 sm:gap-8 items-center p-4 flex-grow">
                {children}
                <ToastContainer />
            </main>
            <Footer />
        </div>
    )
}