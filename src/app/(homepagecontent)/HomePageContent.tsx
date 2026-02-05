'use client'

import BlogCard from "@/components/BlogCard";
import BlogCardNoPic from "@/components/BlogCardNoPic";
import { useGetRecommendations, useGetMostLiked } from "./hooksHomepageContents";
import { useEffect, useState } from "react";
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
    } = useGetRecommendations({ page: pageQuery, limit: 10 });

    const {
        data: dataMostLiked,
        isLoading: isLoadingMostLiked,
        isFetching: isFetchingMostLiked
    } = useGetMostLiked({ page: pageQuery, limit: 10 });

    // variabel untuk pagination
    const maxPageRecommendation = dataRecommendation?.lastPage ?? 1;
    const p = pageQuery;
    const X = maxPageRecommendation;
    const n = 3;
    let start = Math.max(1, p - Math.floor(n / 2));
    const end = Math.min(X, start + n - 1);
    if (end === X) {
        start = Math.max(1, X - n + 1);
    }
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    // variabel untuk pagination

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

    const scrolltToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (!isFetchingRecommendation && !isLoadingRecommendation && dataRecommendation) {
            scrolltToTop();
        }
    }, [isFetchingRecommendation, isLoadingRecommendation, dataRecommendation]);

    return (
        <div className="md:flex grid w-full max-w-[1200px] md:mx-0 md:mb-15 md:px-0 px-4 gap-5">
            <aside className="md:w-3/4 md:border-r-2 md:pr-10 relative">
                <h1 id="recomendation" className="text-3xl font-bold mt-7">Recommend For You </h1>

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

                {(maxPageRecommendation > 1) && (
                    <div id="pagination"
                        className={`flex flex-row w-full justify-center items-center my-2 gap-2 
                    ${isFetchingRecommendation ? 'opacity-50 pointer-events-none' : ''}`}>

                        <Button
                            disabled={pageQuery === 1}
                            onClick={() => handlePageNextPrev(-1)}
                            variant={'ghost'} className="flex">
                            <Image src={iconPagePrevious} alt="Icon Page Previous" /> Previous
                        </Button>

                        <div className="flex items-center gap-2">
                            {start > 1 && (
                                <span className="bg-transparent px-1">...</span>
                            )}

                            {pages.map((pageNum) => (
                                <Button
                                    key={pageNum}
                                    onClick={() => handlePage(pageNum)}
                                    variant={p === pageNum ? 'default' : 'ghost'}
                                    className="rounded-full w-12 h-12"
                                >
                                    {pageNum}
                                </Button>
                            ))}

                            {end < X && (
                                 <span className="bg-transparent px-1">...</span>
                            )}
                        </div>

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