"use client";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  dropdownSection,
  DropdownSection
} from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MdLogout, MdOutlinePerson } from "react-icons/md";

export default function Header() {
  const [userdata, setUserData] = useState<any>([]);
  const [jwt, setJWT] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      if (token) {
        setJWT(token);
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_RATIO + "/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataUser = response.data.data[0];
        setUserData(dataUser);
      } else {
        console.log("Token not found");
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="header bg-[#F0F4F9] fixed top-0 flex-row w-full flex items-center justify-between p-[2px] md:p-[8px]">
      <div className="flex items-center w-full ml-3 md:ml-5">
        <div className="p-[12px]">
          <MenuIcon />
        </div>
        <a href="/" className="flex items-center">
          <img
            src="/logo.png"
            className="profil h-[40px] ml-1 md:ml-3"
            alt=""
          />
          <h1 className="text-xl font-semibold ml-3 text-[#393939]">
            Ratios App
          </h1>
        </a>
      </div>
      <div className="p-[12px] mr-5 md:mr-10">
        <Dropdown>
          <DropdownTrigger>
            {jwt && userdata && (
              <img
                src={userdata.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${userdata.photoUrl}`}
                className="max-h-[40px] max-w-[40px] rounded-full cursor-pointer"
                alt=""
              />
            )}
          </DropdownTrigger>
          <DropdownMenu disabledKeys={["usn"]} aria-label="Static Actions">
            <DropdownSection title="Current User" showDivider>
              <DropdownItem key="usn">@{userdata.username}</DropdownItem>
            </DropdownSection>
            <DropdownSection title="Menu">
            <DropdownItem startContent={<MdOutlinePerson />} href={`/profile`}>
              Akun Anda
            </DropdownItem>
            <DropdownItem startContent={<MdLogout />} onClick={logout} className="text-red-500">
              Keluar
            </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
