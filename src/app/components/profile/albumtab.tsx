import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { MdAdd, MdHideImage } from "react-icons/md";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Input, useDisclosure } from "@nextui-org/react";

export default function AlbumTab({data, user} : any) {

    const [userdata, setUserData] = useState<any>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData1 = async () => {
            const response1 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const dataUser = response1.data.data;
            console.log(dataUser);
            if (Array.isArray(dataUser)) {
                const userId = dataUser.map((user) => user.id);
                setUserData(dataUser[0]);
            }
        };
        fetchData1();
    }, []);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleNewAlbumSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const payload = {
            title: title,
            description: description
        }
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + `/albums`, new URLSearchParams(payload), {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {data.length === 0 ? (
                userdata.username === user ? (
                    <>
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-gray-500">Kamu belum mengunggah album apapun.</p>
                        <Button startContent={<MdAdd size={20} />} className="bg-[#07A081] text-white" onPress={onOpen}>Buat Album Baru</Button>
                    </div>
                </>
                ) : (
                    <>
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-gray-500">Pengguna ini belum mengunggah album apapun.</p>
                    </div>
                </>
                )
                
            ) : (
                <>
                    <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                        {userdata.username === user ? (
                            <>
                            <div onClick={onOpen} className=" gap-2 border-[3px] flex-col hover:cursor-pointer border-dashed border-[#07A081] hover:scale-[101%] hover:brightness-75 transition ease-in h-auto aspect-square w-full rounded-md flex items-center justify-center">
                            <MdAdd className="text-[#07A081]" size={30} />
                            <p className="text-[#07A081]">Buat Album Baru</p>
                            </div>
                            </>
                        ) : (
                            <>
                            </>                            
                        )}
                        {data.map((album: any, index: any) => {
                            return (
                                <>
                                    <Link href={`/album/${album.id}`} key={index}>
                                        <div className="relative hover:scale-[101%] hover:brightness-75 transition ease-in shadow-inner aspect-square rounded-md items-center justify-center flex flex-col">
                                            {album.photos[0] ? (
                                                <>
                                                <img src={process.env.NEXT_PUBLIC_API_RATIO + `/files/images/photos/${album.photos[0].locationFile}`} alt="" className="w-full rounded-md h-full object-cover" />
                                                </>
                                            ) : (
                                                <>
                                                <MdHideImage size={30} />
                                                <p>Belum Ada Photo</p>
                                                </>
                                            )}
                                            <div className="absolute z-10 bottom-0 left-0 right-0 p-4 text-white">
                                                <h1 className="text-xl font-bold">{album.title}</h1>
                                                <p className="truncate text-sm">{album.photos.length} Foto</p>
                                            </div>
                                            <div className=" rounded-md absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                                        </div>
                                    </Link>
                                </>
                            )
                        })}
                    </div>
                </>
            )}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleNewAlbumSubmit} action="">
                                <ModalHeader className="flex flex-col gap-1">Album Baru</ModalHeader>
                                <ModalBody>
                                    <Input onChange={(e) => setTitle(e.target.value)} className="border-2 border-[#07A081] rounded-xl" type="text" label="Judul" name="title" />
                                    <Textarea onChange={(e) => setDescription(e.target.value)} className="border-2 border-[#07A081] rounded-xl" label="Deskripsi" name="description" />
                                </ModalBody>
                                <ModalFooter>
                                    <Button className="bg-[#07A081] w-full text-white" type="submit">
                                        Buat
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}