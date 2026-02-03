'use client'

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useGetMe } from "../(getme)/hooksGetMe";
import { useAppSelector } from "@/redux/3_redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { iconComment, iconLike, iconPageNext, iconPagePrevious, tmpProfilePicture } from "../../../public/asset/asset";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetMyPosts } from "./hooksMyProfile";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import BlogCard from "@/components/BlogCard";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { BiLike } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";




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

    const [isDialogCommentOpen, setIsDialogCommentOpen] = useState(false);
    const [idStatistic, setIdStatistic] = useState(0);
    const [pageQuery, setPageQuery] = useState(1);
    const {
        data: dataRecommendation,
        isLoading: isLoadingRecommendation,
        isFetching: isFetchingRecommendation
    } = useGetMyPosts({ page: pageQuery, limit: 10 });
    const maxPageRecommendation = dataRecommendation?.lastPage ?? 1;

    const handlePageNextPrev = (i: number) => {
        let valPageQuery = pageQuery + i;

        if (valPageQuery < 1) {
            valPageQuery = 1;
        }

        if (valPageQuery > maxPageRecommendation) {
            valPageQuery = maxPageRecommendation;
        }

        setPageQuery(valPageQuery);
    }

    const handlePage = (i: number) => {
        if (i !== pageQuery) {
            setPageQuery(Math.abs(i));
        }
    }

    const onStatisticClick = ({ id, openDialogStatisticParam }: { id: number, openDialogStatisticParam: boolean }) => {
        setIdStatistic(id);
        setIsDialogCommentOpen(openDialogStatisticParam);
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="container mt-20 mx-auto w-full max-w-360 py-2 grow">
                {isuser && (
                    <div className="flex flex-col w-full max-w-200 mx-auto my-5 px-5 md:px-0 gap-5">
                        <Card>
                            <CardContent className="flex flex-row items-center gap-3">
                                <div className="flex flex-row gap-2 items-center w-3/4">
                                    <div className="flex flex-col items-center justify-center w-20 h-20 border rounded-full overflow-hidden">
                                        <Image src={dataMe?.avatarUrl ?? tmpProfilePicture} alt="profile" width={80} height={80} className="w-20 h-20" />
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

                        <Tabs defaultValue="yourpost" className="w-full">
                            <TabsList className="bg-transparent h-auto p-0 flex gap-4 border-b-2">
                                <TabsTrigger value="yourpost" asChild>
                                    <Button
                                        variant="tabs"
                                        className=" 
                                        rounded-none
                                        h-[44px]
                                        w-[177px]
                                        data-[state=active]:shadow-none 
                                        data-[state=active]:border-b-3 
                                        data-[state=active]:border-b-primary 
                                        data-[state=active]:text-primary
                                        "
                                    >
                                        Your Post
                                    </Button>
                                </TabsTrigger>
                                <TabsTrigger value="changepassword" asChild>
                                    <Button
                                        variant="tabs"
                                        className=" 
                                        rounded-none
                                        h-[44px]
                                        w-[177px]
                                        data-[state=active]:shadow-none 
                                        data-[state=active]:border-b-3 
                                        data-[state=active]:border-b-primary 
                                        data-[state=active]:text-primary
                                        "
                                    >
                                        Change Password
                                    </Button>
                                </TabsTrigger>

                            </TabsList>

                            <TabsContent value="yourpost" className="mt-6">
                                <div className="w-full flex flex-col relative">

                                    {
                                        (isLoadingRecommendation || isFetchingRecommendation) ? (
                                            <BlogCardSkeleton />
                                        ) : (
                                            dataRecommendation?.data?.map((post) => (
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
                                                    action
                                                    onStatisticClick={(id) => onStatisticClick({ id, openDialogStatisticParam: true })}
                                                />
                                            ))
                                        )
                                    }
                                </div>

                                {(!isLoadingRecommendation && maxPageRecommendation > 1) && (
                                    <div id="pagination"
                                        className={`flex flex-row w-full justify-center items-center my-2 gap-2 
                                        ${isFetchingRecommendation ? 'opacity-50 pointer-events-none' : ''}`}>

                                        <Button
                                            disabled={pageQuery === 1}
                                            onClick={() => handlePageNextPrev(-1)}
                                            variant={'ghost'} className="flex">
                                            <Image src={iconPagePrevious} alt="Icon Page Previous" /> Previous
                                        </Button>

                                        {
                                            Array.from({ length: maxPageRecommendation }, (_, i) => {
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
                                            disabled={pageQuery === maxPageRecommendation}
                                            onClick={() => handlePageNextPrev(1)}
                                            variant={'ghost'} className="flex">
                                            Next <Image src={iconPageNext} alt="Icon Next Previous" />
                                        </Button>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="changepassword" className="mt-6">
                                Change Password Content Here
                            </TabsContent>
                        </Tabs>
                    </div>
                )}

                <Dialog open={isDialogCommentOpen} onOpenChange={() => setIsDialogCommentOpen(!isDialogCommentOpen)}>
                    <DialogTrigger asChild>
                        <Button variant="link" className="font-bold underline p-0">
                            See All Comments
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="md:max-w-[613px] md:max-h-[902px] h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
                        <DialogHeader className="p-6 pb-2 flex-none">
                            <DialogTitle className="text-xl font-bold">
                                Statistic
                            </DialogTitle>
                        </DialogHeader>
                        <Tabs defaultValue="liketab" className="w-full px-5">
                            <TabsList className="bg-transparent h-auto p-0 flex gap-4 border-b-2 w-full">
                                <TabsTrigger value="liketab" asChild>
                                    <Button
                                        variant="tabs"
                                        className=" 
                                        rounded-none
                                        h-[44px]
                                        w-[177px]
                                        data-[state=active]:shadow-none 
                                        data-[state=active]:border-b-3 
                                        data-[state=active]:border-b-primary 
                                        data-[state=active]:text-primary
                                        "
                                    >
                                        <BiLike />
                                        Like
                                    </Button>
                                </TabsTrigger>
                                <TabsTrigger value="commenttab" asChild>
                                    <Button
                                        variant="tabs"
                                        className=" 
                                        rounded-none
                                        h-[44px]
                                        w-[177px]
                                        data-[state=active]:shadow-none 
                                        data-[state=active]:border-b-3 
                                        data-[state=active]:border-b-primary 
                                        data-[state=active]:text-primary
                                        "
                                    >
                                        <VscComment />
                                        Comment
                                    </Button>
                                </TabsTrigger>

                            </TabsList>

                            <TabsContent value="liketab" className="mt-6">
                                Like Here
                            </TabsContent>

                            <TabsContent value="commenttab" className="mt-6">
                                Comment Here
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            </main>
            <Footer />
        </div>
    );
}

export default Profile;

