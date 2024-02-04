'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/app/components/sidebar";
import { Tabs, Tab, Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function SearchUser({ params }: { params: { username: string } }) {
    const variant = "underlined";
    const [userdata, setUserData] = useState<any>([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchDataUser = async () => {
            const response1 = await axios.get(`http://localhost:5000/users/account/${params.username}`, {
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
        fetchDataUser();
    }, [])
    return (
        <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
            <Sidebar />
            <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
                <div className="flex items-center pt-3 md:pt-10 w-full">
                    <div className="profile mx-auto flex gap-5 flex-col items-center">
                        <img
                            src={
                                userdata?.photoUrl &&
                                `http://localhost:5000/files/images/profiles/${userdata?.photoUrl}`
                            }
                            className="p-1 bg-white border-3 border-dashed border-[#07A081] rounded-full w-[100px] h-[100px]"
                            alt=""
                        />
                        <div className="flex flex-col items-center">
                            <h1 className="text-xl font-semibold">{userdata?.fullName}</h1>
                            <h3 className="text-md">@{userdata.username}</h3>
                        </div>
                        <Tabs
                            size="md"
                            key={variant}
                            variant={variant}
                            aria-label="Options"
                        >
                            <Tab key="post" title="Post">
                                <h1>Post</h1>
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