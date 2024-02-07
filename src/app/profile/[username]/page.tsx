'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/app/components/sidebar";
import { Tabs, Tab, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchUser({ params }: { params: { username: string } }) {
    const variant = "underlined";
    const router = useRouter();
    const [userdata, setUserData] = useState<any>([]);
    const [imagedata, setImageData] = useState<any>([]);
    const [usercheck, setUserCheck] = useState<any>([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchDataUser = async () => {
            const response1 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/account/${params.username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const dataUser = response1.data.data;
            if (Array.isArray(dataUser)) {
                const userId = dataUser.map((user) => user.id);
                setUserData(dataUser[0]);
                console.log(dataUser[0]);
                setImageData(dataUser[0].photos);
            }
        };
        const checkUser = async () => {
            const response1 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/account`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const dataUser = response1.data.data;
            if (Array.isArray(dataUser)) {
                const userId = dataUser.map((user) => user.id);

                setUserCheck(dataUser[0]);
                console.log(dataUser[0]);
            }
        };
        fetchDataUser();
        checkUser();
    }, [])

    if (usercheck.username == params.username) {
        router.push('/profile')
    }
    return (
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
                        <section className="flex gap-2">
                            <Link
                                href="/"
                            >
                                <button className="bg-[#07A081] text-white p-2 rounded-lg">
                                    Ikuti
                                </button>
                            </Link>
                            <Link
                                href="/"
                            >
                                <button className="border-[#07A081] border-2 text-[#07A081] p-2 rounded-lg">
                                    Kirim Pesan
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
                                    <p className="text-gray-500">Pengguna ini belum mengunggah foto apapun.</p>
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
                                <h1>Album</h1>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}