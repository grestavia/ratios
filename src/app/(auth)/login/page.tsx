"use client";
import Header from "@/app/components/header";
import { Input } from "@nextui-org/react";
import React from "react";
import {
  MdOutlineRemoveRedEye,
  MdRemoveRedEye,
  MdOutlineMailOutline,
  MdOutlineKey
} from "react-icons/md";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <Header />
      <div className="flex justify-between pt-20 px-5 lg:px-10">
        <div className="konten flex flex-col justify-center w-full px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="flex mx-auto flex-col justify-center p-5 rounded-lg align-middle my-auto border-1 w-full max-w-md">
            <h1 className="mx-auto text-xl font-semibold">Login</h1>
            <hr className="my-3" />
            <p className="text-center">
              Silahkan login untuk melanjutkan ke halaman utama
            </p>
            <form action="" className="flex flex-col pt-5">
              <Input
                isRequired
                startContent={
                  <MdOutlineMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                type="email"
                label="Email"
                className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
              />
              <Input
                startContent={
                  <MdOutlineKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                isRequired
                variant="bordered"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <MdRemoveRedEye
                        color="#07A081"
                        className="text-2xl text-default-400 pointer-events-none"
                      />
                    ) : (
                      <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full border-2 mb-3 border-[#07A081] rounded-xl focus:outline-none bg-[#f5f5f5]"
              />
              <p className="text-md">
                Belum punya akun?{" "}
                <a href="/register" className="text-[#07A081]">
                  Daftar
                </a>
              </p>
              <a href="/forgot-password" className="text-[#07A081] mb-3 text-md">Lupa Sandi?</a>
              <input
                type="submit"
                value="Login"
                className="p-2 rounded-md bg-[#07A081] text-white cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
