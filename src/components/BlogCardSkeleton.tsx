import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const BlogCardSkeleton = ({className} : {className?: string}) => {
    return (
        <div className={`flex flex-col w-full max-w-[1440px] px-4 md:px-0 ${className}`}>
            <BlogCardSkeletonPart />
        </div>
    );
};

const BlogCardSkeletonPart = () => {
    return (
        <div className="flex flex-row w-full gap-4 border-b-2 py-7">
            <div className="hidden md:block md:w-1/4">
                <AspectRatio ratio={4 / 3.1}>
                    <Skeleton className="h-full w-full rounded-sm" />
                </AspectRatio>
            </div>

            <div className="w-full md:w-3/4 flex flex-col gap-3">
                <Skeleton className="h-7 w-3/4" />

                <div className="flex flex-row gap-2">
                    <Skeleton className="h-8 w-16 rounded-lg" />
                    <Skeleton className="h-8 w-20 rounded-lg" />
                    <Skeleton className="h-8 w-14 rounded-lg" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="flex flex-row items-center gap-2 mt-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                    <div className="text-gray-300">&middot;</div>
                    <Skeleton className="h-4 w-28" />
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