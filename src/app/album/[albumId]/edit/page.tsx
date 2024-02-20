'use client'
import Sidebar from "@/app/components/layout/sidebar"
import axios from "axios"
import { useState, useEffect } from "react"
import { Input, Textarea, Button } from "@nextui-org/react"
import {
  MdOutlineUploadFile,
  MdOutlineImage,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { useRouter } from "next/navigation"

export default function EditAlbum({ params }: { params: { albumId: string } }) {

  const router = useRouter();

  const [albumdata, setAlbumData] = useState<any>([]);
  const [images, setImages] = useState<any[]>([]);

  const handleAlbumUpdate = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const payload = {
      title: albumdata.title,
      description: albumdata.description
    }

    try {
      const response = await axios.put(process.env.NEXT_PUBLIC_API_RATIO + `/albums/${params.albumId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(response.data);
      router.push("/album/" + params.albumId);
    } catch (error) {
      console.log(error);
    }
  }

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
      console.log(photolist);
      setAlbumData(dataAlbum);
      if (Array.isArray(photolist)) {
        const imageIds = photolist.map(image => image.id);
        setImages(photolist);
      }
    }
    getDataAlbum();
  }, [])

  return (
    <>
      <div className="flex justify-between pt-20 px-5 lg:px-5">
        <Sidebar />
        <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="max-w-2xl">
            <form onSubmit={handleAlbumUpdate}>
              <section className="head pt-2 pl-2 lg:pl-5 flex flex-col gap-0 lg:gap-1">
                <h1 className="lg:text-3xl truncate whitespace-nowrap text-md font-medium">
                  Edit Album "{albumdata.title}"
                </h1>
                <p>Ubah Info Album beserta Isinya</p>
              </section>
              <hr className="mt-3" />
              <Input
                type="text"
                value={albumdata.title} className="mt-5 w-full mb-1 border-2 border-[#07A081] rounded-lg focus:outline-none"
                onChange={(e) => setAlbumData({ ...albumdata, title: e.target.value })}
                label="Judul Album"
              />
              <Textarea
                value={albumdata.description}
                className="w-full mb-1 border-2 border-[#07A081] rounded-lg focus:outline-none"
                onChange={(e) => setAlbumData({ ...albumdata, description: e.target.value })}
                label="Deskripsi Album"
              />
              <Button type="submit" className="w-full cursor-pointer bg-[#07A081] rounded-lg py-3 px-2 text-white">Simpan</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}