"use client";
import Sidebar from "@/app/components/layout/sidebar";
import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";
import PhotoTab from "../components/profile/phototab";
import AlbumTab from "../components/profile/albumtab";
import { useEffect, useState } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Divider, User } from "@nextui-org/react";
import axios from "axios";

export default function Profile() {
  const [userdata, setUserData] = useState<any>([]);
  const [followers, setFollowers] = useState<any>([]);
  const [albumdata, setAlbumData] = useState<any>([]);
  const [followerlength, setFollowerLength] = useState<any>([]);
  const [following, setFollowing] = useState<any>([]);
  const [followinglength, setFollowingLength] = useState<any>([]);
  const [followerModalOpen, setFollowerModalOpen] = useState(false);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);

  //Get Data dari User yang Sedang Diakses
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData1 = async () => {
      const response1 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users`, {
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

  //Get Data Photo yang Dipost User
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

  const variant = "underlined";

  return (
    <>
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
                <Modal
                  isOpen={followerModalOpen}
                  scrollBehavior={"inside"}
                  backdrop={"blur"}
                  onClose={() => setFollowerModalOpen(false)}
                >
                  <ModalContent>
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Pengikut
                      </ModalHeader>
                      <ModalBody>
                        {followers.map((follower: any) => (
                          <>
                            <Link href={`/profile/${follower.username}`}>
                              <Button className="py-7 px-2 bg-transparent flex justify-start">
                                <User
                                  name={follower.fullName}
                                  description={<p>@{follower.username}</p>}
                                  avatarProps={{
                                    src: follower.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${follower.photoUrl}`,
                                  }}
                                />
                              </Button>
                            </Link>
                            <hr />
                          </>
                        ))}
                      </ModalBody>
                      <ModalFooter>
                      </ModalFooter>
                    </>
                  </ModalContent>
                </Modal>
                <Divider orientation="vertical" />
                <Button onPress={() => setFollowingModalOpen(true)} className="bg-transparent">
                  <div>
                    <p className="text-md font-semibold">{followinglength}</p>
                    <p className="text-sm">Mengikuti</p>
                  </div>
                </Button>
                <Modal
                  isOpen={followingModalOpen}
                  scrollBehavior={"inside"}
                  backdrop={"blur"}
                  onClose={() => setFollowingModalOpen(false)}
                >
                  <ModalContent>
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Mengikuti
                      </ModalHeader>
                      <ModalBody>
                        {following.map((followin: any) => (
                          <>
                            <Link href={`/profile/${followin.username}`}>
                              <Button className="py-7 px-2 bg-transparent flex justify-start">
                                <User
                                  name={followin.fullName}
                                  description={<p>@{followin.username}</p>}
                                  avatarProps={{
                                    src: followin.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${followin.photoUrl}`,
                                  }}
                                />
                              </Button>
                            </Link>
                            <hr />
                          </>
                        ))}
                      </ModalBody>
                      <ModalFooter>
                      </ModalFooter>
                    </>
                  </ModalContent>
                </Modal>
              </section>
              <section>
                <Link
                  href="/profile/edit"
                >
                  <Button className="bg-[#07A081] text-white p-2 rounded-lg">
                    Edit Profile
                  </Button>
                </Link>
              </section>
            </div>
            <div className="w-full flex flex-col pt-3 items-center">
            <Tabs
              size="md"
              key={variant}
              variant={variant}
              
              aria-label="Options"
            >
              <Tab key="post" title="Post">
                <PhotoTab />
              </Tab>
              <Tab key="album" className="w-full" title="Album">
                <AlbumTab user={userdata.username} data={albumdata} />
              </Tab>
            </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
