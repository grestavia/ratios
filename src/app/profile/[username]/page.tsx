'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/app/components/layout/sidebar";
import { Tabs, User, Tab, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalProps, Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlbumTab from "@/app/components/profile/albumtab";
import PhotoTab from "@/app/components/profile/phototab";
import Follower from "@/app/components/profile/follower";
import Following from "@/app/components/profile/following";

export default function SearchUser({ params }: { params: { username: string } }) {
    const router = useRouter();
    const [userdata, setUserData] = useState<any>([]);
    const [isFollowed, setIsFollowed] = useState(false);
    const [imagedata, setImageData] = useState<any>([]);
    const [usercheck, setUserCheck] = useState<any>([]);
    const [albumdata, setAlbumData] = useState<any>([]);
    const [followers, setFollowers] = useState<any[]>([]);
    const [following, setFollowing] = useState<any>([]);
    const [followinglength, setFollowingLength] = useState<any>([]);
    const [followerlength, setFollowerLength] = useState<any>([]);
    const [followerModalOpen, setFollowerModalOpen] = useState(false);
    const [followingModalOpen, setFollowingModalOpen] = useState(false);
    const [userId, setUserId] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userid = localStorage.getItem("userid");
        setUserId(userid);
        setIsLoading(true);

        const fetchUser = async () => {
            try {
                const [response1, response2] = await Promise.all([
                    axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${params.username}`, { headers: { Authorization: `Bearer ${token}`, }, }),
                    axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userid}`, { headers: { Authorization: `Bearer ${token}`, }, }),
                ])
                setImageData(response1.data.data.photos);
                setUserData(response1.data.data);
                setUserCheck(response2.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUser();
    }, [params.username]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        if (userdata.id) {
            const fetchFollow = async () => {
                try {
                    const [response3, response4, response5] = await Promise.all([
                        axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userdata.id}/followers`, { headers: { Authorization: `Bearer ${token}`, } }),
                        axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userdata.id}/following`, { headers: { Authorization: `Bearer ${token}`, } }),
                        axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userdata.id}/albums`, { headers: { Authorization: `Bearer ${token}`, } }),
                    ]);
                    setFollowers(response3.data.data);
                    setFollowerLength(response3.data.data.length);
                    setFollowing(response4.data.data);
                    setFollowingLength(response4.data.data.length);
                    setAlbumData(response5.data.data);
                    const isUserFollowed = response3.data.data.some((follower: any) => follower.id === userId);
                    setIsFollowed(isUserFollowed);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Failed :", error);
                }
            }
            fetchFollow();
        }
    }, [userdata]);

    const handleFollowClick = async () => {
        if (userdata.id) {
            const fetchUserFollower = async () => {
                try {
                    const token = localStorage.getItem("token");
                    let response;
                    if (isFollowed) {
                        response = await axios.delete(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userdata.id}/unfollow`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        })
                        setFollowerLength(followerlength - 1);
                        console.log(response.data);
                    } else {
                        response = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userdata.id}/follow`, null, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        });
                        const data = response.data;
                        console.log(data);
                        setFollowerLength(followerlength + 1);
                    }
                    setIsFollowed(!isFollowed);
                } catch (error) {
                    console.error("Failed :", error);
                }
            };
            fetchUserFollower();
        }
    };

    if (usercheck.username == params.username) {
        router.push('/profile')
    }

    return (
        <div className="flex justify-between pt-20 px-5 lg:px-5">
            <Sidebar />
            <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
                {isLoading ? (
                    <>
                        <p>Loading...</p>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center items-center pt-3 flex-col md:pt-10 w-full">
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
                                <section className="flex h-10 gap-2">
                                    <Button onClick={() => setFollowerModalOpen(true)} className="bg-transparent">
                                        <div>
                                            <p className="text-md font-semibold">{followerlength}</p>
                                            <p className="text-sm">Pengikut</p>
                                        </div>
                                    </Button>
                                    <Follower
                                        isOpen={followerModalOpen}
                                        onClose={() => setFollowerModalOpen(false)}
                                        followers={followers}
                                        owner={false}
                                    />
                                    <Divider orientation="vertical" />
                                    <Button onPress={() => setFollowingModalOpen(true)} className="bg-transparent">
                                        <div>
                                            <p className="text-md font-semibold">{followinglength}</p>
                                            <p className="text-sm">Mengikuti</p>
                                        </div>
                                    </Button>
                                    <Following
                                        isOpen={followingModalOpen}
                                        onClose={() => setFollowingModalOpen(false)}
                                        following={following}
                                    />
                                </section>
                                <section className="flex gap-2">
                                    <Button onClick={handleFollowClick} className={isFollowed ? "border-[#07A081] bg-white rounded-lg border-2 text-[#07A081]" : "text-white rounded-lg bg-[#07A081]"}>
                                        {isFollowed ? "Diikuti" : "Ikuti"}
                                    </Button>
                                    <Link href="/chat">
                                        <Button className="border-[#07A081] bg-white border-2 text-[#07A081] p-2 rounded-lg">
                                            Kirim Pesan
                                        </Button>
                                    </Link>
                                </section>
                            </div>
                            <div className="w-full flex flex-col pt-3 items-center">
                                <Tabs
                                    size="md"
                                    key={"underlined"}
                                    variant={"underlined"}

                                    aria-label="Options"
                                >
                                    <Tab key="post" title="Post">
                                        <PhotoTab data={imagedata} />
                                    </Tab>
                                    <Tab key="album" className="w-full" title="Album">
                                        <AlbumTab data={albumdata} user={params.username} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}