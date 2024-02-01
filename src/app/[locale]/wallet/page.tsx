"use client";
import Header from "../../../../components/header";
import Sidebar from "../../../../components/sidebar";
import { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useState } from "react";

export default function Wallet() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputValue, setInputValue] = useState(0);
  const [isInvalidInput, setIsInvalidInput] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setInputValue(value);

    const isInvalid = value < 10000;

    setIsInvalidInput(isInvalid);

    const submitButton = document.getElementById(
      "submitButton"
    ) as HTMLInputElement;
    if (submitButton) {
      submitButton.disabled = isInvalid;
    }
  };

  const formatNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
        <Sidebar />
        <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <section className="head pt-2 pl-2 lg:pl-5 flex flex-col gap-0 lg:gap-1">
            <h1 className="lg:text-2xl text-md font-medium">Dompet Donasi</h1>
            <h3 className="text-sm">Lihat riwayat transaksi anda di bawah</h3>
          </section>
          <hr className="mt-3" />
          <div className="w-full mb-3 border-1 border-[#07A081] rounded-lg mt-2 bg-[#07a0811d] p-2 pl-4 items-center flex flex-col md:flex-row gap-2 md:justify-between">
            <section className="flex items-center w-full justify-between md:justify-start md:gap-1">
              <p className="text-sm md:text-[16px]">Saldo Dompet: </p>
              <p className="text-sm md:text-[16px]">Rp. 100.000</p>
            </section>
            <button
              onClick={onOpen}
              className="w-full md:w-auto whitespace-nowrap rounded-lg p-2 hover:bg-[#07A081] hover:text-white border-1 border-[#07A081]"
            >
              Tarik Saldo
            </button>
            <Modal
              className="rounded-lg"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <form onSubmit={handleSubmit}>
                    <ModalHeader className="flex flex-col gap-1">
                      Penarikan Saldo
                    </ModalHeader>
                    <ModalBody className="gap-0">
                      <hr />
                      <p className="mt-2 mb-2">Masukkan nominal yang ingin Anda tarik :</p>
                      <input
                        type="number"
                        name=""
                        placeholder="Rp. 10.000"
                        className={`w-full border-${
                          isInvalidInput ? "red" : "#07A081"
                        } rounded-md border-2 p-2`}
                        id=""
                        onChange={handleInputChange}
                      />
                      {isInvalidInput && (
                        <p className="text-red-500">
                          Nominal Penarikan Minimal Rp. 10.000
                        </p>
                      )}
                      <div className="flex flex-col gap-0.5">
                      <p className="mt-3">Subtotal: Rp. {formatNumber(inputValue)}</p>
                      <p>Admin Fee: Rp. 1.000</p>
                      <p>Total: Rp. {formatNumber(inputValue + 1000)}</p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <input
                        type="submit"
                        value="Tarik Dana"
                        id="submitButton"
                        className="disabled:bg-[#07a08154] disabled:cursor-not-allowed cursor-pointer bg-[#07A081] text-white p-2 rounded-md w-full"
                        disabled={isInvalidInput}
                      />
                    </ModalFooter>
                  </form>
                )}
              </ModalContent>
            </Modal>
          </div>
          <hr />
          <Table className="pt-3" removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Nominal</TableColumn>
              <TableColumn>Tipe</TableColumn>
              <TableColumn>Tanggal</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Rp. 100.000</TableCell>
                <TableCell>Tarik</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Rp. 50.000</TableCell>
                <TableCell>Masuk</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Rp. 100.000</TableCell>
                <TableCell>Masuk</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>Rp. 50.000</TableCell>
                <TableCell>Masuk</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
