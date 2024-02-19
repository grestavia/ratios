'use client'
import Sidebar from "@/app/components/layout/sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdMoreVert, MdEdit, MdDelete } from "react-icons/md";
import {
    Button, Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Album({ params }: { params: { albumId: string } }) {
    const [albumdata, setAlbumData] = useState<any>([]);
    const [imagespath, setImagesPath] = useState<any[]>([]);
    const [userdata, setUserData] = useState<any>([]);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const getDataAlbum = async () => {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/albums/${params.albumId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const dataAlbum = response.data.data;
            const photolist = dataAlbum.photos;
            console.log(dataAlbum);
            setAlbumData(dataAlbum);
            if (Array.isArray(photolist)) {
                const imageIds = photolist.map(image => image.id);
                setImagesPath(photolist);
            }
        }
        getDataAlbum();

        const getUser = async () => {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const dataUser = response.data.data;
            setUserData(dataUser[0]);
        }
        getUser();
    }, [])

    const handledeletealbum = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.delete(process.env.NEXT_PUBLIC_API_RATIO + `/albums/${params.albumId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        console.log(response.data);
        router.push('/profile')
    }

    const isOwner = userdata.id === albumdata.userId

    return (
        <>
            <div className="flex justify-between pt-20 px-5 lg:px-5">
                <Sidebar />
                <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
                    <div className="max-w-2xl">
                        <div className="flex items-center justify-between">
                            <section className="head pt-2 pl-2 lg:pl-5 flex flex-col gap-0 lg:gap-1">
                                <h1 className="lg:text-2xl text-md font-medium">
                                    {albumdata.title}
                                </h1>
                                <h3 className="text-sm">{albumdata.description}</h3>
                            </section>
                            {isOwner ? (
                                <>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button className="min-w-0 bg-transparent">
                                                <MdMoreVert size={20} />
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            <DropdownItem startContent={<MdEdit />} key="new"><Link href={`/album/${params.albumId}/edit`}>Edit Profile</Link></DropdownItem>
                                            <DropdownItem onPress={onOpen} startContent={<MdDelete />} key="delete" className="text-danger" color="danger">
                                                Hapus Album
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                        <hr className="mt-3" />
                    </div>
                    <div className="mt-5">
                        {imagespath.length === 0 ? (
                            isOwner ? (
                                <p className="text-gray-500 px-5">Kamu Belum Menambahkan Gambar</p>
                            ) : (
                                <p className="text-gray-500 px-5">User Belum Menambahkan Gambar</p>
                            )
                        ) : (
                            <div className="w-full lg:columns-4 md:columns-3 columns-2 gap-3">
                                {imagespath.map((image, index) => {
                                    return (
                                        <Link href={`/post/${image.id}`} key={index}>
                                            <div className="mb-3 hover:brightness-[.80] rounded-md transform hover:scale-[102%] transition ease-in">
                                                <img
                                                    src={process.env.NEXT_PUBLIC_API_RATIO + `/files/images/photos/${image.locationFile}`}
                                                    className="rounded-md mb-2"
                                                    alt=""
                                                />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Hapus Album "{albumdata.title}"</ModalHeader>
              <ModalBody>
                <p> 
                  Anda yakin ingin menghapus album ini?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="danger" onPress={handledeletealbum}>
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </>
    );
}