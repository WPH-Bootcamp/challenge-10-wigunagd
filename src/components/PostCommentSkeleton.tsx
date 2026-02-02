import { Skeleton } from "@/components/ui/skeleton";

const PostCommentSkeleton = () => {
  return (
      <div className="flex flex-col gap-5 border-t border-b py-5 mt-10">
        <Skeleton className="h-7 w-40" /> {/* Comment Title */}
        <Skeleton className="h-5 w-64" /> {/* Login/Register Text */}

        {/* Individual Comment Skeletons */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="grid border-t py-3 gap-3">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-[40px] w-[40px] rounded-full" />
              <div className="grid gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
  );
}

export default PostCommentSkeleton;