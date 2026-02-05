import { iconBlankDocument, iconPageNext, iconPagePrevious } from "../../public/asset/asset";
import { Button } from "./ui/button";
import Image from "next/image";
import { BlogResponse } from "@/types/blog";
import BlogCard from "./BlogCard";
import { BlogCardSkeleton } from "./BlogCardSkeleton";

type SearchMenuViewProps = {
    searchText: string,
    dataSearch: BlogResponse | undefined,
    handleOpenSearch: () => void,
    isLoadingSearch: boolean,
    isFetchingSearch: boolean,
    pageSearchQuery: number,
    setPageSearchQuery: (page: number) => void
}

const SearchResultView = ({ searchText, dataSearch, handleOpenSearch, isLoadingSearch, isFetchingSearch, pageSearchQuery, setPageSearchQuery }: SearchMenuViewProps) => {
    const hasData = ((dataSearch?.data?.length ?? 0) >= 1);
    // variabel untuk pagination
    const maxPageSearch = dataSearch?.lastPage ?? 1;
    const p = pageSearchQuery;
    const X = maxPageSearch;
    const n = 3;
    let start = Math.max(1, p - Math.floor(n / 2));
    const end = Math.min(X, start + n - 1);
    if (end === X) {
        start = Math.max(1, X - n + 1);
    }
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    // variabel untuk pagination

    const handlePageSearchNextPrev = (i: number) => {
        let valPageQuery = pageSearchQuery + i;

        if (valPageQuery < 1) {
            valPageQuery = 1;
        }

        if (valPageQuery > maxPageSearch) {
            valPageQuery = maxPageSearch;
        }

        setPageSearchQuery(valPageQuery);
    }

    const handlePageSearch = (i: number) => {
        if (i !== pageSearchQuery) {
            setPageSearchQuery(Math.abs(i));
        }
    }

    return (
        <div className="flex w-full min-h-full flex-col items-center pb-15 relative">
            {(isLoadingSearch || isFetchingSearch) && (
                <BlogCardSkeleton className="pt-15 md:pt-0" />
            )}

            {
                (dataSearch && hasData && searchText !== "") && (
                    <div id="hasresult" className="flex flex-col w-full max-w-[1440px] px-4 md:px-10 pt-20 md:pt-10">
                        <h1 className="text-3xl font-bold">Result for {`"${searchText}"`} </h1>

                        {
                            dataSearch?.data?.map((post) => (
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
                )
            }

            {
                (!isLoadingSearch && !isFetchingSearch && (!hasData || searchText === "")) && (
                    <div id="noresult" className="flex flex-col flex-1 w-full max-w-[372px] gap-5 items-center justify-center text-center pb-20">
                        <Image src={iconBlankDocument} width={118} height={135} alt="No Result" />
                        <b className="text-xl">No result found</b>
                        <p className="text-gray-500">Try using different keyword</p>
                        <Button onClick={handleOpenSearch} className="rounded-full w-full max-w-[214px] md:w-[182px] h-[44px]">
                            Back to Home
                        </Button>
                    </div>
                )
            }

            {maxPageSearch > 1 && (
                <div className="flex flex-row w-full justify-center items-center my-2 gap-2">

                    <Button
                        disabled={pageSearchQuery === 1}
                        onClick={() => handlePageSearchNextPrev(-1)}
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
                                    onClick={() => handlePageSearch(pageNum)}
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
                        disabled={pageSearchQuery === maxPageSearch}
                        onClick={() => handlePageSearchNextPrev(1)}
                        variant={'ghost'} className="flex">
                        Next <Image src={iconPageNext} alt="Icon Next Previous" />
                    </Button>
                </div>
            )}

        </div>
    )
}

export default SearchResultView;