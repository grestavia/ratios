import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function PhotoTab() {

    const [userdata, setUserData] = useState<any>([]);
    const [imagedata, setImageData] = useState<any>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData1 = async () => {
          const response1 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/account`, {
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

      useEffect (() => {
        const token = localStorage.getItem("token");
        if (userdata.id) {
          const fetchData2 = async () => {
            const response2 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/photos/users/${userdata.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const dataPhoto = response2.data.data;
            setImageData(dataPhoto);
          };
          fetchData2();
      }}, [userdata]);

    return (
        <>
            {imagedata.length === 0 ? (
                <p className="text-gray-500">Kamu belum mengunggah foto apapun.</p>
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
        </>
    )
}