import { Input, Button, User } from "@nextui-org/react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";

export default function ChatRoom() {

    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState<any>();

    useEffect(() => {
        const userid = localStorage.getItem("userid");
        setUserId(userid);
    })

    const firebaseConfig = {
        apiKey: "AIzaSyBo-uAkO5cZQnf6xw23ORfHhP_14JwGLJw",
        authDomain: "ratio-chat-app.firebaseapp.com",
        projectId: "ratio-chat-app",
        storageBucket: "ratio-chat-app.appspot.com",
        messagingSenderId: "891675590626",
        appId: "1:891675590626:web:0505d3ab8f9786c03703bb",
        measurementId: "G-TCPSYZ5S39"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const HandleSendComment = async () => {
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                message: {message},
                from: {userId},
                send_on: 1815,
                to: 'admin',
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e: any) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <>
            <div className="w-2/3 flex flex-col justify-between">
                <div>
                    <div className="w-full p-4">
                        <User
                            className="justify-start"
                            name={<p className="text-lg font-medium">Damarbumi</p>}
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                size: "md"
                            }}
                        />
                    </div>
                    <hr />
                </div>
                <div className="h-[calc(100vh-280px)] overflow-y-auto px-5 pt-3">
                    <div className="flex justify-end mb-2">
                        <div className="bg-[#07A081] max-w-[50%] break-words rounded-lg text-white py-2 px-4">
                            alo :D
                        </div>
                    </div>
                    <div className="flex justify-start mb-2">
                        <div className="bg-gray-200 border-2 max-w-[50%] break-words rounded-lg py-2 px-4">
                            alo jg mniez
                        </div>
                    </div>
                </div>
                <form onSubmit={HandleSendComment} className="p-4 border-2">
                    <Input onChange={(e) => setMessage(e.target.value)} type="text" variant="bordered" className="focus:outline-none" endContent={<Button type="submit" className="bg-[#07A081] text-white rounded-lg">Kirim</Button>} placeholder="Ketik pesan..." />
                </form>
            </div>
        </>
    );
}