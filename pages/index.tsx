import { ButtonPrincipal } from "@/components/UI/Buttons/ButtonPrincipal";
import { Container } from "@/components/UI/Container/Container";
import { Layout } from "@/components/Layout/Layout";
import Image from 'next/image'
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import { interSecondary, interTitle } from "@/styles/fonts";

export const Home: NextPageWithLayout = () => {
  return (
    <>
      <h1 className={`m-4 text-3xl sm:text-4xl text-center ${interTitle.className}`}>Módulos del sistema</h1>

      <div className="flex flex-col items-center sm:flex-row gap-4 sm:gap-14">

        <Container >
          <h2 className={`text-center text-2xl ${interTitle.className}`}>Bodega Lontué</h2>
          <div>
            <p className={`text-center ${interSecondary.className}`}>Programación diaria de vendimia</p>
            <p className={`text-center ${interSecondary.className}`}>Proceso de vino blanco</p>
          </div>
          <img src="/Imagen-Lontue.jpeg"alt="imagen bodega 1" className="rounded-xl object-cover h-56" />
          <ButtonPrincipal title="Ingresar" goTo="/planificacion_lontue" />
        </Container>

        <Container>
          <h2 className={`text-center text-2xl ${interTitle.className}`}>Bodega Lourdes</h2>
          <div>
            <p className={`text-center ${interSecondary.className}`}>Planificación tactica de vendimia</p>
            <p className={`text-center ${interSecondary.className}`}>Proceso de vino tinto</p>
          </div>
          <img src="/img-temp-bodegas.jpeg" alt="imagen bodega 1" className="rounded-xl object-cover h-56"/>
          <ButtonPrincipal title="Ingresar" goTo="/bodega_lourdes" />
        </Container>

      </div>
    </>

  )


}
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={"DSS - Viña Concha y Toro"} pageDescription={"Menu principal"}>
      {page}
    </Layout>
  )
}

export default Home
