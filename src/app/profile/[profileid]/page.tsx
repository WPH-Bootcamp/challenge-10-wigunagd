'use client'

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/redux/3_redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetProfile, useGetProfilePosts } from "./hooksProfile";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import Image from "next/image";
import { iconBlankDocument, iconPageNext, iconPagePrevious, tmpProfilePicture } from "../../../../public/asset/asset";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";

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

    const profileidNum = Number(profileid);
    const { data: dataProfile, isLoading: isLoadingProfile } = useGetProfile(profileidNum);
    const byUserName = dataProfile?.username;
    const [pageQuery, setPageQuery] = useState(1);
    const {
        data: dataPosts,
        isLoading: isLoadingPosts,
        isFetching: isFetchingPosts
    } = useGetProfilePosts({ byUserName: byUserName, page: pageQuery, limit: 10 });
    const maxPagePosts = dataPosts?.lastPage ?? 1;

    const handlePageNextPrev = (i: number) => {
        let valPageQuery = pageQuery + i;

        if (valPageQuery < 1) {
            valPageQuery = 1;
        }

        if (valPageQuery > maxPagePosts) {
            valPageQuery = maxPagePosts;
        }

        setPageQuery(valPageQuery);
    }

    const handlePage = (i: number) => {
        if (i !== pageQuery) {
            setPageQuery(Math.abs(i));
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="container mt-20 mx-auto w-full max-w-360 py-2 grow">
                <div className="flex flex-col w-full max-w-200 mx-auto my-5 px-5 md:px-0 gap-5">
                    <div className="flex flex-col pb-5 gap-4">
                        {isLoadingProfile && (
                            <ProfileSkeleton />
                        )}

                        {!isLoadingProfile && (
                            <div className="flex flex-row gap-2 items-center w-full border-b pb-5">
                                <div className="flex flex-col items-center justify-center w-20 h-20 border rounded-full overflow-hidden">
                                    <Image src={dataProfile?.avatarUrl ?? tmpProfilePicture} alt="profile" width={80} height={80} className="w-20 h-20" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold">{dataProfile?.name}</span>
                                    <span className="text-md">{dataProfile?.headline ?? '-'}</span>
                                </div>
                            </div>
                        )}

                        {isLoadingPosts && (
                            <BlogCardSkeleton />
                        )}

                        {!isLoadingPosts && (dataPosts?.data?.length ?? 0) < 1 && (
                            <div className="w-full flex flex-col relative items-center text-center mt-[60px] md:px-0 px-16 gap-4">
                                <Image src={iconBlankDocument} width={118} height={135} alt="No Result" />
                                <b className="text-sm">No posts from this user yet</b>
                                <p className="text-sm">Stay tuned for future posts</p>
                            </div>
                        )}

                        {!isLoadingPosts && (dataPosts?.data?.length ?? 0) > 0 && (
                            <div className="w-full flex flex-col relative">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold">{dataPosts?.data?.length ?? 0} Post</span>

                                </div>
                                {
                                    (isLoadingPosts || isFetchingPosts) ? (
                                        <BlogCardSkeleton />
                                    ) : (
                                        dataPosts?.data?.map((post) => (
                                            <BlogCard
                                                key={post.id}
                                                id={post.id}
                                                title={post.title}
                                                content={post.content}
                                                tags={post.tags}
                                                imageUrl={post.imageUrl}
                                                author={post.author}
                                                createdAt={post.createdAt}
                                                likes={post.likes}
                                                comments={post.comments}
                                            />
                                        ))
                                    )
                                }
                            </div>
                        )}

                        {(!isLoadingPosts && maxPagePosts > 1) && (
                            <div id="pagination"
                                className={`flex flex-row w-full justify-center items-center my-2 gap-2 
                                        ${isFetchingPosts ? 'opacity-50 pointer-events-none' : ''}`}>

                                <Button
                                    disabled={pageQuery === 1}
                                    onClick={() => handlePageNextPrev(-1)}
                                    variant={'ghost'} className="flex">
                                    <Image src={iconPagePrevious} alt="Icon Page Previous" /> Previous
                                </Button>

                                {
                                    Array.from({ length: maxPagePosts }, (_, i) => {
                                        const p = i + 1;
                                        return (
                                            <Button
                                                onClick={() => handlePage(p)}
                                                variant={pageQuery === p ? 'default' : 'ghost'}
                                                key={p}
                                                className="rounded-full w-12 h-12"
                                            >{p}</Button>
                                        )
                                    })
                                }

                                <Button
                                    disabled={pageQuery === maxPagePosts}
                                    onClick={() => handlePageNextPrev(1)}
                                    variant={'ghost'} className="flex">
                                    Next <Image src={iconPageNext} alt="Icon Next Previous" />
                                </Button>
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

