'use client'

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useGetMe } from "../(getme)/hooksGetMe";
import { useAppSelector } from "@/redux/3_redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { iconPageNext, iconPagePrevious, tmpProfilePicture } from "../../../public/asset/asset";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetComments, useGetLikes, useGetMyPosts } from "./hooksMyProfile";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import BlogCard from "@/components/BlogCard";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
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

    const [isDialogStatisticOpen, setIsDialogStatisticOpen] = useState(false);
    const [idStatistic, setIdStatistic] = useState(0);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [idDelete, setIdDelete] = useState(0);
    const [pageQuery, setPageQuery] = useState(1);
    const {
        data: dataRecommendation,
        isLoading: isLoadingRecommendation,
        isFetching: isFetchingRecommendation
    } = useGetMyPosts({ page: pageQuery, limit: 10 });
    const maxPageRecommendation = dataRecommendation?.lastPage ?? 1;

    const { data: dataLikes } = useGetLikes(idStatistic);
    const { data: dataComments } = useGetComments(idStatistic);

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

    const onStatistikClick = ({ id, openDialogStatisticParam }: { id: number, openDialogStatisticParam: boolean }) => {
        setIdStatistic(id);
        setIsDialogStatisticOpen(openDialogStatisticParam);
    }

    const onDeleteClick = ({ id, openDialogDeleteParam }: { id: number, openDialogDeleteParam: boolean }) => {
        setIdDelete(id);
        setIsDialogDeleteOpen(openDialogDeleteParam);
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
                                        h-11
                                        w-44.25
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
                                        h-11
                                        w-44.25
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
                                                    onStatistikClick={(id: number) => onStatistikClick({ id, openDialogStatisticParam: true })}
                                                    onDeleteClick={(id: number) => onDeleteClick({ id, openDialogDeleteParam: true })}
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

                <Dialog open={isDialogStatisticOpen} onOpenChange={() => setIsDialogStatisticOpen(!isDialogStatisticOpen)}>

                    <DialogContent className="md:max-w-153.25 md:max-h-225.5 min-h-[50vh] flex flex-col p-0 gap-0 overflow-hidden">
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
                                        h-11
                                        w-44.25
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
                                        h-11
                                        w-44.25
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

                            <TabsContent value="liketab" className="mt-6 flex flex-col gap-2">
                                <span className="text-lg font-bold">Like ({dataLikes?.length ?? 0})</span>
                                <div className="flex flex-col gap-2">
                                    {
                                        dataLikes?.map((likes, i) => (
                                            <div key={i} className={`flex flex-row py-3 gap-3 ${i < (dataLikes.length - 1) ? 'border-b' : ''}`}>
                                                <Image src={likes.avatarUrl ?? tmpProfilePicture} alt={likes.name} width={48} height={48} className="w-12 h-12 rounded-full" />
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-semibold">{likes.name}</span>
                                                    <span className="text-sm">{likes.headline}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </TabsContent>

                            <TabsContent value="commenttab" className="mt-6 flex flex-col gap-2">
                                <span className="text-lg font-bold">Comment ({dataComments?.length ?? 0})</span>
                                <div className="flex flex-col gap-2">
                                    {
                                        dataComments?.map((comment, i) => (
                                            <div key={i} className={`flex flex-row py-3 gap-3 ${i < (dataComments.length - 1) ? 'border-b' : ''}`}>
                                                <Image src={comment.author.avatarUrl ?? tmpProfilePicture} alt={comment.author.name} width={48} height={48} className="w-12 h-12 rounded-full" />
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-semibold">{comment.author.name}</span>
                                                    <span className="text-sm">{comment.author.headline}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>

                <Dialog open={isDialogDeleteOpen} onOpenChange={() => setIsDialogDeleteOpen(!isDialogDeleteOpen)}>

                    <DialogContent className="md:max-w-134.25 flex flex-col gap-4 overflow-hidden rounded-3xl p-3">
                        <DialogHeader className="p-6 pb-2 flex-none">
                            <DialogTitle className="text-xl font-bold">
                                Delete
                            </DialogTitle>
                        </DialogHeader>
                        <p className="mx-6">Are you sure to delete?</p>
                        <DialogFooter className="justify-end px-6">
                            <Button variant={'ghost'} className="rounded-full text-sm w-full max-w-42.75 h-12">Cancel</Button>
                            <Button className="rounded-full text-sm font-semibold bg-danger w-full max-w-42.75 h-12">Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </main>
            <Footer />
        </div>
    );
}

export default Profile;

