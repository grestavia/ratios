"use client";
import { MdError } from "react-icons/md";
import { Input } from "@nextui-org/react";
import React from "react";
import {
  MdOutlineRemoveRedEye,
  MdRemoveRedEye,
  MdOutlineMailOutline,
  MdOutlineKey,
} from "react-icons/md";
import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const submitFormData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(process.env.NEXT_PUBLIC_API_RATIO + "/users/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);
    if (data.status === 400) {
      setErrorAlert(true);
      setErrorMessage(
        data.errors.messages
          .map((item: { message: string }) => item.message)
          .join(" dan ")
      );
      setTimeout(() => {
        setErrorAlert(false);
      }, 3000);
    } else if (response.ok) {
      localStorage.setItem("token", data.data.token)
      router.push('/')
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {errorAlert && (
        <>
          <motion.div initial={{ opacity: 0, x: '-50%', y: '10' }}
            animate={{ opacity: 1, y: '-50%' }}
            transition={{ ease: "easeIn", duration: 0.5 }} className="bg-[#ec8d8d] px-7 py-3 absolute top-unit-20 rounded-md left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center">
              <MdError className="text-[#cf3d3d] w-9 h-9" />
              <section className="message flex flex-col mx-3">
                <h1 className="text-md font-semibold text-white">Error</h1>
                <p className="text-sm text-white">{errorMessage}</p>
              </section>
            </div>
          </motion.div>
        </>
      )}
      <div className="flex justify-between pt-20 px-5 lg:px-10">
        <div className="konten flex flex-col justify-center w-full px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="flex mx-auto flex-col justify-center p-5 rounded-lg align-middle my-auto border-1 w-full max-w-md">
            <h1 className="mx-auto text-xl font-semibold">Login</h1>
            <hr className="my-3" />
            <p className="text-center">
              Silahkan login untuk melanjutkan ke halaman utama
            </p>
            <form
              action=""
              className="flex flex-col pt-5"
              onSubmit={submitFormData}
            >
              <Input
                isRequired
                onChange={handleInputChange}
                startContent={
                  <MdOutlineMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                type="email"
                name="email"
                label="Email"
                className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
              />
              <Input
                startContent={
                  <MdOutlineKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                isRequired
                onChange={handleInputChange}
                variant="bordered"
                name="password"
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
              <a
                href="/forgot-password"
                className="text-[#07A081] mb-3 text-md"
              >
                Lupa Sandi?
              </a>
              <button
                type="submit"
                className="p-2 rounded-md bg-[#07A081] text-white cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
