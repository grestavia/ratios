"use client";
import Sidebar from "@/app/components/layout/sidebar";
import {
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { MdFavoriteBorder, MdLibraryAdd, MdFavorite, MdArrowUpward } from "react-icons/md";
import { useEffect } from "react";
import axios from "axios";
import Comment from "@/app/components/post/comment";
import DetailPostHeader from "@/app/components/post/detailpostheader";
import DonationModal from "@/app/components/post/donationmodal";
import AlbumModal from "@/app/components/post/addtoalbum";

export default function DetailPost({ params }: { params: { postId: string } }) {
  const [inputValue, setInputValue] = useState(0);
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [post, setPost] = useState<{ data?: any } | null>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState(false);
  const [amountdonation, setAmountDonation] = useState<number>(0);
  const [donationmodal, setDonationModal] = useState(false);
  const [albummodal, setAlbumModal] = useState(false);
  const [userId, setUserId] = useState<any>();

  // Get Data Post dan Set Status Like
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');
    setUserId(userid);

    const fetchPost = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${params.postId}`, { headers: { "Authorization": `Bearer ${token}` } }),
          axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userId}/albums`, { headers: { "Authorization": `Bearer ${token}` } })
        ])
        setLikesCount(response1.data.data.likes.length);
        setPost(response1.data);
        const commentData = response1.data.data.comentars;
        setAlbums(response2.data.data);
        const isUserLiked = response1.data.data.likes.some((like: any) => like.userId === userId);
        setIsLiked(isUserLiked);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [params.postId, userId]);

  const handleInputChange = (e: any) => {
    const value = Number(e.target.value);
    setAmountDonation(value + 1000);
    const isInvalid = value < 5000;
    setInputValue(value);
    console.log(amountdonation);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = new URLSearchParams();
    payload.append('amount', amountdonation.toString());
    const token = localStorage.getItem('token');
    try {
      const donation = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${params.postId}/donation`, payload, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      console.log(donation.data);
      window.open(donation.data.data.redirectUrl);
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      const token = localStorage.getItem('token');
      let response;
      response = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${params.postId}/like`, null, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(response.data);
      setIsLiked(!isLiked);
      if (isLiked) {
        setLikesCount(likesCount - 1);
      } else {
        setLikesCount(likesCount + 1);
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const isOwner = userId === post?.data.user.id;

  return (
    <>
      <div className="flex justify-between pt-20 px-10">
        <Sidebar />
        <div className="overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 w-full overflow-x-hidden p-2 md:p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full">
              <img
                className="rounded-lg w-full"
                src={post?.data.locationFile && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/photos/${post.data.locationFile}`}
                alt=""
              />
            </div>
            <div className="w-full p-3 md:p-5 flex flex-col">
              <DetailPostHeader post={post} />
              <div className="flex gap-2 flex-col xl:flex-row w-full mt-3 justify-between">
                <Button onClick={handleLikeClick} className={isLiked ? "flex border-1 items-center gap-1 w-full bg-[#07A081] text-white justify-center p-1 rounded-lg" : "flex transition-all items-center gap-1 w-full border-[#07A081] bg-white border-1 text-[#07A081] justify-center p-1 rounded-lg"}>{isLiked ? <MdFavorite className="size-5" /> : <MdFavoriteBorder className="size-5" />} {likesCount} Suka</Button>
                <Button onPress={() => setAlbumModal(true)} className="flex bg-white items-center gap-1 w-full border-[#07A081] border-1 text-[#07A081] justify-center p-1 rounded-lg"><MdLibraryAdd className="size-5" /> Tambah Ke Album</Button>
                <AlbumModal isOpen={albummodal} photo={params.postId} data={albums} onClose={() => setAlbumModal(false)} post={post} />
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
                    onPress={() => setDonationModal(true)}
                    className="w-full mt-3 md:w-auto whitespace-nowrap rounded-lg p-2 bg-[#07A081] text-white border-1"
                  >
                    Kirim Donasi
                  </Button>
                  <DonationModal
                    isOpen={donationmodal}
                    onClose={() => setDonationModal(false)}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    isInvalidInput={isInvalidInput}
                    inputValue={inputValue}
                    formatNumber={formatNumber}
                  />
                </>
              )}
              <Comment postId={params.postId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
