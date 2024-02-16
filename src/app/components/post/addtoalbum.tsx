import { Modal, ModalContent, ModalHeader, Checkbox, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

export default function AlbumModal({ isOpen, onClose, data, photo }: any) {

    const [se, setSe] = useState(false);
    const [checkedAlbums, setCheckedAlbums] = useState<string[]>([]);   

    const handleCheckboxChange = (albumId: string) => {
        setCheckedAlbums(prevCheckedAlbums => {
            if (prevCheckedAlbums.includes(albumId)) {
                return prevCheckedAlbums.filter(id => id !== albumId);
            } else {
                return [...prevCheckedAlbums, albumId];
            }
        });
    };

    const handleAlbumSubmit = async (e: any) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            await Promise.all(checkedAlbums.map(async (albumId) => {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_RATIO}/albums/${albumId}/photos/${photo}`,
                    null,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                console.log(response.data);
            }));
            onClose(); // Pastikan Anda memanggil onClose sebagai fungsi
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal className="rounded-lg" backdrop="blur" scrollBehavior="inside" isOpen={isOpen} onClose={onClose} >
                <ModalContent>
                    <form onSubmit={handleAlbumSubmit}>
                        <ModalHeader className="flex flex-col gap-1">Tambah ke Album
                            <hr />
                        </ModalHeader>
                        <ModalBody className="flex flex-col">
                            {data.map((album: any, index: number) => (
                                <div key={index} className={se ? "flex flex-row rounded-md p-2 justify-between items-center py-2 bg-[#07A081] text-white" : "flex flex-row rounded-md p-2 justify-between items-center py-2 bg-slate-100 border-1"}>
                                    <section className="flex-col flex">
                                        <p className="text-lg font-medium">{album.title}</p>
                                        <p className="truncate whitespace-nowrap text-xs">{album.description}</p>
                                    </section>
                                    <section>
                                        <Checkbox color="success" checked={checkedAlbums.includes(album.id)} onChange={() => handleCheckboxChange(album.id)} value={album.id}></Checkbox>
                                    </section>
                                </div>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type="submit"
                                className="disabled:bg-[#07a08154] disabled:cursor-not-allowed cursor-pointer bg-[#07A081] text-white p-2 rounded-md w-full"
                            >Tambah</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}