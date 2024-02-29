"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import {
  MdOutlineRemoveRedEye,
  MdRemoveRedEye,
  MdOutlineMailOutline,
  MdOutlineKey,
} from "react-icons/md";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const isInvalid = useState(false);

  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isinvalid, setIsInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const submitFormData = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const login = async () => {
      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + "/users/auth/login", new URLSearchParams(formData), {}
        );
        const data = response.data;
        console.log(data);
        router.push('/')
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("userid", data.data.user.id)
      } catch (error: any) {
        setErrorAlert(true);
        console.log(error);
        setErrorMessage(
          error.response.data.errors.messages
            .map((item: { message: string }) => item.message)
            .join(" dan ")
        );
        setTimeout(() => {
          setErrorAlert(false);
        }, 3000);
      } finally {
        setLoading(false);
      }
    }
    login();
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setIsInvalid(!isValidEmail);
    }

    if (name === "password") {
      // Validasi panjang minimal password, misalnya minimal 6 karakter
      setIsPasswordInvalid(value.length < 8);
    }
  };

  return (
    <>
      {errorAlert && (
        <>
          <Alert
            variant="filled"
            className="fixed left-1/2 top-2 transform -translate-x-1/2 z-10"
            severity="error"
          >
            {errorMessage}
          </Alert>
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
                  <MdOutlineMailOutline className={isinvalid ? "text-2xl pointer-events-none flex-shrink-0 text-danger" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                }
                color={isinvalid ? "danger" : "default"}
                errorMessage={isinvalid && "Please enter a valid email"}
                type="email"
                name="email"
                variant="bordered"
                label="Email"
                className="w-full mb-3 rounded-xl focus:outline-none"
              />
              <Input
                startContent={
                  <MdOutlineKey className={isPasswordInvalid ? "text-2xl pointer-events-none flex-shrink-0 text-danger" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                }
                label="Password"
                isRequired
                onChange={handleInputChange}
                variant="bordered"
                name="password"
                color={isPasswordInvalid ? "danger" : "default"}
                errorMessage={isPasswordInvalid && "Password must be at least 8 characters"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <MdRemoveRedEye
                        color={isPasswordInvalid ? "#f31260" : "#07A081"}
                        className="text-2xl pointer-events-none"
                      />
                    ) : (
                      <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full mb-3 rounded-xl focus:outline-none"
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
              <Button
                type="submit"
                isDisabled={loading}
                className="p-2 rounded-md bg-[#07A081] text-white cursor-pointer"
              >
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
