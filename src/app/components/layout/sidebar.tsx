'use client'
import { useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'
import useSidebarStore from '@/app/useSidebarStore';

export default function Sidebar() {
  const router = usePathname();
  const params = useParams();
  const {sidebar} = useSidebarStore();
  const links = [
    {
      route: "/",
      name: "Beranda",
      indicator: params.postId ? `/post/${params.postId}` : "/"
    },
    {
      route: "/upload",
      name: "Unggah",
      indicator: "/upload"
    },
    {
      route: "/chat",
      name: "Pesan",
      indicator: "/chat"
    },
    {
      route: "/wallet",
      name: "Dompet",
      indicator: "/wallet"
    },
    {
      route: "/profile/",
      name: "Profil",
      indicator: params.userSlug ? `/profile/${params.userSlug}` : "/profile"
    }
  ]

  return (
    <>
    <div className={ sidebar ? 'hidden md:flex mx-auto w-full flex-col justify-between pt-8 md:max-w-[15rem] lg:max-w-[15rem]' : "hidden mx-auto w-full flex-col justify-between pt-8 md:max-w-[15rem] lg:max-w-[15rem]"}>
      <ul className="flex flex-col gap-10 items-center w-full px-6">
        {links.map((link, index) => {
          return (        
        <Link key={index} href={link.route} className='w-full'>
          <li className={router === link.indicator ? "bg-[#07A081] text-white rounded-lg w-full" : ""}>
            <p className='px-5 py-3 '>{link.name}</p>
          </li>
        </Link>
          )
        })}
      </ul>
      <p className='mb-10 hidden md:block text-center'>Copyright 2023 <br></br> Ratios App</p>
    </div>
    </>
  )
}