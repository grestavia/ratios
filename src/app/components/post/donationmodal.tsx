import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function DonationModal({ isOpen, onClose, handleSubmit, handleInputChange, isInvalidInput, inputValue, formatNumber }: any) {
  return (
    <Modal className="rounded-lg" isOpen={isOpen} onClose={onClose} >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">Beri Donasi</ModalHeader>
          <ModalBody className="gap-0">
            <hr />
            <p className="mt-2 mb-2">Masukkan nominal yang ingin Anda donasikan :</p>
            <input
              type="number"
              name=""
              placeholder="Rp. 5.000"
              className={`w-full border-${isInvalidInput ? "red" : "#07A081"} rounded-md border-2 p-2`}
              id=""
              onChange={handleInputChange}
            />
            {isInvalidInput && (
              <p className="text-red-500">Nominal Donasi Minimal Rp. 5.000</p>
            )}
            <div className="flex flex-col gap-0.5">
              <p className="mt-3">Subtotal: Rp. {formatNumber(inputValue)}</p>
              <p>Admin Fee: Rp. 1.000</p>
              <p>Total: Rp. {formatNumber(inputValue + 1000)}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              id="submitButton"
              className="disabled:bg-[#07a08154] disabled:cursor-not-allowed cursor-pointer bg-[#07A081] text-white p-2 rounded-md w-full"
              disabled={isInvalidInput}
            >Tarik Dana</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
