'use client'

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useGetMe } from "../(getme)/hooksGetMe";
import { useAppSelector } from "@/redux/3_redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { tmpProfilePicture } from "../../../public/asset/asset";
import Image from "next/image";

const Profile = () => {
    const authState = useAppSelector((state) => state.auth);
    const isuser = (authState.accessToken !== "" && authState.isLoggedin);
    const { data: dataMe } = useGetMe({ enabled: isuser });
    const router = useRouter();

    useEffect(() => {
        if (authState.accessToken === "" || !authState.isLoggedin) {
            router.push('/login');
        }
    }, [authState.accessToken, authState.isLoggedin, router]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="container mt-20 mx-auto w-full max-w-360 py-2 grow">
                {isuser && (
                    <div className="flex flex-row items-center gap-3 w-full max-w-200 mx-auto my-5 px-5 md:px-0">
                        <div className="flex flex-col items-center justify-center w-10 h-10 border rounded-full overflow-hidden">
                            <Image src={dataMe?.avatarUrl ?? tmpProfilePicture} alt="profile" />
                        </div>
                        <span className="hidden md:inline">{dataMe?.name}</span>
                        <span className="hidden md:inline">{dataMe?.headline}</span>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Profile;

