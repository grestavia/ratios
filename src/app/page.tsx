'use client'
import { useEffect, useState } from "react";
import Sidebar from "./components/layout/sidebar";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Button } from "@nextui-org/react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [imagespath, setImagesPath] = useState<any[]>([]);
  const [imagesearchpath, setImagesSearchPath] = useState<any[]>([]);
  const [searchpage, setSearchPage] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + "/photos?query=", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const imageData = response.data.data;
      if (Array.isArray(imageData)) {
        setImagesPath(imageData);
      }
    }

    fetchImage();
  }, [])

  const handleSearchSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/photos?query=${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const imageSearchData = response.data.data;
      setSearchPage(true);
      console.log(imageSearchData);
      if (Array.isArray(imageSearchData)) {
        setImagesSearchPath(imageSearchData);
      }
    } catch (error) {

    }
  }
  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  }

  return (
    <>
      <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
        <Sidebar />
        {searchpage ? (
          <>
            <div className="konten flex justify-between scrollbar-thin scrollbar-thumb-neutral-300 flex-col w-full px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
            <div className="wrap overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 w-full overflow-x-hidden">
                { imagesearchpath.length === 0 ? (
                  <>
                 <p className="text-center">Tidak Ada Postingan Terkait Dengan Kata Kunci "<b>{search}</b>"</p>
                  </>
                ) : (
                  <>
                  <div className="lg:columns-4 md:columns-3 columns-2 gap-3">
                  {imagesearchpath.map((image, index) => {
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
                  </>
                ) }
              </div>
              <form onSubmit={handleSearchSubmit} action="">
                <div className="searchbar bg-white p-2 w-full">
                  <div className="w-full flex justify-between rounded-xl border-2 p-1 border-[#07A081]">
                    <input
                      type="text"
                      onChange={handleSearchChange}
                      className="w-full pl-5 focus:outline-none"
                      placeholder="Temukan Gambar.."
                    />
                    <Button type="submit" className="bg-[#07A081] text-white p-2 rounded-lg">
                      <SearchIcon />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="konten flex justify-between scrollbar-thin scrollbar-thumb-neutral-300 flex-col w-full px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
              <div className="wrap overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 w-full overflow-x-hidden">
                <div className="lg:columns-4 md:columns-3 columns-2 gap-3">
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
              </div>
              <form onSubmit={handleSearchSubmit} action="">
                <div className="searchbar bg-white p-2 w-full">
                  <div className="w-full flex justify-between rounded-xl border-2 p-1 border-[#07A081]">
                    <input
                      type="text"
                      onChange={handleSearchChange}
                      className="w-full pl-5 focus:outline-none"
                      placeholder="Temukan Gambar.."
                    />
                    <Button type="submit" className="bg-[#07A081] text-white p-2 rounded-lg">
                      <SearchIcon />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
