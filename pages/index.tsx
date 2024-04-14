import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";
import { Container } from "@/components/UI/Container/Container";
import { Layout } from "@/components/Layout/Layout";
import { Poppins } from "next/font/google";
import Image from 'next/image'
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { interSecondary, interTitle } from "@/styles/fonts";


const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const poppinsLight = Poppins({ subsets: ["latin"], weight: "300" });



export const Home: NextPageWithLayout = () => {
  return (
    <>
      <h1 className={`m-4 text-4xl ${interTitle.className}`}>Módulos de planificación</h1>

      <div className="flex flex-col sm:flex-row gap-14">

        <Container >
          <h2 className={`text-2xl ${interTitle.className}`}>Bodega Lontué</h2>
          <p className={`${interSecondary.className}`}>Proceso de vino blanco</p>
          <Image src="/img-temp-bodegas.jpeg" width="300" height="12" alt="imagen bodega 1" className=" rounded-xl shadow-md" />
          <ButtonPrincipal title="Ingresar" goTo="/planificacion_lontue"/>
        </Container>

        <Container>
          <h2 className={` text-2xl ${interTitle.className}`}>Bodega Lourdes</h2>
          <p className={`${interSecondary.className}`}>Proceso de vino tinto</p>
          <Image src="/img-temp-bodegas.jpeg" width="300" height="12" alt="imagen bodega 1" className=" rounded-xl shadow-md" />
          <ButtonPrincipal title="Ingresar" goTo="/planificacion_lourdes"/>
        </Container>

      </div>
      </>
   
  )

 
}
Home.getLayout = function getLayout(page: ReactElement){
  return(
    <Layout title={"DSS - Viña Concha y Toro"} pageDescription={"Menu principal"}>
      {page}
    </Layout>
  )
}

export default Home
