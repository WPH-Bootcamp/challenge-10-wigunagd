'use client'

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useGetMe } from "../(getme)/hooksGetMe";
import { useAppSelector } from "@/redux/3_redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { tmpProfilePicture } from "../../../public/asset/asset";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
                    <Card className=" w-full max-w-200 mx-auto my-5 px-5 md:px-0">
                        <CardContent className="flex flex-row items-center gap-3">
                            <div className="flex flex-row gap-2 items-center w-3/4">
                                <div className="flex flex-col items-center justify-center w-20 h-20 border rounded-full overflow-hidden">
                                    <Image src={dataMe?.avatarUrl ?? tmpProfilePicture} alt="profile" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold">{dataMe?.name}</span>
                                    <span className="text-md">{dataMe?.headline ?? 'Fronted Developer'}</span>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-end w-1/4">
                                <Button variant='link' className="font-semibold underline">
                                    Edit Profile
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Profile;

