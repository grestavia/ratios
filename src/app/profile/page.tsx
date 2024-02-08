"use client";
import Sidebar from "@/app/components/sidebar";
import { Tabs, Tab, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
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
      }
    };
    fetchData1();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (userdata.id) {
      const fetchData2 = async () => {
        const response2 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/photos/users/${userdata.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dataPhoto = response2.data.data;
        setImageData(dataPhoto);
      };
      fetchData2();

      const fetchData3 = async () => {
        const response3 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/albums/users/${userdata.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const dataAlbum = response3.data.data;
        setAlbumData(dataAlbum);
      }
      fetchData3();
    }
  }, [userdata]);

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
                  <Button className="bg-[#07A081] text-white p-2 rounded-lg">
                    Edit Profile
                  </Button>
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
