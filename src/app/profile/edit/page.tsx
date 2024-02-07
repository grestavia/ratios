"use client";
import Sidebar from "@/app/components/sidebar";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { Badge, Input } from "@nextui-org/react";
import { format } from 'date-fns';
import { id } from 'date-fns/locale'
import { formatRelative, subDays } from 'date-fns'

export default function EditProfile() {
  const [photoplaceholder, setPhotoPlaceholder] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  interface FormData {
    username: string;
    fullName: string;
    address: string;
    photoUrl: any;
    email: string;
  }

  const [formData, setFormData] = useState<FormData>({
    'username': '',
    'fullName': '',
    'address': '',
    'email': '',
    'photoUrl': null
  })


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhotoPlaceholder(URL.createObjectURL(file));
      setPhoto(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = {
      username: formData.username,
      fullName: formData.fullName,
      address: formData.address,
      email: formData.email,
      photoUrl: photo
    }
    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_RATIO + "/users/account/profile",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Photo uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserData = async () => {
      const responseUser = await axios.get(
        process.env.NEXT_PUBLIC_API_RATIO + `/users/account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataUser = responseUser.data.data;
      if (Array.isArray(dataUser)) {
        const firstUser = dataUser[0];
        setFormData({
          username: firstUser.username,
          fullName: firstUser.fullName,
          address: firstUser.address,
          photoUrl: firstUser.photoUrl,
          email: firstUser.email,
        });
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
        <Sidebar />
        <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="max-w-2xl">
            <section className="head pt-2 pl-2 lg:pl-5 flex flex-col gap-0 lg:gap-1">
              <h1 className="lg:text-2xl text-md font-medium">Edit Profile</h1>
              <h3 className="text-xs">Pilih dan Unggah File Pilihan Anda</h3>
            </section>
            <hr className="mt-3" />
            <section className="mt-5">
              <form action="" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col mb-5 items-center">
                  <Badge content="+" size="lg" color="primary">
                    <div
                      className="h-[90px] w-[90px] hover:brightness-75 cursor-pointer rounded-full"
                      onClick={() =>
                        (
                          document.querySelector(".field") as HTMLElement
                        ).click()
                      }
                    >
                      <input
                        type="file"
                        className="hidden field"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        name=""
                        id=""
                      />
                      {photoplaceholder ? (
                        <img
                          src={photoplaceholder}
                          className="hover:brightness-75 h-[90px] w-[90px] rounded-full"
                        />
                      ) : (
                        <>
                          <img
                            src={
                              formData?.photoUrl &&
                              process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${formData?.photoUrl}`
                            }
                            alt=""
                            className="rounded-full h-[90px] w-[90px] hover: brightness-75"
                          />
                        </>
                      )}
                    </div>
                  </Badge>
                </div>
                <div className="flex flex-col md:flex-row gap-0 md:gap-4">
                  <Input
                    onChange={handleInputChange}
                    type="text"
                    name="fullName"
                    label="Nama"
                    value={formData.fullName}
                    required
                    className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
                  />
                  <Input
                    type="text"
                    name="username"
                    label="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
                  />
                </div>
                <Input
                  value={formData.email}
                  readOnly
                  label="Email"
                  className="mb-3"
                />
                <Input
                  value={formData.address}
                  label="Alamat"
                  required
                  className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
                  onChange={handleInputChange}
                  name="address"
                />
                <input
                  type="submit"
                  value="Perbarui"
                  className="w-full cursor-pointer bg-[#07A081] rounded-md py-3 px-2 text-white"
                />
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
