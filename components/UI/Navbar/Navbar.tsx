import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className="flex justify-around sm:mb-8 p-2 border-b-2 border-orange-vct shadow-md w-full bg-white">
           
            <div className='mx-8'>
                <Image alt='Logo Viña Concha y Toro' src="/logo-vina01.svg" width={300} height={12} quality={50} priority={true} />
            </div>
            

        </nav>
    )
}