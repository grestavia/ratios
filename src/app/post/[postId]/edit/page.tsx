'use client'
import Sidebar from "@/app/components/sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Input, Textarea } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function EditPost({ params }: { params: { postId: string } }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    interface PhotoData {
        title: string;
        description: string;
        locationFile: string;
    }

    const [photoData, setPhotoData] = useState<PhotoData>({
        title: '',
        description: '',
        locationFile: '',
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setPhotoData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const payload = {
            title: photoData.title,
            description: photoData.description,
        }
        try {
            const response = await axios.put(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${params.postId}`, payload, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            console.log("Photo uploaded successfully:", response.data);
            router.push(`/post/${params.postId}`);
        } catch (error) {
            console.error("Error uploading photo:", error);
        }
    }

    const handleDelete = async (e: any) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${params.postId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("Photo deleted successfully:", response.data);
            router.push("/");
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    }

    useEffect(() => {
        const fetchPostData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/photos/${params.postId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setPhotoData(response.data.data);
            const photoAttribute = response.data.data;
            setPhotoData({
                title: photoAttribute.title,
                description: photoAttribute.description,
                locationFile: photoAttribute.locationFile
            })
            console.log(photoAttribute.locationFile);
        };
        fetchPostData();
    }, [])

    return (
        <>
            <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
                <Sidebar />
                <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
                    <section className="head pt-2 pl-2 lg:pl-5 flex flex-col gap-0 lg:gap-1">
                        <h1 className="lg:text-3xl text-md font-medium">
                            Edit Postingan "{photoData.title}"
                        </h1>
                        <h3 className="text-sm">Edit Judul dan Deskripsi Postingan</h3>
                    </section>
                    <hr className="mt-3 max-w-2xl" />
                    <section className="mt-5 flex gap-5">
                        <div className="w-full">
                            <img src={photoData.locationFile && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/photos/${photoData.locationFile}`} className="w-full rounded-md" />
                        </div>
                        <div className="w-full">
                            <h1 className="text-xl font-medium mb-3">Detail Postingan</h1>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    onChange={handleInputChange}
                                    name="title"
                                    value={photoData.title}
                                    label="Judul"
                                    className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
                                />
                                <Textarea
                                    onChange={handleInputChange}
                                    name="description"
                                    value={photoData.description}
                                    label="Deskripsi"
                                    className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
                                />
                                <Button type="submit" className="w-full cursor-pointer bg-[#07A081] rounded-md py-2 px-1 text-white">Simpan Perubahan</Button>
                            </form>
                            <Button onPress={onOpen} className="w-full cursor-pointer bg-[#ca3a3a] mt-2 rounded-md py-2 px-1 text-white">Hapus Postingan</Button>
                            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1">Konfirmasi</ModalHeader>
                                            <ModalBody>
                                                <p>
                                                    Anda Yakin Menghapus Postingan Ini?
                                                </p>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button className="text-neutral-500" variant="light" onPress={onClose}>
                                                    Tutup
                                                </Button>
                                                <Button color="danger" onPress={handleDelete}>
                                                    Hapus
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}