import { Skeleton } from "@/components/ui/skeleton";

export const BlogCardNoPicSkeleton = () => {
    return (
        <div className="flex flex-col w-full max-w-[1440px] ">
            <BlogCardNoPicSkeletonPart />
            <BlogCardNoPicSkeletonPart />
            <BlogCardNoPicSkeletonPart />
        </div>
    );
};

const BlogCardNoPicSkeletonPart = () => {
    return (
        <div className="flex flex-row w-full gap-4 border-b-2 py-7">
            <div className="w-full flex flex-col gap-3">
                <Skeleton className="h-7 w-3/4" />

                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="flex flex-row gap-5 items-center mt-1">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-md" />
                        <Skeleton className="h-4 w-8" />
                    </div>

                    <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-md" />
                        <Skeleton className="h-4 w-8" />
                    </div>
                </div>
            </div>
        </div>
    );
}