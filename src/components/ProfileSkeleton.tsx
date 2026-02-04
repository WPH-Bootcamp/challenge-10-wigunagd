import { Skeleton } from "./ui/skeleton";

const ProfileSkeleton = () => {
    return (
        <div className="flex flex-row gap-2 items-center w-3/4">
            <div className="flex flex-col items-center justify-center w-20 h-20 border rounded-full overflow-hidden">
                <Skeleton className="w-20 h-20 rounded-full" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-32 rounded-md" />
                <Skeleton className="h-4 w-48 rounded-md" />
            </div>
        </div>
    )
}

export default ProfileSkeleton;