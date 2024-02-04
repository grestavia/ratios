"use client";
import Sidebar from "@/app/components/sidebar";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { Badge, Input } from "@nextui-org/react";

export default function EditProfile() {
  const [userdata, setUserData] = useState<any>([]);
  const [photoplaceholder, setPhotoPlaceholder] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [adress, setAdress] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhotoPlaceholder(URL.createObjectURL(file));
      setPhoto(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setName(value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      photoUrl: photo,
      fullName: name,
      address: adress,
    };

    try {
      const response = await axios.put(
        "http://localhost:5000/users/account/profile",
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
        `http://localhost:5000/users/account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataUser = responseUser.data.data;
      if (Array.isArray(dataUser)) {
        const userId = dataUser.map((user) => user.id);
        console.log(dataUser);
        setUserData(dataUser[0]);
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
                              userdata?.photoUrl &&
                              `http://localhost:5000/files/images/profiles/${userdata?.photoUrl}`
                            }
                            alt=""
                            className="rounded-full h-[90px] w-[90px] hover: brightness-75"
                          />
                        </>
                      )}
                    </div>
                  </Badge>
                </div>
                <div className="flex flex-row gap-4">
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    label="Nama"
                    required
                    className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
                  />
                  <Input
                    type="text"
                    name="username"
                    value={`@${userdata.username}`}
                    label="Username"
                    readOnly
                  />
                </div>
                <Input
                  value={userdata.email}
                  readOnly
                  label="Email"
                  className="mb-3"
                />
                <Input
                  value={userdata.address}
                  label="Alamat"
                  required
                  className="w-full mb-3 border-2 border-[#07A081] rounded-xl focus:outline-none"
                  onChange={(e) => setAdress(e.target.value)}
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
