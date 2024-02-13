import Header from "../components/layout/header";
import Sidebar from "../components/layout/sidebar";

export default function Chat() {
  return (
    <>
      <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
        <Sidebar />
        <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
            
        </div>
      </div>
    </>
  );
}
