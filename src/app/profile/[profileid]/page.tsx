'use client'

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/redux/3_redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetProfile } from "./hooksProfile";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import Image from "next/image";
import { tmpProfilePicture } from "../../../../public/asset/asset";

const Profile = () => {
    const params = useParams();
    const profileid = params.profileid as string;
    const authState = useAppSelector((state) => state.auth);
    const isuser = (authState.accessToken !== "" && authState.isLoggedin);
    const meState = useAppSelector((state) => state.me);
    const router = useRouter();

    useEffect(() => {
        if (meState.id !== null && meState.id === Number(profileid) && isuser) {
            router.push('/myprofile');
            return;
        }
    }, [isuser, meState.id, profileid, router]);

    const profileidNum = Number(profileid)
    const { data: dataProfile, isLoading: isLoadingProfile } = useGetProfile(profileidNum);

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="container mt-20 mx-auto w-full max-w-360 py-2 grow">
                <div className="flex flex-col w-full max-w-200 mx-auto my-5 px-5 md:px-0 gap-5">
                    <div className="flex flex-col pb-5 border-b">
                        {isLoadingProfile && (
                            <ProfileSkeleton />
                        )}

                        {!isLoadingProfile && (
                            <div className="flex flex-row gap-2 items-center w-full">
                                <div className="flex flex-col items-center justify-center w-20 h-20 border rounded-full overflow-hidden">
                                    <Image src={dataProfile?.avatarUrl ?? tmpProfilePicture} alt="profile" width={80} height={80} className="w-20 h-20" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold">{dataProfile?.name}</span>
                                    <span className="text-md">{dataProfile?.headline ?? '-'}</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Profile;

