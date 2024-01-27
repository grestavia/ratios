"use client"
import Header from "@/app/components/header"
import Sidebar from "@/app/components/sidebar"
import { MdOutlineUploadFile, MdOutlineImage, MdOutlineDeleteOutline } from 'react-icons/md';
import { useState } from "react"

export default function Upload() {

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No Selected File")

  return(
    <>
    <Header />
    <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
      <Sidebar />
      <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-2 lg:p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
        <div className="max-w-2xl">
          <form action="">
          <section className="head pt-2 pl-2 lg:pl-5 flex flex-col gap-0 lg:gap-1">
            <h1 className="lg:text-2xl text-md font-medium">Unggah Foto Terbaik Anda Disini</h1>
            <h3 className="text-xs">Pilih dan Unggah File Pilihan Anda</h3>
          </section>
          <hr className="mt-3" />
          <section className="mt-5 max-w-lg">
            <div className="upload h-[150px] lg:h-[200px] hover:bg-[#00000014] cursor-pointer flex flex-col gap-3 justify-center items-center w-full border-[3px] border-dashed rounded-xl border-[#07A081]"
            onClick={() => (document.querySelector(".input-field") as HTMLElement).click()}
            >
              <input type="file" name="" className="input-field hidden" accept="image/*" id=""
              onChange={({ target: {files}}) => {
                if(files && files.length > 0) {
                  setFileName(files[0].name)
                  setImage(URL.createObjectURL(files[0]))
                }
              }}
               />

              {image ? 
              <img src={image} width={100} />
              :
              <>
              <div className="bg-[#07a0811d] rounded-full p-2">
                <div className="bg-[#07a0814a] rounded-full p-2">
                <MdOutlineUploadFile color="#07A081" size={25} />
                </div>
              </div>
              <p className="text-[#07A081] text-sm">Klik untuk unggah <span className="text-black">foto terbaik anda</span></p>
              </>
             }
            </div>
            <div className="w-full border-1 border-[#07A081] rounded-lg mt-2 bg-[#07a0811d] p-2 items-center flex justify-between">
              <div className="flex items-center">
                <MdOutlineImage size={20} color="#07A081" />
                <div className="ml-2 whitespace-nowrap w-40 truncate">
                  {fileName}
                </div>
              </div>
              <MdOutlineDeleteOutline className="cursor-pointer" size={20} color="#f20000" onClick={
                  () => {
                    setFileName("No Selected File")
                    setImage(null)
                  }
                } />
            </div>
            <input type="text" name="" placeholder="Judul" id="" className="w-full border-1 border-[#07A081] rounded-md py-1 px-3 mt-2" />
            <textarea name="" id="" placeholder="Deskripsi Gambar.." className="w-full border-1 border-[#07A081] rounded-md py-1 px-3 mt-2"></textarea>
            <input type="submit" value="Unggah" className="w-full cursor-pointer bg-[#07A081] rounded-md py-1 px-2 mt-1 text-white" />
          </section>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
