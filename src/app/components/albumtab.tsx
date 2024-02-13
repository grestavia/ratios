import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Input, useDisclosure } from "@nextui-org/react";

export default function AlbumTab() {

    const [albumdata, setAlbumData] = useState<any>([]);
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
            if (Array.isArray(dataUser)) {
                const userId = dataUser.map((user) => user.id);
                setUserData(dataUser[0]);
            }
        };
        fetchData1();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (userdata.id) {
            const fetchData3 = async () => {
                const response3 = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + `/users/${userdata.id}/albums`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const dataAlbum = response3.data.data;
                setAlbumData(dataAlbum);
            }
            fetchData3();
        }
    }, [userdata]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleNewAlbumSubmit = async (e: any) => {
        e.preventDefault(); 
        const token = localStorage.getItem("token");
        const payload = {
            title: title,
            description: description
        }
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + `/albums`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }); 
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {albumdata.length === 0 ? (
                <>
                    <div className="flex flex-col items-center gap-3">
                    <p className="text-gray-500">Kamu belum mengunggah album apapun.</p>
                    <Button startContent={<MdAdd size={20} />} className="bg-[#07A081] text-white" onPress={onOpen}>Buat Album Baru</Button>
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
                    </div>
                </>
            ) : (
                <div className="w-full lg:columns-4 md:columns-3 columns-2 gap-3">
                    {albumdata.map((album: any, index: any) => {
                        return (
                            <Link href={`/album/${album.id}`} key={index}>
                                <h1 key={index}>{album.title}</h1>
                            </Link>
                        )
                    })}
                </div>
            )}
        </>
    );
}