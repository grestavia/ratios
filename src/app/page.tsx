import Header from "@/app/components/header"
import Sidebar from "@/app/components/sidebar"
import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
  return(
    <>
    <Header />
    <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
      <Sidebar />
      <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
        <div className="lg:columns-4 md:columns-3 columns-2 gap-3">
          <Link href={'/'}><img src="https://source.unsplash.com/OyCl7Y4y0Bk" className="rounded-md mb-3" alt="" /></Link>
          <Link href={'/'}><img src="https://source.unsplash.com/Kl1gC0ve620" className="rounded-md mb-3" alt="" /></Link>
          <Link href={'/'}><img src="https://source.unsplash.com/55btQzyDiO8" className="rounded-md mb-3" alt="" /></Link>
          <Link href={'/'}><img src="https://source.unsplash.com/g0dBbrGmMe0" className="rounded-md mb-3" alt="" /></Link>
          <Link href={'/'}><img src="https://source.unsplash.com/v1OW17UcR-Q" className="rounded-md mb-3" alt="" /></Link>
          <Link href={'/'}><img src="https://source.unsplash.com/Wpg3Qm0zaGk" className="rounded-md mb-3" alt="" /></Link>
          <Link href={'/'}><img src="https://source.unsplash.com/W3FC_bCPw8E" className="rounded-md mb-3" alt="" /></Link>
        </div>
        <div className="searchbar sticky bg-white p-2 w-full bottom-0">
          <div className="w-full flex justify-between rounded-full border-2 p-2 border-[#07A081]">
            <input type="text" className="w-full pl-5" placeholder="Temukan Gambar.." />
            <button className="bg-[#07A081] text-white p-2 rounded-full"><SearchIcon /></button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
