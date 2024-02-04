"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import {
  MdOutlineRemoveRedEye,
  MdRemoveRedEye,
  MdOutlineMailOutline,
  MdOutlineKey,
  MdOutlineAccountCircle,
  MdAlternateEmail,
  MdOutlineLocationOn,
} from "react-icons/md";
import { useState, FormEvent, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";

export default function Register() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }
  }, []);

  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);
  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitFormData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/users/auth/register", {
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
        "Error Terjadi: " +
          data.errors.messages
            .map((item: { message: string }) => item.message)
            .join(" dan ")
      );
      setTimeout(() => {
        setErrorAlert(false);
      }, 3000);
    } else if (response.ok) {
      router.push("/login");
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
        <Alert
          variant="filled"
          className="fixed left-1/2 top-2 transform -translate-x-1/2 z-10"
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}
      <div className="flex justify-between pt-20 px-5 lg:px-10">
        <div className="konten block md:flex overflow-scroll md:overflow-hidden flex-col justify-center w-full px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="flex mx-auto flex-col justify-center p-5 rounded-lg align-middle my-auto border-1 w-full max-w-lg">
            <h1 className="mx-auto text-xl font-semibold">Daftar</h1>
            <hr className="my-3" />
            <p className="text-center">
              Silahkan membuat akun baru untuk kemudahan akses ke layanan kami
            </p>
            <form
              action=""
              onSubmit={submitFormData}
              className="flex flex-col pt-5"
            >
              <div className="flex flex-col md:flex-row gap-2">
                <Input
                  isRequired
                  onChange={handleInputChange}
                  startContent={
                    <MdOutlineAccountCircle className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  type="text"
                  name="fullname"
                  label="Nama Lengkap"
                  className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
                />
                <Input
                  isRequired
                  onChange={handleInputChange}
                  startContent={
                    <MdAlternateEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  type="text"
                  name="username"
                  label="Usename"
                  className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
                />
              </div>
              <Input
                isRequired
                onChange={handleInputChange}
                startContent={
                  <MdOutlineMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                name="email"
                type="email"
                label="Email"
                className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
              />
              <Input
                isRequired
                onChange={handleInputChange}
                startContent={
                  <MdOutlineLocationOn className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                type="text"
                name="address"
                label="Alamat"
                className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
              />
              <div className="flex flex-col md:flex-row gap-2">
                <Input
                  startContent={
                    <MdOutlineKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  name="password"
                  isRequired
                  onChange={handleInputChange}
                  variant="bordered"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityPassword}
                    >
                      {isVisiblePassword ? (
                        <MdRemoveRedEye
                          color="#07A081"
                          className="text-2xl text-default-400 pointer-events-none"
                        />
                      ) : (
                        <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisiblePassword ? "text" : "password"}
                  className="w-full border-2 mb-3 border-[#07A081] rounded-xl focus:outline-none bg-[#f5f5f5]"
                />
                <Input
                  startContent={
                    <MdOutlineKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Konfirmasi Password"
                  isRequired
                  onChange={handleInputChange}
                  name="confirmPassword"
                  variant="bordered"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityConfirmPassword}
                    >
                      {isVisibleConfirmPassword ? (
                        <MdRemoveRedEye
                          color="#07A081"
                          className="text-2xl text-default-400 pointer-events-none"
                        />
                      ) : (
                        <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisibleConfirmPassword ? "text" : "password"}
                  className="w-full border-2 mb-3 border-[#07A081] rounded-xl focus:outline-none bg-[#f5f5f5]"
                />
              </div>
              <p className="text-md mb-3">
                Sudah punya akun?{" "}
                <a href="/login" className="text-[#07A081]">
                  Login
                </a>
              </p>
              <button
                type="submit"
                className="p-2 rounded-md bg-[#07A081] text-white cursor-pointer"
              >
                Daftar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
