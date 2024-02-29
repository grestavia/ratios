'use client'
import { Button, User } from "@nextui-org/react";

export default function UserList({ userdata }: any) {

    return (
        <>
            <div className="w-1/3 border-r">
                <section className="sticky bg-white top-0">
                    <h1 className="mx-auto font-medium text-lg text-center pt-4">@{userdata.username}</h1>
                    <p className="mx-auto text-sm font-normal text-center pb-4">Pesan Pribadi</p>
                    <hr />
                </section>
                <section className="scrollbar-thin pt-3 scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-rounded-full overflow-auto max-h-[calc(100vh-190px)]">
                <ul>
                    <li className="w-full py-2 px-5 cursor-pointer rounded-md hover:bg-neutral-200">
                        <User
                            className="justify-start"
                            name={<p className="text-md">Tes</p>}
                            description='last message'
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                size: "lg"
                            }}
                        />
                    </li>
                    <li className="w-full py-2 px-5 cursor-pointer rounded-md hover:bg-neutral-200">
                        <User
                            className="justify-start"
                            name={<p className="text-md">Tes</p>}
                            description='last message'
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                size: "lg"
                            }}
                        />
                    </li>
                    <li className="w-full py-2 px-5 cursor-pointer rounded-md hover:bg-neutral-200">
                        <User
                            className="justify-start"
                            name={<p className="text-md">Tes</p>}
                            description='last message'
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                size: "lg"
                            }}
                        />
                    </li>
                    <li className="w-full py-2 px-5 cursor-pointer rounded-md hover:bg-neutral-200">
                        <User
                            className="justify-start"
                            name={<p className="text-md">Tes</p>}
                            description='last message'
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                size: "lg"
                            }}
                        />
                    </li>
                    <li className="w-full py-2 px-5 cursor-pointer rounded-md hover:bg-neutral-200">
                        <User
                            className="justify-start"
                            name={<p className="text-md">Tes</p>}
                            description='last message'
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                size: "lg"
                            }}
                        />
                    </li>
                    <li className="w-full py-2 px-5 cursor-pointer rounded-md hover:bg-neutral-200">
                        <User
                            className="justify-start"
                            name={<p className="text-md">Tes</p>}
                            description='last message'
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                size: "lg"
                            }}
                        />
                    </li>
                    <li className="w-full py-2 px-5 cursor-pointer rounded-md hover:bg-neutral-200">
                        <User
                            className="justify-start"
                            name={<p className="text-md">Tes</p>}
                            description='last message'
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                size: "lg"
                            }}
                        />
                    </li>
                    <li className="w-full py-2 px-5 cursor-pointer rounded-md hover:bg-neutral-200">
                        <User
                            className="justify-start"
                            name={<p className="text-md">Tes</p>}
                            description='last message'
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                size: "lg"
                            }}
                        />
                    </li>
                </ul>
                </section>
            </div>
        </>
    );
}