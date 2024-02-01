'use client'
import MenuIcon from '@mui/icons-material/Menu';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import Image from 'next/image';
import { useEffect } from 'react';

export default function Header() {

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div className="header bg-[#F0F4F9] fixed top-0 flex-row w-full flex items-center justify-between p-[2px] md:p-[8px]">
        <div className="flex items-center w-full ml-3 md:ml-5">
            <div className='p-[12px]'>
                <MenuIcon />
            </div>
            <a href="/" className='flex items-center'>
              <Image src="/Logo.png" width={40} height={40} className='profil h-[40px] ml-1 md:ml-3' alt="" />
              <h1 className='text-xl font-semibold ml-3 text-[#393939]'>Ratios App</h1>
            </a>
        </div>
        <div className='p-[12px] mr-5 md:mr-10'>
        <Dropdown>
            <DropdownTrigger>
              <Image src="/Logo.png" width={40} height={40} className='max-h-[40px] max-w-[40px] cursor-pointer' alt="logo" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem href='/profile/1'>Akun Anda</DropdownItem>
              <DropdownItem key="dua">Test 2</DropdownItem>
              <DropdownItem onClick={logout} className='text-red-500'>Keluar</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        </div>
    </div>
  )
}