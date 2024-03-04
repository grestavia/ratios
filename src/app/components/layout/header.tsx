"use client";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  dropdownSection,
  Button,
  DropdownSection
} from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MdLogout, MdOutlinePerson } from "react-icons/md";
import useSidebarStore from "@/app/useSidebarStore";

export default function Header() {
  const [userdata, setUserData] = useState<any>();

  const { setSidebar } = useSidebarStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_API_RATIO + `/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data.data);
        }
        catch (error) {
          console.log(error);
        }

      } else {
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    window.location.reload();
  };

  return (
    <>
      {userdata ? (
        <div className="header bg-[#F0F4F9] fixed top-0 flex-row w-full flex items-center justify-between p-[2px] md:p-[8px]">
          <div className="flex items-center w-full ml-3 md:ml-5">
            <Button className="min-w-0 px-1 bg-transparent" onPress={() => setSidebar()}>
              <MenuIcon />
            </Button>
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
                {userdata && (
                  <img
                    src={userdata?.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${userdata.photoUrl}`}
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
      ) : (
        <div className="header bg-[#F0F4F9] fixed top-0 flex-row w-full flex items-center justify-between p-[2px] md:p-[8px]">
          <div className="flex items-center w-full mt-4 ml-3 md:ml-5">
            <Button className="min-w-0 px-1 bg-transparent" onPress={() => setSidebar()}>
              <MenuIcon />
            </Button>
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
        </div>
      )}
    </>
  );
}
