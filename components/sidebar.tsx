'use client'
import { useState, useEffect } from 'react';
import { Locale } from '../i18n.config';
import { getDictionary } from "../lib/dictionaries";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useParams } from "next/navigation";

export default function Sidebar({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const router = useRouter();
  const params = useParams();
  const [page, setPage] = useState<any>(null);

  // Fetch dictionary data when component mounts
  useEffect(() => {
    async function fetchPageData() {
      try {
        const data = await getDictionary(locale);
        setPage(data);
      } catch (error) {
        console.error('Error fetching dictionary data:', error);
      }
    }

    fetchPageData();
  }, [locale]);

  const links = [
    {
      route: params.postId ? `/post/${params.postId}` : "/",
      name: page ? page.menu.beranda : "", // Ensure page is not null before accessing its properties
    },
    {
      route: "/upload",
      name: "Unggah",
    },
    {
      route: "/wallet",
      name: "Dompet",
    },
    {
      route: "profile/1",
      name: "Profil",
    },
  ];

  return (
    <>
      <div className="mx-auto w-full hidden md:flex flex-col justify-between pt-8 md:max-w-[15rem] lg:max-w-[15rem]">
        <ul className="flex flex-col gap-10 items-center w-full px-6">
          {links.map((link, index) => (
            <Link key={index} href={link.route} className="w-full">
              <li
                className={router.pathname === link.route
                  ? "bg-[#07A081] text-white rounded-lg w-full"
                  : ""}
              >
                <p className="px-5 py-3">{link.name}</p>
              </li>
            </Link>
          ))}
        </ul>
        <p className="mb-10 hidden lg:block text-center">
          Copyright 2023 <br /> Ratios App
        </p>
      </div>
    </>
  );
}
