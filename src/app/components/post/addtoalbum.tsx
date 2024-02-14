import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function AlbumModal({ isOpen, onClose }: any) {
    return (
        <>
            <Modal className="rounded-lg" isOpen={isOpen} onClose={onClose} >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Album</ModalHeader>
                    <ModalBody className="gap-0">
                        <hr />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="submit"
                            id="submitButton"
                            className="disabled:bg-[#07a08154] disabled:cursor-not-allowed cursor-pointer bg-[#07A081] text-white p-2 rounded-md w-full"
                        >Tarik Dana</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}