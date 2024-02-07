"use client";
import Sidebar from "@/app/components/sidebar";
import { Tabs, Tab, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [userdata, setUserData] = useState<any>([]);
  const [imagedata, setImageData] = useState<any>([]);
  const [albumdata, setAlbumData] = useState<any>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData1 = async () => {
      const response1 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dataUser = response1.data.data;
      if (Array.isArray(dataUser)) {
        const userId = dataUser.map((user) => user.id);

        setUserData(dataUser[0]);
        console.log(dataUser[0]);

      }
    };
    const fetchData2 = async () => {
      const response2 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/photos/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dataPhoto = response2.data.data;
      setImageData(dataPhoto);

    };

    const fetchData3 = async () => {
      const response3 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/albums`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const dataAlbum = response3.data.data;
      setAlbumData(dataAlbum);
      console.log(dataAlbum);
    }

    fetchData1();
    fetchData2();
    fetchData3();
  }, []);

  const variant = "underlined";

  return (
    <>
      <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
        <Sidebar />
        <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="flex items-center pt-3 md:pt-10 w-full">
            <div className="profile mx-auto flex gap-5 flex-col items-center">
              <img
                src={
                  userdata?.photoUrl &&
                  process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${userdata?.photoUrl}`
                }
                className="p-1 bg-white border-3 border-dashed border-[#07A081] rounded-full w-[100px] h-[100px]"
                alt=""
              />
              <div className="flex flex-col items-center">
                <h1 className="text-xl font-semibold">{userdata?.fullName}</h1>
                <h3 className="text-md">@{userdata.username}</h3>
              </div>
              <section>
                <Link
                  href="/profile/edit"
                >
                  <button className="bg-[#07A081] text-white p-2 rounded-lg">
                    Edit Profile
                  </button>
                </Link>
              </section>
              <Tabs
                size="md"
                key={variant}
                variant={variant}
                aria-label="Options"
              >
                <Tab key="post" title="Post">
                  {imagedata.length === 0 ? (
                    <p className="text-gray-500">Kamu belum mengunggah foto apapun.</p>
                  ) : (
                    <div className="w-full lg:columns-4 md:columns-3 columns-2 gap-3">
                      {imagedata.map((image: any, index: any) => {
                        return (
                          <Link href={`/post/${image.id}`} key={index}>
                            <div className="mb-3 hover:brightness-[.80] transform hover:scale-[102%] transition ease-in">
                              <img
                                src={process.env.NEXT_PUBLIC_API_RATIO + `/files/images/photos/${image.locationFile}`}
                                alt=""
                                className="rounded-md mb-2"
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </Tab>
                <Tab key="album" title="Album">
                  {albumdata.length === 0 ? (
                    <p className="text-gray-500">Kamu belum mengunggah album apapun.</p>
                  ) : (
                    <div className="w-full lg:columns-4 md:columns-3 columns-2 gap-3">
                      {albumdata.map((album: any, index: any) => {
                      return (
                        <Link href={`/album/${album.id}`} key={index}>
                        <h1 key={index}>{album.title}</h1>
                        </Link>
                      )
                    })}
                    </div>
                  )}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
