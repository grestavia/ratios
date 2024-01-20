import Header from "@/app/components/header"
import Sidebar from "@/app/components/sidebar"
import Link from 'next/link'

export default function DetailPost() {
  return(
    <>
    <Header />
    <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
      <Sidebar />
      <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
        <div className="">
          
        </div>
      </div>
    </div>
    </>
  )
}
