'use client'

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/3_redux";
import { logout } from "@/redux/1_authSlice";
import { useGetMe } from "@/app/(getme)/hooksGetMe";
import { setMeData } from "@/redux/1_meSlice";
import NavigationProfilePart from "./NavigationProfilePart";
import { FaArrowLeft } from "react-icons/fa6";


const NavigationWriteEdit = ({title}:{title: string}) => {
    const authState = useAppSelector((state) => state.auth);
    const isuser = (authState.accessToken !== "" && authState.isLoggedin);
    const { data: dataMe } = useGetMe({ enabled: isuser });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (dataMe) {
            dispatch(setMeData(dataMe))
        }
    }, [dataMe, dispatch]);


    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <header className="fixed flex w-full top-0 bg-white border-b z-50">
            <nav className="flex w-full max-w-[1200px] h-[80px] mx-auto items-center justify-between md:px-0 px-5 relative">

                <div className="flex gap-3">
                    <Link href="/myprofile" className="flex md:text-2xl text-lg font-semibold items-center gap-2 shrink-0 ">
                        <FaArrowLeft />
                    </Link>
                    <div className="flex md:text-2xl text-lg font-semibold items-center gap-2 shrink-0 ">{title}</div>
                </div>



                <div className="flex items-center md:gap-4">
                    <div className="flex items-center h-full gap-2 pl-2 order-2">
                        <NavigationProfilePart
                            avatarUrl={dataMe?.avatarUrl ?? null}
                            name={dataMe?.name ?? null}
                            handleLogout={handleLogout}
                        />
                    </div>
                </div>

            </nav>
        </header>
    );
}

export default NavigationWriteEdit;