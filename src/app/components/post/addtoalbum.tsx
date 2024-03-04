import { Modal, ModalContent, ModalHeader, Checkbox, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

export default function AlbumModal({ isOpen, onClose, data, photo, post }: any) {
    const [se, setSe] = useState(false);

    const isPhotoAtAlbum = (post: any, albumId: string): boolean => {
        return post?.data?.albums.some((p: any) => p.id === albumId);
    };

    const handleCheckboxChange = (albumId: string) => {
        if (isPhotoAtAlbum(post, albumId) === true) {
            const deleteaction = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.delete(process.env.NEXT_PUBLIC_API_RATIO + `/albums/${albumId}/photos/${photo}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            }
            deleteaction();
        } else if (isPhotoAtAlbum(post, albumId) === false) {
            const addaction = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + `/albums/${albumId}/photos/${photo}`, null, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            }
            addaction();
        }
    };

    return (
        <>
            <Modal className="rounded-lg" backdrop="blur" scrollBehavior="inside" isOpen={isOpen} onClose={onClose} >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Tambah ke Album
                        <hr />
                    </ModalHeader>
                    <ModalBody className="flex flex-col">
                        {data.map((album: any, index: number) => {
                            return (
                                <div key={index} className={se ? "flex flex-row rounded-md p-2 justify-between items-center py-2 bg-[#07A081] text-white" : "flex flex-row rounded-md p-2 justify-between items-center py-2 bg-slate-100 border-1"}>
                                    <section className="flex-col flex">
                                        <p className="text-lg font-medium">{album.title}</p>
                                        <p className="truncate whitespace-nowrap text-xs">{album.description}</p>
                                    </section>
                                    <section>
                                        <Checkbox color="success" defaultSelected={isPhotoAtAlbum(post, album.id)} onChange={() => handleCheckboxChange(album.id)} value={album.id}></Checkbox>
                                    </section>
                                </div>
                            )
                        })}
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
