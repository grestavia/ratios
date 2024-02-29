'use client'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, User } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export default function Follower({ isOpen, onClose, followers, owner }: any) {

    const [deletedFollowers, setDeletedFollowers] = useState<string[]>([]);

    const handleremovefollower = async (followerId: string, index: any) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(process.env.NEXT_PUBLIC_API_RATIO + `/users/followers/${followerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(response.data);
            setDeletedFollowers([...deletedFollowers, followerId]);
        } catch (error) {
            console.error("Failed :", error);
        }
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                scrollBehavior={"inside"}
                backdrop={"blur"}
                onClose={onClose}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Pengikut
                        </ModalHeader>
                        <ModalBody>
                            {followers.map((follower: any, index: any) => (
                                <>
                                    <div key={index} className="flex flex-row items-center justify-between w-full">
                                        <Link key={index} href={`/profile/${follower.username}`}>
                                            <Button className="py-7 px-2 bg-transparent">
                                                <User
                                                    name={follower.fullName}
                                                    description={<p>@{follower.username}</p>}
                                                    avatarProps={{
                                                        src: follower.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${follower.photoUrl}`,
                                                    }}
                                                />
                                            </Button>
                                        </Link>
                                        {owner ? (
                                            <>
                                                {!deletedFollowers.includes(follower.followerId) ? (
                                                    <Button color="danger" onClick={() => handleremovefollower(follower.followerId, index)}>Hapus</Button>
                                                ) : (
                                                    // Tombol disabled dan teks Terhapus jika follower sudah dihapus
                                                    <Button isDisabled color="default">Terhapus</Button>
                                                )}
                                            </>
                                        ) : (<></>)}
                                    </div>
                                    <hr />
                                </>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}