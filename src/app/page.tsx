import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
        <Sidebar />
        <div className="konten flex flex-col px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="wrap overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 w-full overflow-x-hidden">
            <div className="lg:columns-4 md:columns-3 columns-2 gap-3">
              <Link href={"/"}>
                <div className="mb-3">
                  <img
                    src="https://source.unsplash.com/OyCl7Y4y0Bk"
                    className="rounded-md mb-2"
                    alt=""
                  />
                  <p className="px-3 font-semibold">Title uvuvwewe uvuvuvuvuweweawdawdawda</p>
                </div>
              </Link>
              <Link href={"/"}>
                <div>
                  <img
                    src="https://source.unsplash.com/Kl1gC0ve620"
                    className="rounded-md mb-2"
                    alt=""
                  />
                  <p className="px-3">Title</p>
                </div>
              </Link>
              <Link href={"/"}>
                <img
                  src="https://source.unsplash.com/55btQzyDiO8"
                  className="rounded-md mb-3"
                  alt=""
                />
              </Link>
              <Link href={"/"}>
                <img
                  src="https://source.unsplash.com/g0dBbrGmMe0"
                  className="rounded-md mb-3"
                  alt=""
                />
              </Link>
              <Link href={"/"}>
                <img
                  src="https://source.unsplash.com/v1OW17UcR-Q"
                  className="rounded-md mb-3"
                  alt=""
                />
              </Link>
              <Link href={"/"}>
                <img
                  src="https://source.unsplash.com/Wpg3Qm0zaGk"
                  className="rounded-md mb-3"
                  alt=""
                />
              </Link>
              <Link href={"/"}>
                <img
                  src="https://source.unsplash.com/W3FC_bCPw8E"
                  className="rounded-md mb-3"
                  alt=""
                />
              </Link>
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
