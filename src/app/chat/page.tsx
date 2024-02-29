'use client'
import Sidebar from "../components/layout/sidebar";
import UserList from "../components/chat/userlist";
import ChatRoom from "../components/chat/chatroom";
import axios from "axios";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export default function Chat() {
  const [userdata, setUserData] = useState<any[]>([]);

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");

    

    try {
      const fetchUser = async () => {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setUserData(response.data.data);
      }
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="flex justify-between pt-20 px-5 lg:px-5">
        <Sidebar />
        <div className="konten overflow-hidden scrollbar-thin scrollbar-thumb-neutral-300 w-full overflow-x-hidden bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="flex overflow-hidden">
            <UserList userdata={userdata} />
            <ChatRoom />
          </div>
        </div>
      </div>
    </>
  );
}
