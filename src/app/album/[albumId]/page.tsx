'use client'
import Sidebar from "@/app/components/sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Album({ params }: { params: { albumId: string } }) {
    const [albumdata, setAlbumData] = useState<any>([]);
    const [imagespath, setImagesPath] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const getDataAlbum = async () => {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/albums/${params.albumId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const dataAlbum = response.data.data;
            const photolist = dataAlbum.photos;
            console.log(dataAlbum);
            setAlbumData(dataAlbum);
            if (Array.isArray(photolist)) {
                const imageIds = photolist.map(image => image.id);
                setImagesPath(photolist);
            }
        }
        getDataAlbum();
    }, [])

    return (
        <>
            <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
                <Sidebar />
                <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
                    <div className="max-w-2xl">
                        <section className="head pt-2 pl-2 lg:pl-5 flex flex-col gap-0 lg:gap-1">
                            <h1 className="lg:text-2xl text-md font-medium">
                                {albumdata.title}
                            </h1>
                            <h3 className="text-sm">{albumdata.description}</h3>
                        </section>
                        <hr className="mt-3" />
                    </div>
                    <div className="mt-5">
                        {imagespath.length === 0 ? (
                            <p className="">Pengguna belum menambahkan gambar</p>
                        ) : (
                            <div className="w-full lg:columns-4 md:columns-3 columns-2 gap-3">
                            {imagespath.map((image, index) => {
                                return (
                                    <Link href={`/post/${image.id}`} key={index}>
                                        <div className="mb-3 hover:brightness-[.80] rounded-md transform hover:scale-[102%] transition ease-in">
                                            <img
                                                src={process.env.NEXT_PUBLIC_API_RATIO + `/files/images/photos/${image.locationFile}`}
                                                className="rounded-md mb-2"
                                                alt=""
                                            />
                                        </div>
                                    </Link>
                                );
                            })}
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}