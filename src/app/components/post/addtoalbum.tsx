import { Modal, ModalContent, ModalHeader, Checkbox, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

export default function AlbumModal({ isOpen, onClose, data, photo }: any) {

    const [se, setSe] = useState(false);
    const [addphoto, setAddPhoto] = useState([]);
    const [checkedAlbums, setCheckedAlbums] = useState<string[]>([]);

    console.log(checkedAlbums);

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
        const payload = {
            photoId: photo
        }

        try {
            // Memanggil API untuk setiap album yang diceklis
            checkedAlbums.map(async (albumId) => {
                const response = await axios.post(
                    process.env.NEXT_PUBLIC_API_RATIO + `/albums/${albumId}/photos/${photo}`, payload,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                console.log(response.data);
            });
            onClose
            // Setelah semua panggilan API selesai, lakukan apa yang diperlukan
            // seperti menutup modal atau memberi umpan balik kepada pengguna.

        } catch (error) {
            // Tangani kesalahan jika diperlukan.
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
                                        <p className="text-clip text-xs">{album.description}</p>
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