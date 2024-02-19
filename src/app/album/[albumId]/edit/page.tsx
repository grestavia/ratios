'use client'
import Sidebar from "@/app/components/layout/sidebar"
import axios from "axios"
import { useState, useEffect } from "react"

export default function EditAlbum({ params }: { params: { albumId: string } }) {
    return (
        <>
        <div className="flex justify-between pt-20 px-5 lg:px-5">
        <Sidebar />
        <div className="konten overflow-scroll scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb- w-full overflow-x-hidden p-5 bg-white h-[calc(100vh-110px)] rounded-lg">
            
        </div>
      </div>
        </>
    )
}