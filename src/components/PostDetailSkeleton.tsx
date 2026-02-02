import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const PostDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-200 mx-auto my-5 px-5 md:px-0">
      <Skeleton className="h-10 w-3/4 mb-2" />

      <div className="flex flex-row flex-wrap gap-2">
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-14 rounded-lg" />
      </div>

      <div className="flex flex-row items-center gap-2 mt-2">
        <Skeleton className="h-[40px] w-[40px] rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      <div className="flex flex-row items-center gap-5 border-t border-b py-5 mt-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-12" />
      </div>

      <AspectRatio ratio={16 / 9}>
        <Skeleton className="w-full h-full rounded-lg" />
      </AspectRatio>

      <div className="flex flex-col gap-3 mt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      <div className="w-full flex flex-col gap-4 mt-5">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-[300px] w-full rounded-xl" />
      </div>
    </div>
  );
}

export default PostDetailSkeleton;