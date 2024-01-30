"use client";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import Link from "next/link";

export default function Profile() {
  const variant = "underlined";

  return (
    <>
      <Header />
      <div className="flex justify-between pt-20 px-5 lg:pr-10 lg:pl-0">
        <Sidebar />
        <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
          <div className="flex items-center pt-3 md:pt-10 w-full">
            <div className="profile mx-auto flex gap-5 flex-col items-center">
              <img
                src="/logo.png"
                className="p-1 bg-white border-3 border-dashed border-[#07A081] rounded-full w-[95px] h-[95px]"
                alt=""
              />
              <div className="flex flex-col items-center">
                <h1 className="text-xl font-semibold">Username</h1>
                <h3 className="text-md">useremail@gmail.com</h3>
              </div>
              <Tabs
                size="md"
                key={variant}
                variant={variant}
                aria-label="Options"
              >
                <Tab key="post" title="Post">
                  <div className="w-full lg:columns-4 md:columns-3 columns-2 gap-3">
                    <Link href={"/"}>
                      <img
                        src="https://source.unsplash.com/OyCl7Y4y0Bk"
                        className="rounded-md mb-3"
                        alt=""
                      />
                    </Link>
                    <Link href={"/"}>
                      <img
                        src="https://source.unsplash.com/Kl1gC0ve620"
                        className="rounded-md mb-3"
                        alt=""
                      />
                    </Link>
                    <Link href={"/"}>
                      <img
                        src="https://source.unsplash.com/55btQzyDiO8"
                        className="rounded-md mb-3"
                        alt=""
                      />
                    </Link>
                    <Link href={"/"}>
                      <img
                        src="https://source.unsplash.com/g0dBbrGmMe0"
                        className="rounded-md mb-3"
                        alt=""
                      />
                    </Link>
                    <Link href={"/"}>
                      <img
                        src="https://source.unsplash.com/v1OW17UcR-Q"
                        className="rounded-md mb-3"
                        alt=""
                      />
                    </Link>
                    <Link href={"/"}>
                      <img
                        src="https://source.unsplash.com/Wpg3Qm0zaGk"
                        className="rounded-md mb-3"
                        alt=""
                      />
                    </Link>
                    <Link href={"/"}>
                      <img
                        src="https://source.unsplash.com/W3FC_bCPw8E"
                        className="rounded-md mb-3"
                        alt=""
                      />
                    </Link>
                  </div>
                </Tab>
                <Tab key="album" title="Album">
                  <div className=" border-2 border-green w-full lg:columns-4 md:columns-3 columns-1 gap-3">
                    <Link href={'/'}>
                      <Card shadow="none">
                        <CardBody className="grid md:grid-cols-2 gap-2">
                          <Image
                            src="https://source.unsplash.com/W3FC_bCPw8E"
                            className="aspect-square"
                          />
                          <Image
                            src="https://source.unsplash.com/W3FC_bCPw8E"
                            className="aspect-square md:block hidden"
                          />
                          <Image
                            src="https://source.unsplash.com/W3FC_bCPw8E"
                            className="aspect-square md:block hidden"
                          />
                          <Image
                            src="https://source.unsplash.com/W3FC_bCPw8E"
                            className="aspect-square md:block hidden"
                          />
                        </CardBody>
                      </Card>
                    </Link>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
