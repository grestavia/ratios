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
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = useState(false);
  const [isAddressInvalid, setIsAddressInvalid] = useState(false);
  const [isFullnameInvalid, setIsFullnameInvalid] = useState(false);
  const [isinvalid, setIsInvalid] = useState(false);
  const [isUsernameValid, setIsUsernameInvalid] = useState(false);

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

  const submitFormData = async (e: any) => {
    e.preventDefault();

    const register = async () => {
      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_RATIO + "/users/auth/register", new URLSearchParams(formData), {
        });
        const data = response.data;
        console.log(data);
        router.push("/login");
      } catch (error: any) {
        setErrorAlert(true);
        setErrorMessage(
          error.response.data.errors.error
            .map((item: { message: string }) => item.message)
            .join(" dan ")
        );
        setTimeout(() => {
          setErrorAlert(false);
        }, 3000);
      }
    }
    register();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setIsPasswordInvalid(value.length < 8);
    }
  
    if (name === "confirmPassword") {
      setIsConfirmPasswordInvalid(value !== formData.password);
    }
  
    if (name === "address") {
      setIsAddressInvalid(value.trim() === "");
    }

    if (name === "fullname") {
      setIsFullnameInvalid(value.trim() === "");
    }
  
    if (name === "username") {
      const isValidUsername = /^[a-zA-Z0-9]+$/.test(value);
      setIsUsernameInvalid(!isValidUsername);
    }
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
        <div className="konten block md:flex overflow-scroll md:overflow-x-hidden flex-col justify-center w-full px-5 pt-5 bg-white h-[calc(100vh-110px)] rounded-lg">
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
                  color={isFullnameInvalid ? "danger" : "default"}
                  errorMessage={isFullnameInvalid && "Fullname is required"}
                  onChange={handleInputChange}
                  startContent={
                    <MdOutlineAccountCircle className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  type="text"
                  name="fullname"
                  variant="bordered"
                  label="Nama Lengkap"
                  className="w-full mb-3 rounded-xl focus:outline-none"
                />
                <Input
                  isRequired
                  color={isUsernameValid ? "danger" : "default"}
                  errorMessage={isUsernameValid && "Please enter a valid username"}
                  variant="bordered"
                  onChange={handleInputChange}
                  startContent={
                    <MdAlternateEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  type="text"
                  name="username"
                  label="Usename"
                  className="w-full mb-3 rounded-xl focus:outline-none"
                />
              </div>
              <Input
                isRequired
                variant="bordered"
                onChange={handleInputChange}
                startContent={
                  <MdOutlineMailOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                name="email"
                color={isinvalid ? "danger" : "default"}
                errorMessage={isinvalid && "Please enter a valid email"}
                type="email"
                label="Email"
                className="w-full mb-3 rounded-xl focus:outline-none"
              />
              <Input
                isRequired
                variant="bordered"
                onChange={handleInputChange}
                startContent={
                  <MdOutlineLocationOn className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                color={isAddressInvalid ? "danger" : "default"}
                errorMessage={isAddressInvalid && "Address is required"}
                type="text"
                name="address"
                label="Alamat"
                className="w-full mb-3 rounded-xl focus:outline-none"
              />
              <div className="flex flex-col md:flex-row gap-2">
                <Input
                  startContent={
                    <MdOutlineKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  name="password"
                  isRequired
                  minLength={8}
                  color={isPasswordInvalid ? "danger" : "default"}
                  errorMessage={isPasswordInvalid && "Password must be at least 8 characters"}
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
                  className="w-full mb-3 rounded-xl focus:outline-none"
                />
                <Input
                  startContent={
                    <MdOutlineKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Konfirmasi Password"
                  isRequired
                  color={isConfirmPasswordInvalid ? "danger" : "default"}
                  errorMessage={isConfirmPasswordInvalid && "Confirm password must be same as password"}
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
                  className="w-full mb-3 rounded-xl focus:outline-none"
                />
              </div>
              <p className="text-md mb-3">
                Sudah punya akun?{" "}
                <a href="/login" className="text-[#07A081]">
                  Login
                </a>
              </p>
              <Button
                type="submit"
                className="p-2 rounded-md bg-[#07A081] text-white cursor-pointer"
              >
                Daftar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
