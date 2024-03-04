"use client";
import Sidebar from "../components/layout/sidebar";
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
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Wallet() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputValue, setInputValue] = useState(0);
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [total, setTotal] = useState<any>();
  const [donate, setDonate] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [withdraw, setWithdraw] = useState<any[]>([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const donations = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(process.env.NEXT_PUBLIC_API_RATIO + "/wallet",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        )
        const responseDonate = response.data.data.donation.map((item: any) => ({ ...item, type: "Donasi" }))
        const responseWithdraw = response.data.data.withDrawals.map((item: any) => ({ ...item, type: "Penarikan" }))
        setTotal(response.data.data.amount)
        setDonate(responseDonate)
        setWithdraw(responseWithdraw)
        setIsLoading(false);
        console.log(response.data.data)
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    donations();
  }, [])

  const handleInputChange = (e: any) => {
    const value = Number(e.target.value);
    setInputValue(value);

    const isInvalid = value > total;

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

  const handleWithdrawal = async (e: any) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const payload = {
        amount: inputValue.toString(),
        password: password,
      }
      const response = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + "/withdrawal", new URLSearchParams(payload), {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between pt-20 px-5 lg:px-5">
        <Sidebar />
        <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          {isLoading ? (<>
            <p>Loading...</p>
          </>) : (<>
            <section className="head pt-2 pl-2 lg:pl-5 flex flex-col gap-0 lg:gap-1">
              <h1 className="lg:text-2xl text-md font-medium">Dompet Donasi</h1>
              <h3 className="text-sm">Lihat riwayat transaksi anda di bawah</h3>
            </section>
            <hr className="mt-3" />
            <div className="w-full mb-3 border-1 border-[#07A081] rounded-lg mt-2 bg-[#07a0811d] p-2 pl-4 items-center flex flex-col md:flex-row gap-2 md:justify-between">
              <section className="flex items-center w-full justify-between md:justify-start md:gap-1">
                <p className="text-sm md:text-[16px]">Saldo Dompet: </p>
                <p className="text-sm md:text-[16px]">Rp. {total?.toLocaleString('en-US')}</p>
              </section>
              <Button
                onClick={onOpen}
                className="w-full md:w-auto whitespace-nowrap rounded-lg p-2 bg-transparent mx-2 hover:bg-[#07A081] hover:text-white border-1 border-[#07A081]"
              >
                Tarik Saldo
              </Button>
              <Modal
                className="rounded-lg"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
              >
                <ModalContent>
                  <form onSubmit={handleWithdrawal}>
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
                        className={`w-full border-${isInvalidInput ? "red" : "#07A081"
                          } rounded-md border-2 p-2`}
                        id=""
                        onChange={handleInputChange}
                      />
                      {isInvalidInput && (
                        <p className="text-red-500">
                          Nominal Penarikan Melebihi Saldo Dompet
                        </p>
                      )}
                      <input
                        type="password"
                        name=""
                        placeholder="Masukkan Password"
                        className="w-full rounded-md border-2 p-2 mt-2"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="flex flex-col gap-1 mt-3">
                        <p>Total: Rp. {formatNumber(inputValue)}</p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="submit"
                        id="submitButton"
                        className="disabled:bg-[#07a08154] disabled:cursor-not-allowed cursor-pointer bg-[#07A081] text-white p-2 rounded-md w-full"
                        disabled={isInvalidInput}
                      >Tarik Dana
                      </Button>
                    </ModalFooter>
                  </form>
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
                {[...donate, ...withdraw]
                  .sort((a, b) => a.createdAt - b.createdAt)
                  .map((list, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>Rp. {list.amount.toLocaleString('en-US')}</TableCell>
                        <TableCell>{list.type}</TableCell>
                        <TableCell>{new Date(list.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </>)}
        </div>
      </div>
    </>
  );
}
