import { Input, Button, User } from "@nextui-org/react";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { MdOutlineMessage } from "react-icons/md";
import { db } from "@/firebase/firebaseclient";

export default function ChatRoom({ selectedUser }: any) {

    const [message, setMessage] = useState<string>("");
    const [fromme, setFromMe] = useState<any[]>([]);
    const [forme, setForMe] = useState<any[]>([]);
    const [id, setId] = useState<string>();
    const [userchat, setUserChat] = useState<any>();
    const [userId, setUserId] = useState<any>();

    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        const token = localStorage.getItem("token");
        setUserId(userid);
        setId(userid ? String(userid) : "");

        async function chatRoom() {
            if (selectedUser) {
                try {
                    const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${selectedUser}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    console.log(response.data.data);
                    setUserChat(response.data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        async function outcoming() {
            if (userId && selectedUser) {
                const messageOut = query(collection(db, "messages", userId, selectedUser), orderBy('send_on'));

                const outcome = onSnapshot(messageOut, (snapshot) => {
                    const sortedMessagesData = snapshot.docs.map(doc => doc.data());
                    setFromMe(sortedMessagesData);
                });

                return outcome;
            }
        }

        async function incoming() {
            if (userId && selectedUser) {
                const messageIn = query(collection(db, "messages", selectedUser, userId), orderBy('send_on'));

                const income = onSnapshot(messageIn, (snapshot) => {
                    const sortedMessagesData = snapshot.docs.map(doc => doc.data());
                    setForMe(sortedMessagesData);
                })
                return income;
            }
        }

        function scrollToBottom() {
            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
            }
        }

        scrollToBottom();
        incoming();
        outcoming();
        chatRoom();
    }, [userId, selectedUser]);

    const HandleSendComment = async (e: any) => {
        e.preventDefault();
        setMessage("");
        try {
            const currentDate = new Date();
            const milliseconds = currentDate.getTime();
            const docRef = await addDoc(collection(db, "messages", userId, selectedUser), {
                message: message,
                from: userId,
                send_on: milliseconds,
                to: selectedUser,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e: any) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <>
            <div className={selectedUser ? "w-2/3 flex flex-col justify-between" : "w-2/3 flex items-center justify-center"}>
                {selectedUser ? (
                    <>
                        <div>
                            {userchat && forme && fromme && (
                                <div className="w-full p-4">
                                    <Link href={`/profile/${userchat.username}`}>
                                        <User
                                            className="justify-start"
                                            name={<p className="text-lg font-medium">{userchat.fullName}</p>}
                                            avatarProps={{
                                                src: userchat && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${userchat.photoUrl}`,
                                                size: "md"
                                            }}
                                        />
                                    </Link>
                                </div>
                            )}
                            <hr />
                        </div>
                        <div ref={messageContainerRef} className="h-[calc(100vh-280px)] overflow-y-auto px-5 pt-3">
                            {forme ? (
                                <>
                                    {[...fromme, ...forme].sort((a, b) => a.send_on - b.send_on).map((message, index) => {
                                        return (
                                            <div key={index}>
                                                {String(userId) === String(message.from) ? (
                                                    <>
                                                        <div className="flex justify-end mb-2">
                                                            <div className="bg-[#07A081] max-w-[50%] flex flex-col justify-end break-words rounded-lg text-white py-2 px-4">
                                                                <p className="text-end">{message.message}</p>
                                                                <p className="text-xs text-end text-neutral-200">
                                                                    {new Date(message.send_on).toLocaleString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric',
                                                                        hour: 'numeric',
                                                                        minute: 'numeric',
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex mb-2">
                                                            <div className="bg-neutral-200 max-w-[50%] flex flex-col break-words rounded-lg py-2 px-4">
                                                                <p className="">{message.message}</p>
                                                                <p className="text-xs text-black">
                                                                    {new Date(message.send_on).toLocaleString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric',
                                                                        hour: 'numeric',
                                                                        minute: 'numeric',
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <p>loading</p>
                                </>
                            )}
                        </div>
                        <form onSubmit={HandleSendComment} className="p-4 flex flex-row">
                            <Input autoComplete="off" value={message} onChange={(e) => setMessage(e.target.value)} type="text" variant="bordered" className="focus:outline-none focus:border-none py-0" endContent={<Button type="submit" className="bg-[#07A081] text-white rounded-lg">Kirim</Button>} placeholder="Ketik pesan..." />
                        </form>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-center mx-auto">
                            <MdOutlineMessage size={80} />
                            <h1 className="text-xl">Pesan Anda</h1>
                            <p className="text-sm">Kirim pesan pribadi ke pengguna lain</p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}