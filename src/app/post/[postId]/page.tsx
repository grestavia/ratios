"use client";
import Sidebar from "@/app/components/sidebar";
import { User } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { MdFavoriteBorder, MdLibraryAdd } from "react-icons/md";
import { useEffect } from "react";
import axios from "axios";

export default function DetailPost({ params }: { params: { postId: string } }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputValue, setInputValue] = useState(0);
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [post, setPost] = useState<{ data?: any } | null>(null);
  const [likesCount, setLikesCount] = useState<number>(0);


  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchPost = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${params.postId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setPost(response.data);
        setLikesCount(response.data.data.likes.length);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [params]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setInputValue(value);

    const isInvalid = value < 5000;

    setIsInvalidInput(isInvalid);

    const submitButton = document.getElementById(
      "submitButton"
    ) as HTMLInputElement;
    if (submitButton) {
      submitButton.disabled = isInvalid;
    }
  };

  const formatNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
        <Sidebar />
        <div className="overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-2 md:p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full">
              <img
                className="rounded-lg w-full"
                src={post?.data.locationFile && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/photos/${post.data.locationFile}`}
                alt=""
              />
            </div>
            <div className="w-full p-3 md:p-5 flex flex-col">
              <h1 className="text-xl md:text-3xl font-semibold">{post?.data.title}</h1>
              <p className="md:text-md text-sm">{post?.data.description}</p>
              <Link href={`/profile/${post?.data.user.username}`}>
                <User
                  className="md:mt-5 mt-3 justify-start"
                  name={post?.data.user.fullName}
                  description={
                    <p>
                      @{post?.data.user.username}
                    </p>
                  }
                  avatarProps={
                    {
                      src: post?.data.user.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${post.data.user.photoUrl}`
                    }
                  }
                />
              </Link>
              <div className="flex gap-2 flex-col xl:flex-row w-full mt-3 justify-between">
                <button className="flex transition-all duration-300 ease-in-out hover:bg-[#07A081] hover:text-white items-center gap-1 w-full border-[#07A081] border-1 text-[#07A081] justify-center p-1 rounded-lg"><MdFavoriteBorder className="size-7" /> {likesCount} Suka</button>
                <button className="flex transition-all duration-300 ease-in-out hover:bg-[#07A081] hover:text-white items-center gap-1 w-full border-[#07A081] border-1 text-[#07A081] justify-center p-1 rounded-lg"><MdLibraryAdd className="size-7" /> Tambah Ke Album</button>
              </div>
              <button
                onClick={onOpen}
                className="w-full transition-all duration-300 ease-in-out mt-3 md:w-auto whitespace-nowrap rounded-lg p-2 bg-[#07A081] text-white border-1 hover:border-[#07A081] hover:text-[#07A081] hover:bg-transparent"
              >
                Kirim Donasi
              </button>
              <Modal
                className="rounded-lg"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
              >
                <ModalContent>
                  {(onClose) => (
                    <form onSubmit={handleSubmit}>
                      <ModalHeader className="flex flex-col gap-1">
                        Beri Donasi
                      </ModalHeader>
                      <ModalBody className="gap-0">
                        <hr />
                        <p className="mt-2 mb-2">
                          Masukkan nominal yang ingin Anda donasikan :
                        </p>
                        <input
                          type="number"
                          name=""
                          placeholder="Rp. 5.000"
                          className={`w-full border-${isInvalidInput ? "red" : "#07A081"
                            } rounded-md border-2 p-2`}
                          id=""
                          onChange={handleInputChange}
                        />
                        {isInvalidInput && (
                          <p className="text-red-500">
                            Nominal Donasi Minimal Rp. 5.000
                          </p>
                        )}
                        <div className="flex flex-col gap-0.5">
                          <p className="mt-3">
                            Subtotal: Rp. {formatNumber(inputValue)}
                          </p>
                          <p>Admin Fee: Rp. 1.000</p>
                          <p>Total: Rp. {formatNumber(inputValue + 1000)}</p>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <input
                          type="submit"
                          value="Tarik Dana"
                          id="submitButton"
                          className="disabled:bg-[#07a08154] disabled:cursor-not-allowed cursor-pointer bg-[#07A081] text-white p-2 rounded-md w-full"
                          disabled={isInvalidInput}
                        />
                      </ModalFooter>
                    </form>
                  )}
                </ModalContent>
              </Modal>
              <div className="comment mt-5 overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-[#F0F4F9] h-[250px] rounded-lg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
