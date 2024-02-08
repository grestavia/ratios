"use client";
import Sidebar from "@/app/components/sidebar";
import { User } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { MdFavoriteBorder, MdLibraryAdd, MdFavorite, MdArrowUpward } from "react-icons/md";
import { useEffect } from "react";
import axios from "axios";

export default function DetailPost({ params }: { params: { postId: string } }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputValue, setInputValue] = useState(0);
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [post, setPost] = useState<{ data?: any } | null>(null);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState(false);
  const [currentUserId, setUserId] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [commentlist, setCommentList] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Get Data User Saat Ini
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData1 = async () => {
      const response1 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dataUser = response1.data.data;
      if (Array.isArray(dataUser)) {
        const userId = dataUser.map((user) => user.id);
        setUserId(dataUser[0].id);
        setCurrentUser(dataUser[0]);
      }
    };
    fetchData1();
  }, [])

  // Get Data Post dan Set Status Like
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchPost = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${params.postId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setLikesCount(response.data.data.likes.length);
        const commentsData = response.data.data.comentars;
        if (Array.isArray(commentsData)) {
          const commentIds = commentsData.map(comment => comment.id);
          setCommentList(commentsData);
        }
        setPost(response.data);
        console.log(response.data.data);
        // Cek Apakah User Sudah Menyukai Postingan
        const isUserLiked = response.data.data.likes.some((like: any) => like.userId === currentUserId);
        setIsLiked(isUserLiked);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [params, currentUserId]);

  // Handler Nilai Input, Validasi
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const isInvalid = value < 5000;
    setInputValue(value);
    setIsInvalidInput(isInvalid);
    const submitButton = document.getElementById(
      "submitButton"
    ) as HTMLInputElement;
    if (submitButton) {
      submitButton.disabled = isInvalid;
    }
  };

  // Format Angka
  const formatNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handler Submit Form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleComment = async (e: any) => {
    try {
      const token = localStorage.getItem('token');
      const payload = {
        comentar: comments,
      }
      const commentResponse = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${params.postId}/comentar`, payload, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(commentResponse.data);
    } catch (error) {
      console.error("Error handling comment:", error);
    }

  }

  // Handler Like
  const handleLikeClick = async () => {
    try {
      const token = localStorage.getItem('token');
      let response;

      if (isLiked) {
        // Jika Sudah Like, Maka Fungsi TOmbol Menjadi Delete Like
        response = await axios.delete(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${params.postId}/like`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setLikesCount(likesCount - 1);
      } else {
        // Jika Belum Like, Fungsi Tombol Menjadi Post Like
        response = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${params.postId}/like`, null, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setLikesCount(likesCount + 1);
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const isOwner = currentUser && post && currentUser.id === post.data.user.id;

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
                <Button onClick={handleLikeClick} className={isLiked ? "flex border-1 items-center gap-1 w-full bg-[#07A081] text-white justify-center p-1 rounded-lg" : "flex transition-all items-center gap-1 w-full border-[#07A081] bg-white border-1 text-[#07A081] justify-center p-1 rounded-lg"}>{isLiked ? <MdFavorite className="size-5" /> : <MdFavoriteBorder className="size-5" />} {likesCount} Suka</Button>
                <Button className="flex bg-white items-center gap-1 w-full border-[#07A081] border-1 text-[#07A081] justify-center p-1 rounded-lg"><MdLibraryAdd className="size-5" /> Tambah Ke Album</Button>
              </div>
              {isOwner ? (
                <>
                  <Link href={`/post/${post?.data.id}/edit`} className="w-full">
                    <Button className="w-full transition-all duration-300 ease-in-out mt-3 rounded-lg p-2 bg-[#07A081] text-white border-1">
                      Edit Postingan
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    onClick={onOpen}
                    className="w-full mt-3 md:w-auto whitespace-nowrap rounded-lg p-2 bg-[#07A081] text-white border-1"
                  >
                    Kirim Donasi
                  </Button>
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
                </>
              )}
              <div className="flex mt-5 p-2 bg-[#F0F4F9] gap-3 rounded-xl flex-col">
                <div className="overflow-scroll h-[350px] scrollbar-thin scrollbar-thumb-neutral-300 w-full overflow-x-hidden">
                  <div>
                    <h1 className="text-lg text-stone-600 font-medium p-3">Komentar</h1>
                    <hr className="px-5" />
                    {commentlist.map((komentar: any, index: any) => {
                      return (
                        <>
                          <div className="px-3 mt-5">
                            <Link href={`/profile/${komentar.user.username}`}>
                            <User
                              name={komentar.user.fullName}
                              description= {
                                <p>
                                  @{komentar.user.username}
                                </p>
                              }
                              avatarProps={{
                                src: komentar.user.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${komentar.user.photoUrl}`,
                                size: "sm"
                              }}
                            />
                            </Link>
                            <p className="text-md">{komentar.comentar}</p>
                          </div>
                        </>
                      )
                    }
                    )}
                  </div>
                </div>
                <div className="rounded-xl bg-white w-full">
                  <form onSubmit={handleComment}>
                    <div className="w-full flex justify-between rounded-xl gap-2 border-2 p-1 border-[#07A081]">
                      <input
                        type="text"
                        onChange={(e) => setComments(e.target.value)}
                        className="w-full pl-2 focus:outline-none"
                        placeholder="Tambah Komentar"
                      />
                      <Button type="submit" className="bg-[#07A081] text-white rounded-lg">
                        <MdArrowUpward />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
