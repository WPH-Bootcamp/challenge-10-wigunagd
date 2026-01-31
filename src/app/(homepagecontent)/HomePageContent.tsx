'use client'

import BlogCard from "@/components/BlogCard";
import { useGetHomePageContents } from "./hooksHomepageContents";
import { useState } from "react";

const HomePageContent = () => {
    const [pageQuery, setPageQuery] = useState(1);
    const {data: dataRecommendation, isLoading: isLoadingRecommendation} = useGetHomePageContents({page: 1, limit: 10});

    console.log(dataRecommendation, 'dataRecommendation');

    return (
        <div className="md:flex grid w-full max-w-[1440px] md:mx-0 md:px-0 px-4 gap-5">
            <div className="md:w-3/4 md:border-r-2 md:pr-10">
                <h1 className="text-3xl font-bold mt-7">Recommend For You</h1>

                {
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
                }


            </div>
            <aside className="md:w-1/4">
                <h1 className="text-3xl font-bold m7-7">Most Liked</h1>
            </aside>
        </div>
    )
}

export default HomePageContent;