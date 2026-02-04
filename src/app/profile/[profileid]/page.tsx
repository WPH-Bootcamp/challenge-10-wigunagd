'use client'

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/redux/3_redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

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

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="container mt-20 mx-auto w-full max-w-360 py-2 grow">
                {meState.id}
            </main>
            <Footer />
        </div>
    );
}

export default Profile;

