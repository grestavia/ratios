'use client'
import { User, Input, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ChatRoom from "./chatroom";
import axios from "axios";
import { MdOutlineSearch } from "react-icons/md";

export default function UserList({ userdata }: any) {

    const [userId, setUserId] = useState<any>();
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>();
    const [users, setUsers] = useState<any[]>([]);
    const [onsearchuser, setOnSearchUser] = useState(false);
    const [searcheduser, setSearchedUser] = useState<any[]>([]);

    console.log(search);

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        const token = localStorage.getItem("token");
        setUserId(userid);

        async function fetchUser() {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/?query=`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setUsers(response.data.data);

            } catch (error) {
                console.log(error);
            }
        }

        fetchUser();
    }, [])

    const handleSearchUser = async (e: any) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setOnSearchUser(true);
            setSearchedUser(response.data.data);
            console.log(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex overflow-hidden">
                <div className="w-1/3 border-r">
                    {onsearchuser ? (
                        <>
                            <section className="sticky bg-white top-0">
                                <h1 className="mx-auto font-medium text-lg text-center pt-4">@{userdata.username}</h1>
                                <p className="mx-auto text-sm font-normal text-center pb-4">Pesan Pribadi</p>
                                <hr />
                            </section>
                            <section className="scrollbar-thin pt-3 scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-rounded-full overflow-auto max-h-[calc(100vh-190px)]">
                                <div className="px-3">
                                    <form onSubmit={handleSearchUser} action="">
                                        <Input onChange={(e) => setSearch(e.target.value)} variant="bordered" placeholder="Cari Pengguna" endContent={<Button type="submit" radius="full" isIconOnly className="bg-[#07A081]"><MdOutlineSearch color="white" size={20} /></Button>} radius="full" />
                                    </form>
                                </div>
                                <ul className="p-2 h-[calc(100vh-280px)]">
                                    {searcheduser.length === 0 ? (
                                        <div className="">
                                            <p className="text-center mt-4">Pengguna Tidak Ditemukan</p>
                                        </div>
                                    ) : (
                                        searcheduser.map((user) => (
                                            <li key={user.id} onClick={() => setSelectedUser(user.id)} className={user.id === selectedUser ? "w-full mb-2 py-2 px-5 cursor-pointer rounded-md bg-[#07A081]" : "w-full py-2 px-5 cursor-pointer rounded-md mb-2 hover:bg-neutral-200"}>
                                                <User
                                                    className="justify-start"
                                                    name={<p className={user.id === selectedUser ? "text-md text-white" : "text-md"}>{user.fullName}</p>}
                                                    description={<p className={user.id === selectedUser ? "text-white" : ""}>@{user.username}</p>}
                                                    avatarProps={{
                                                        src: user.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${user.photoUrl}`,
                                                        size: "lg"
                                                    }}
                                                />
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </section>
                        </>
                    ) : (
                        <>
                            <section className="sticky bg-white top-0">
                                <h1 className="mx-auto font-medium text-lg text-center pt-4">@{userdata.username}</h1>
                                <p className="mx-auto text-sm font-normal text-center pb-4">Pesan Pribadi</p>
                                <hr />
                            </section>
                            <section className="scrollbar-thin pt-3 scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-rounded-full overflow-auto max-h-[calc(100vh-190px)]">
                                <div className="px-3">
                                    <form onSubmit={handleSearchUser} action="">
                                        <Input onChange={(e) => setSearch(e.target.value)} variant="bordered" placeholder="Cari Pengguna" endContent={<Button type="submit" radius="full" isIconOnly className="bg-[#07A081]"><MdOutlineSearch color="white" size={20} /></Button>} radius="full" />
                                    </form>
                                </div>
                                <ul className="p-2">
                                    {users.map((user) => (
                                        <li key={user.id} onClick={() => setSelectedUser(user.id)} className={user.id === selectedUser ? "w-full mb-2 py-2 px-5 cursor-pointer rounded-md bg-[#07A081]" : "w-full py-2 px-5 cursor-pointer rounded-md mb-2 hover:bg-neutral-200"}>
                                            <User
                                                className="justify-start"
                                                name={<p className={user.id === selectedUser ? "text-md text-white" : "text-md"}>{user.fullName}</p>}
                                                description={<p className={user.id === selectedUser ? "text-white" : ""}>@{user.username}</p>}
                                                avatarProps={{
                                                    src: user.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${user.photoUrl}`,
                                                    size: "lg"
                                                }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </>
                    )}
                </div>
                <ChatRoom selectedUser={selectedUser} />
            </div>
        </>
    );
}
