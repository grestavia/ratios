'use client'
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'

export default function Sidebar() {

  const router = usePathname();
  const params = useParams()

  return (
    <>
    <div className="mx-auto w-full hidden lg:flex flex-col justify-between pt-8 max-w-xs">
      <ul className="flex flex-col gap-10 items-center">
        <Link href={"/"}>
          <li className={router === "/" ? "bg-[#07A081] text-white rounded-lg" : ""}>
            <p className='px-6 py-3 text-lg'>Beranda</p>
          </li>
        </Link>
        <Link href={"/upload"}>
          <li className={router === "/upload" ? "bg-[#07A081] text-white rounded-lg" : ""}>
            <p className='px-6 py-3 text-lg'>Unggah</p>
          </li>
        </Link>
        <Link href={"/"}>
          <li>
            <p className='px-6 py-3 text-lg'>Dompet</p>
          </li>
        </Link>
        <Link href={"/profile"}>
          <li className={router === "/profile" ? "bg-[#07A081] text-white rounded-lg" : ""}>
            <p className='px-6 py-3 text-lg'>Profil</p>
          </li>
        </Link>
      </ul>
      <p className='mb-10 hidden lg:block text-center'>Copyright 2023 <br></br> Ratios App</p>
    </div>
    </>
  )
}