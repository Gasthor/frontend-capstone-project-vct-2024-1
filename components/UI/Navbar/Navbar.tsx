import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className="flex justify-evenly p-2 border-b-2 border-orange-500 shadow-md w-full">
           <div>
           <Image alt='Logo centro de investigacion e innovacion' src="/logo-CII.svg" width={160} height={12}/>
           </div>
        <div>
        <Image alt='Logo Viña Concha y Toro' src="/logo-vina.svg" width={300} height={12}/>
        </div>
    <div>
    <Image alt='Logo Viña Concha y Toro' src="/logo-ucn.png" width={60} height={12}/>
    </div>
            
        </nav>
    )
}