"use client";
import Sidebar from "../components/sidebar";
import {
  MdOutlineUploadFile,
  MdOutlineImage,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { Button } from "@nextui-org/react"; 
import { useRouter } from "next/navigation";

export default function Upload() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [fileName, setFileName] = useState("No Selected File");
  const [description, setDescription] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [sucessAlert, setSucessAlert] = useState(false);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhoto(file);
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!photo) {
      console.error("Please select a photo.");
      return;
    }

    const payload = {
      locationFile: photo,
      title: title,
      description: description
    }

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + "/photos", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
      });
      console.log("Photo uploaded successfully:", response.data);
      const postData = response.data.data;
      setSucessAlert(true);
      setTimeout(() => {
        setSucessAlert(false);
      }, 3000);
      router.push(`/post/${postData.id}`);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <>{sucessAlert && (
      <Alert
        variant="filled"
        className="fixed left-1/2 top-2 transform -translate-x-1/2 z-10"
        severity="success"
      >
        Gambar Berhasil di Post
      </Alert>
    )}
      <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
        <Sidebar />
        <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-2 lg:p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="max-w-2xl">
            <form action="" onSubmit={handleSubmit}>
              <section className="head pt-2 pl-2 lg:pl-5 flex flex-col gap-0 lg:gap-1">
                <h1 className="lg:text-3xl text-md font-medium">
                  Unggah Foto Terbaik Anda Disini
                </h1>
                <h3 className="text-sm">Pilih dan Unggah File Pilihan Anda</h3>
              </section>
              <hr className="mt-3" />
              <section className="mt-5 max-w-lg">
                <div
                  className="upload h-[150px] lg:h-[200px] hover:bg-[#00000014] cursor-pointer flex flex-col gap-3 justify-center items-center w-full border-[3px] border-dashed rounded-xl border-[#07A081]"
                  onClick={() =>
                    (
                      document.querySelector(".input-field") as HTMLElement
                    ).click()
                  }
                >
                  <input
                    type="file"
                    name="locationFile"
                    className="input-field hidden"
                    accept="image/*"
                    id=""
                    onChange={handlePhotoChange}
                  />

                  {image ? (
                    <img src={image} width={100} />
                  ) : (
                    <>
                      <div className="bg-[#07a0811d] rounded-full p-2">
                        <div className="bg-[#07a0814a] rounded-full p-2">
                          <MdOutlineUploadFile color="#07A081" size={25} />
                        </div>
                      </div>
                      <p className="text-[#07A081] text-sm">
                        Klik untuk unggah{" "}
                        <span className="text-black">foto terbaik anda</span>
                      </p>
                    </>
                  )}
                </div>
                <div className="w-full border-1 border-[#07A081] rounded-lg mt-2 bg-[#07a0811d] p-2 items-center flex justify-between">
                  <div className="flex items-center">
                    <MdOutlineImage size={20} color="#07A081" />
                    <div className="ml-2 whitespace-nowrap w-40 truncate">
                      {fileName}
                    </div>
                  </div>
                  <MdOutlineDeleteOutline
                    className="cursor-pointer"
                    size={20}
                    color="#f20000"
                    onClick={() => {
                      setFileName("No Selected File");
                      setImage(null);
                    }}
                  />
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Judul"
                  id=""
                  className="w-full border-1 border-[#07A081] rounded-md py-1 px-3 mt-2"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  name="description"
                  id=""
                  placeholder="Deskripsi Gambar.."
                  className="w-full border-1 border-[#07A081] rounded-md py-1 px-3 mt-2"
                  onChange={(e) => setDescription(e.target.value)}

                ></textarea>
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-[#07A081] rounded-md py-1 px-2 mt-1 text-white"
                >Unggah</Button>
              </section>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
