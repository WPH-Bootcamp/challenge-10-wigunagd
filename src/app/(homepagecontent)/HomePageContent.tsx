'use client'

import BlogCard from "@/components/BlogCard";
import BlogCardNoPic from "@/components/BlogCardNoPic";
import { useGetRecommendations, useGetMostLiked } from "./hooksHomepageContents";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { iconPagePrevious, iconPageNext } from "../../../public/asset/asset";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import { BlogCardNoPicSkeleton } from "@/components/BlogCardNoPicSkeleton";

const HomePageContent = () => {
    const [pageQuery, setPageQuery] = useState(1);
    const {
        data: dataRecommendation,
        isLoading: isLoadingRecommendation,
        isFetching: isFetchingRecommendation
    } = useGetRecommendations({ page: pageQuery, limit: 3 });

    const {
        data: dataMostLiked,
        isLoading: isLoadingMostLiked,
        isFetching: isFetchingMostLiked
    } = useGetMostLiked({ page: pageQuery, limit: 3 });

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

    return (
        <div className="md:flex grid w-full max-w-[1440px] md:mx-0 md:mb-15 md:px-0 px-4 gap-5">
            <aside className="md:w-3/4 md:border-r-2 md:pr-10 relative">
                <h1 className="text-3xl font-bold mt-7">Recommend For You </h1>

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

            </aside>

            <aside className="md:w-1/4">
                <h1 className="text-3xl font-bold mt-7">Most Liked</h1>

                <div className="w-full flex flex-col relative">

                    {(isLoadingMostLiked || isFetchingMostLiked) && (
                        <BlogCardNoPicSkeleton />
                    )}

                    {
                        dataMostLiked?.data?.map((post) => (

                            /* id, title, content, likes, comments */
                            <BlogCardNoPic
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                likes={post.likes}
                                comments={post.comments}
                            />
                        ))
                    }
                </div>
            </aside>
        </div>
    )
}

export default HomePageContent;