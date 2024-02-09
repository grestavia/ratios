import React, { useState, useEffect } from 'react';
import { MdArrowUpward, MdEdit, MdDelete, MdMoreVert } from 'react-icons/md';
import { Button, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from '@nextui-org/react';
import Link from 'next/link';
import { formatRelative, subDays } from 'date-fns';
import { id } from 'date-fns/locale'
import axios from 'axios';

interface CommentProps {
    postId: string;
}

const Comment: React.FC<CommentProps> = ({ postId }) => {
    const [comments, setComments] = useState<string>('');
    const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
    const [commentList, setCommentList] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchDataUser = async () => {
            const response1 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/account`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const dataUser = response1.data.data;
            if (Array.isArray(dataUser)) {
                const userId = dataUser.map((user) => user.id);
                setLoggedInUserId(dataUser[0].id);
                console.log(dataUser[0].id);
            }
        };
        fetchDataUser();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${postId}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const commentData = response.data.data.comentars;
                if (Array.isArray(commentData)) {
                    const commentIds = commentData.map(comment => comment.id);
                    setCommentList(commentData);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();

        // Memperbarui komentar setiap 10 detik
        const interval = setInterval(fetchComments, 10000);

        // Membersihkan interval saat komponen unmount
        return () => clearInterval(interval);
    }, [postId]);

    const handleComment = async (e: any) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const payload = {
                comentar: comments,
            }
            const commentResponse = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${postId}/comentar`, payload, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(commentResponse.data);
            // Kosongkan input komentar setelah berhasil diposting
            setComments('');
        } catch (error) {
            console.error("Error handling comment:", error);
        }
    }

    const handleDeleteComment = async (commentId: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${commentId}/comentar`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            // Setelah berhasil menghapus, perbarui daftar komentar yang ditampilkan dengan menghapus komentar yang dihapus dari daftar komentar
            setCommentList(prevComments => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }

    return (
        <div className="komentar flex mt-5 p-2 bg-[#F0F4F9] gap-3 rounded-xl flex-col">
            <div className="overflow-scroll h-[350px] scrollbar-thin scrollbar-thumb-neutral-300 w-full overflow-x-hidden">
                <div>
                    <h1 className="text-lg text-stone-600 font-medium p-3">Komentar</h1>
                    <hr className="px-5" />
                    {commentList.map((komentar: any, index: any) => (
                        <div className="px-3 mt-5" key={index}>
                            <div className='flex justify-between w-full'>
                                <Link href={`/profile/${komentar.user.username}`}>
                                    <User
                                        name={komentar.user.fullName}
                                        description={
                                            <p>
                                                {formatRelative(subDays(new Date(komentar.user.createdAt), 3), new Date(), { locale: id })} {/* Ubah format tanggal di sini */}
                                            </p>
                                        }
                                        avatarProps={{
                                            src: komentar.user.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${komentar.user.photoUrl}`,
                                            size: "sm"
                                        }}
                                    />
                                </Link>
                                {loggedInUserId === komentar.user.id && (
                                    <>

                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button className='bg-transparent min-w-1'>
                                                    <MdMoreVert />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Static Actions">
                                                <DropdownItem startContent={<MdEdit />} key="new">Edit Komentar</DropdownItem>
                                                <DropdownItem onClick={() => handleDeleteComment(komentar.id)} startContent={<MdDelete />} key="delete" className="text-danger" color="danger">
                                                    Hapus Komentar
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </>
                                )}
                            </div>
                            <p className="text-md">{komentar.comentar}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="rounded-xl bg-white w-full">
                <form onSubmit={handleComment}>
                    <div className="w-full flex justify-between rounded-xl gap-2 border-2 p-1 border-[#07A081]">
                        <input
                            type="text"
                            value={comments}
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
    );
}

export default Comment;