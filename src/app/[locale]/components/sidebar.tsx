'use client'
import { useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'

export default function Sidebar() {

  const router = usePathname();
  const params = useParams();
  const links = [
    {
      route: params.postId ? `/post/${params.postId}` : "/id",
      name: "Beranda"
    },
    {
      route: "/id/upload" || "/en/upload",
      name: "Unggah"
    },
    {
      route: "/id/wallet" || "/en/wallet",
      name: "Dompet"
    },
    {
      route: "/id/profile/1" || "/en/profile/1",
      name: "Profil"
    }
  ]

  return (
    <>
    <div className="mx-auto w-full hidden md:flex flex-col justify-between pt-8 md:max-w-[15rem] lg:max-w-[15rem]">
      <ul className="flex flex-col gap-10 items-center w-full px-6">
        {links.map((link, index) => {
          return (        
        <Link key={index} href={link.route} className='w-full'>
          <li className={router === link.route ? "bg-[#07A081] text-white rounded-lg w-full" : ""}>
            <p className='px-5 py-3 '>{link.name}</p>
          </li>
        </Link>
          )
        })}
      </ul>
      <p className='mb-10 hidden lg:block text-center'>Copyright 2023 <br></br> Ratios App</p>
    </div>
    </>
  )
}