'use client'
import { useEffect, useState } from "react";
import Sidebar from "./components/layout/sidebar";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { motion } from 'framer-motion';

export default function Home() {
  const [search, setSearch] = useState("");
  const [imagespath, setImagesPath] = useState<any[]>([]);
  const [imagesearchpath, setImagesSearchPath] = useState<any[]>([]);
  const [searchpage, setSearchPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    setLoading(true);
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + "/photos?query=", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const imageData = response.data.data;
      if (Array.isArray(imageData)) {
        setImagesPath(imageData);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/photos?query=${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const imageSearchData = response.data.data;
      setSearchPage(true);
      if (Array.isArray(imageSearchData)) {
        setImagesSearchPath(imageSearchData);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="flex justify-between pt-20 px-5 lg:px-5">
        <Sidebar />
        {searchpage ? renderSearchPage() : renderHomePage()}
      </div>
    </>
  );

  function renderSearchPage() {
    return (
      <motion.div transition={{ type: 'easeInOut', duration: 0.3 }} className="konten flex justify-between scrollbar-thin scrollbar-thumb-neutral-300 flex-col w-full px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
        <div className="wrap overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 w-full overflow-x-hidden">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              {imagesearchpath.length === 0 ? (
                <p className="text-center">Tidak Ada Postingan Terkait Dengan Kata Kunci "<b>{search}</b>"</p>
              ) : (
                <>
                  <p className="text-center mb-5">Hasil Pencarian Terkait "<b>{search}</b>"</p>
                  <div className="lg:columns-4 md:columns-3 rounded-md columns-2 gap-3">
                    {imagesearchpath.map(renderImage)}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <form onSubmit={handleSearchSubmit} action="">
          {renderSearchBar()}
        </form>
      </motion.div>
    );
  }

  function renderHomePage() {
    return (
      <motion.div transition={{ type: 'easeInOut', duration: 0.3 }} className="konten flex justify-between scrollbar-thin scrollbar-thumb-neutral-300 flex-col w-full px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
        <div className="wrap overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 w-full overflow-x-hidden">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="lg:columns-4 md:columns-3 columns-2 rounded-md gap-3">
              {imagespath.map(renderImage)}
            </div>
          )}
        </div>
        <form onSubmit={handleSearchSubmit} action="">
          {renderSearchBar()}
        </form>
      </motion.div>
    );
  }

  function renderImage(image: any, index: number) {
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
  }

  function renderSearchBar() {
    return (
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
    );
  }
}

