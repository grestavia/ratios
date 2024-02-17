'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/app/components/layout/sidebar";
import { Tabs, User, Tab, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalProps, Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlbumTab from "@/app/components/profile/albumtab";
import Follower from "@/app/components/profile/follower";
import Following from "@/app/components/profile/following";

export default function SearchUser({ params }: { params: { username: string } }) {
    const router = useRouter();
    const [userdata, setUserData] = useState<any>([]);
    const [userlogged, setUserLogged] = useState<any>([]);
    const [isFollowed, setIsFollowed] = useState(false);
    const [imagedata, setImageData] = useState<any>([]);
    const [usercheck, setUserCheck] = useState<any>([]);
    const [albumdata, setAlbumData] = useState<any>([]);
    const [followers, setFollowers] = useState<any>([]);
    const [following, setFollowing] = useState<any>([]);
    const [followinglength, setFollowingLength] = useState<any>([]);
    const [followerlength, setFollowerLength] = useState<any>([]);
    const [followerModalOpen, setFollowerModalOpen] = useState(false);
    const [followingModalOpen, setFollowingModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        //Get Data dari User yang Sedang Diakses
        const fetchDataUser = async () => {
            try {
                const response1 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${params.username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const dataUser = response1.data.data;
                setImageData(dataUser.photos);
                setUserData(dataUser);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        // Get Data User Yang Sedang Login
        const checkUser = async () => {
            try {
                const response1 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const dataUser = response1.data.data;
                if (Array.isArray(dataUser) && dataUser.length > 0) {
                    setUserCheck(dataUser[0]);
                    setUserLogged(dataUser[0].id);
                }
            } catch (error) {
                console.error("Failed to check user:", error);
            }
        };
        fetchDataUser();
        checkUser();
    }, [params.username]);

    // Get Data Follower + Cek Apakah User yang Sedang Login Sudah Follow
    useEffect(() => {
        if (userdata.id) {
            const token = localStorage.getItem("token");
            const fetchUserFollower = async () => {
                try {
                    const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userdata.id}/followers`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    const followers = response.data.data;
                    console.log(followers);
                    if (Array.isArray(followers)) {
                        setFollowers(followers);
                    }
                    setFollowerLength(followers.length);
                    const isUserFollowed = followers.some((follower: any) => follower.id === userlogged);
                    setIsFollowed(isUserFollowed);
                } catch (error) {
                    console.error("Failed :", error);
                }
            }
            fetchUserFollower();

            const fetchUserFollowing = async () => {
                try {
                  const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userdata.id}/following`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                  })
                  console.log(response.data.data);
                  const following = response.data.data;
                  if (Array.isArray(following)) {
                    setFollowing(following);
                  }
                  setFollowingLength(response.data.data.length);
                } catch (error) {
                  console.error("Failed :", error);
                }
              }
              fetchUserFollowing();
        }
    }, [userdata.id]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (userdata.id) {
            const fetchData3 = async () => {
                const response3 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userdata.id}/albums`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const dataAlbum = response3.data.data;
                console.log(dataAlbum);
                setAlbumData(dataAlbum);
            }
            fetchData3();
        }
    }, [userdata]);

    //Handler Button Follow
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
        <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
            <Sidebar />
            <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
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
                            <Link href="/">
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
                            <Tab key="album" className="w-full" title="Album">
                                <AlbumTab data={albumdata} user={params.username} />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}