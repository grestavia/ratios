'use client'
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export default function Home() {
  const [sidebar, setSidebar] = useState(true);
  const [imagespath, setImagesPath] = useState<any[]>([]);

  useEffect(()=> {
    const fetchImage = async () => {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + "/photos");
      const imageData = response.data.data;
      if (Array.isArray(imageData)) {
        const imageIds = imageData.map(image => image.id);
        setImagesPath(imageData);
      }
    }

    fetchImage();
  },[])

  return (
    <>
      <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
        {sidebar && <Sidebar />}
        <div className="konten flex justify-between scrollbar-thin scrollbar-thumb-neutral-300 flex-col w-full px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="wrap overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 w-full overflow-x-hidden">
            <div className="lg:columns-4 md:columns-3 columns-2 gap-3">
              { imagespath.map((image, index) => {
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
              }) }
            </div>
          </div>
          <div className="searchbar bg-white p-2 w-full">
            <div className="w-full flex justify-between rounded-xl border-2 p-1 border-[#07A081]">
              <input
                type="text"
                className="w-full pl-5 focus:outline-none"
                placeholder="Temukan Gambar.."
              />
              <button className="bg-[#07A081] text-white p-2 rounded-lg">
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
