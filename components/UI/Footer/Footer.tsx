import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Footer() {

  const router = useRouter()
  console.log(router.pathname)
  return (
    <footer className="mt-4 p-2 bg-black flex justify-evenly items-center">
      {
        router.pathname === "/planificacion_lontue" ? (
          <div>
            <Image alt='Logo operaciones enologicas' src="/OpEno.png" width={65} height={12} />
          </div>
        ) :
          (<div>
            <Image alt='Logo Universidad Catolica del Norte' src="/logo-ucn01.png" width={55} height={12} />
          </div>)
      }

      <p className=" text-white text-xs font-thin my-auto">Desarrollado por grupo Capstone 2024-1 UCN</p>
      <div>
        <Image alt='Logo centro de investigacion e innovacion' src="/logo-cii.png" width={130} height={12} />
      </div>
    </footer>
  )
} 