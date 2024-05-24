import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Footer() {

  const router = useRouter()
  console.log(router.pathname)
  return (
    <footer className="flex-row mt-4 p-2 bg-black-vct flex justify-evenly items-center">
      {
        router.pathname === "/planificacion_lontue" ? (
          <div className=' w-[45px] sm:w-fit'>
            <Image alt='Logo operaciones enologicas' src="/OpEno.png" width={65} height={12} quality={50} priority/>
          </div>
        ) :
          (<div className=' w-[35px] sm:w-fit'>
            <Image alt='Logo Universidad Catolica del Norte' src="/logo-ucn01.png" width={55} height={12} quality={50} priority />
          </div>)
      }

      <p className=" text-white text-center text-[10px] font-thin my-auto w-36 sm:w-fit">Desarrollado por grupo Capstone 2024-1 UCN</p>
      <div className=' w-[75px] sm:w-fit'>
        <Image alt='Logo centro de investigacion e innovacion' src="/logo-blanco-cii.svg" width={130} height={12} priority />
      </div>
    </footer>
  )
} 