import { MdError } from "react-icons/md";

export default function ForgotPassword() {
    return(
        <>
        <div className="bg-white px-7 py-3 absolute top-unit-20 rounded-md left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center">
                <MdError className="text-[#cf3d3d] w-9 h-9" />
                <section className="message flex flex-col mx-3">
                    <h1 className="text-md font-semibold">Lupa Password</h1>
                    <p className="text-sm">Content</p>
                </section>
            </div>
        </div>
        </>
    )
}