import { Skeleton } from "@/components/ui/skeleton";

export const WritePostSkeleton = () => {
    return (
        <div className="grid gap-5">
            <div className="grid gap-4">
                <Skeleton className="h-4 w-12" /> 
                <Skeleton className="h-12 w-full rounded-xl" /> 
            </div>

            <div className="grid gap-4">
                <Skeleton className="h-4 w-16" /> 
                <div className="border rounded-xl overflow-hidden">
                    <Skeleton className="h-10 w-full border-b" /> 
                    <Skeleton className="h-[238px] w-full" /> 
                </div>
            </div>

            <div className="grid gap-4">
                <Skeleton className="h-4 w-24" /> 
                <div className="flex flex-col gap-3 w-full border border-dashed rounded-2xl p-4 items-center bg-neutral-50/50">
                    <Skeleton className="w-full max-w-[529px] h-[280.67px] rounded-lg" />
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                <Skeleton className="h-4 w-10" /> 
                <div className="flex gap-2 p-2 border rounded-xl min-h-12 bg-white">
                    <Skeleton className="h-7 w-20 rounded-lg" />
                    <Skeleton className="h-7 w-24 rounded-lg" />
                    <Skeleton className="h-7 w-16 rounded-lg" />
                </div>
            </div>

            <div className="flex justify-end">
                <Skeleton className="w-full md:max-w-66.25 h-12 rounded-full" />
            </div>
        </div>
    );
};