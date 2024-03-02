import { User } from "@nextui-org/react";
import Link from "next/link";

export default function DetailPostHeader({ post }: any) {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-xl md:text-3xl font-semibold">{post?.data.title}</h1>
        <p className="md:text-md text-sm">{post?.data.description}</p>
        <Link href={`/profile/${post?.data.user.username}`}>
          <User
            className="md:mt-5 mt-3 justify-start"
            name={post?.data.user.fullName}
            description={<p>@{post?.data.user.username}</p>}
            avatarProps={{ src: post?.data.user.photoUrl && process.env.NEXT_PUBLIC_API_RATIO + `/files/images/profiles/${post.data.user.photoUrl}` }}
          />
        </Link>
      </div>
    </>
  );
}
