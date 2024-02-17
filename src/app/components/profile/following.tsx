import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, User } from "@nextui-org/react";
import Link from "next/link";

export default function Following({isOpen, onClose, following}: any) {
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
                            Mengikuti
                        </ModalHeader>
                        <ModalBody>
                            {following.map((follower: any) => (
                                <>
                                    <Link href={`/profile/${follower.username}`}>
                                        <Button className="py-7 px-2 bg-transparent flex justify-start">
                                            <User
                                                name={follower.fullName}
                                                description={<p>@{follower.username}</p>}
                                                avatarProps={{
                                                    src: follower.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${follower.photoUrl}`,
                                                }}
                                            />
                                        </Button>
                                    </Link>
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
    )
}