import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function AlbumTab() {

    const [albumdata, setAlbumData] = useState<any>([]);
    const [userdata, setUserData] = useState<any>([]);

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
            setAlbumData(dataAlbum);
          }
          fetchData3();
        }
      }, [userdata]);

    return (
        <>
            {albumdata.length === 0 ? (
                <p className="text-gray-500">Kamu belum mengunggah album apapun.</p>
            ) : (
                <div className="w-full lg:columns-4 md:columns-3 columns-2 gap-3">
                    {albumdata.map((album: any, index: any) => {
                        return (
                            <Link href={`/album/${album.id}`} key={index}>
                                <h1 key={index}>{album.title}</h1>
                            </Link>
                        )
                    })}
                </div>
            )}
        </>
    );
}