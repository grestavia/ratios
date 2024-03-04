import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function PhotoTab({ data }: any) {
    const [userdata, setUserData] = useState<any>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userid");

        const fetchData1 = async () => {
            try {
                const response1 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const dataUser = response1.data.data;
                setUserData(dataUser);

            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchData1();
    }, []);

    return (
        <>
            {data.length === 0 ? (
                <p className="text-gray-500">Kamu belum mengunggah foto apapun.</p>
            ) : (
                <div className="w-full lg:columns-4 md:columns-3 columns-2 gap-3">
                    {data.map((image: any, index: any) => {
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
        </>
    )
}