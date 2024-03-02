'use client'

// Import React dan modul lainnya
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";
import Sidebar from "@/app/components/layout/sidebar";
import PhotoTab from "../components/profile/phototab";
import AlbumTab from "../components/profile/albumtab";
import Follower from "../components/profile/follower";
import Following from "../components/profile/following";
import { Button, Divider } from "@nextui-org/react";

// Komponen Profile
export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [imagedata, setImageData] = useState([]);
  const [albumdata, setAlbumData] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followerModalOpen, setFollowerModalOpen] = useState(false);
  const [following, setFollowing] = useState([]);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);
  const [userdata, setUserData] = useState<any>();
  const [followerLength, setFollowerLength] = useState(0);
  const [followingLength, setFollowingLength] = useState(0);

  useEffect(() => {
    // Ambil data user dari local storage
    const userId = localStorage.getItem("userid");
    const token = localStorage.getItem("token");

    // Fetch data user
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [response1, response2, response3, response4, response5] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_RATIO}/users/${userId}/photos`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${process.env.NEXT_PUBLIC_API_RATIO}/users/${userId}/followers`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${process.env.NEXT_PUBLIC_API_RATIO}/users/${userId}/albums`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${process.env.NEXT_PUBLIC_API_RATIO}/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${process.env.NEXT_PUBLIC_API_RATIO}/users/${userId}/following`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setImageData(response1.data.data);
        setFollowers(response2.data.data);
        setFollowerLength(response2.data.data.length);
        setAlbumData(response3.data.data);
        setUserData(response4.data.data);
        setFollowing(response5.data.data);
        setFollowingLength(response5.data.data.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed :", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-between pt-20 px-5 lg:px-5">
      <Sidebar />
      <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex justify-center items-center pt-3 flex-col md:pt-10 w-full">
              <div className="profile mx-auto flex gap-5 flex-col items-center">
                <img
                  src={userdata?.photoUrl && `${process.env.NEXT_PUBLIC_API_RATIO}/files/images/profiles/${userdata?.photoUrl}`}
                  className="p-1 bg-white border-3 border-dashed border-[#07A081] rounded-full w-[100px] h-[100px]"
                  alt=""
                />
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-semibold">{userdata?.fullName}</h1>
                  <h3 className="text-md">@{userdata?.username}</h3>
                </div>
                <section className="flex h-10 gap-2">
                  <Button onClick={() => setFollowerModalOpen(true)} className="bg-transparent">
                    <div>
                      <p className="text-md font-semibold">{followerLength}</p>
                      <p className="text-sm">Pengikut</p>
                    </div>
                  </Button>
                  <Follower isOpen={followerModalOpen} onClose={() => setFollowerModalOpen(false)} followers={followers} owner={true} />
                  <Divider orientation="vertical" />
                  <Button onPress={() => setFollowingModalOpen(true)} className="bg-transparent">
                    <div>
                      <p className="text-md font-semibold">{followingLength}</p>
                      <p className="text-sm">Mengikuti</p>
                    </div>
                  </Button>
                  <Following isOpen={followingModalOpen} onClose={() => setFollowingModalOpen(false)} following={following} />
                </section>
                <section>
                  <Link href="/profile/edit">
                    <Button className="bg-[#07A081] text-white p-2 rounded-lg">Edit Profile</Button>
                  </Link>
                </section>
              </div>
              <div className="w-full flex flex-col pt-3 items-center">
                <Tabs size="md" variant="underlined" aria-label="Options">
                  <Tab title="Post">
                    <PhotoTab data={imagedata} />
                  </Tab>
                  <Tab className="w-full" title="Album">
                    <AlbumTab user={null} data={albumdata} />
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
