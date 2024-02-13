import Header from "./components/layout/header"
import Sidebar from "./components/layout/sidebar"
import { CircularProgress } from "@nextui-org/react"

export default function Loading() {
  return(
    <>
    <Header />
    <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
      <Sidebar />
      <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
        <div className="flex items-center">
            <CircularProgress className="mx-auto" aria-label="Loading..." />
        </div>
      </div>
    </div>
    </>
  )
}
