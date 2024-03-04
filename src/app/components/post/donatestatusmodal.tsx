import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"

export default function DonateStatusModal({ isStatusOpen, status, onClose, handleCheckStatus }: any) {
    return (
        <>
            <Modal className="rounded-lg" isOpen={isStatusOpen} onClose={onClose} >
                <ModalContent>
                    <form onSubmit={handleCheckStatus}>
                        <ModalHeader className="flex flex-col">Cek Status Pembayaran</ModalHeader>
                        <ModalBody className="gap-0">
                            <p className="mt-2 mb-2">{status ? `Status Pembayaran Terkini: ${status}` : "Status Pembayaran Terkini: Klik untuk Cek"}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type="submit"
                                id="submitButton"
                                className="disabled:bg-[#07a08154] disabled:cursor-not-allowed cursor-pointer bg-[#07A081] text-white p-2 rounded-md w-full"
                            >Cek Status</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}
