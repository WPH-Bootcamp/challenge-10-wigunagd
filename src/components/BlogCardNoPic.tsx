import Image from "next/image";
import { iconLike, iconComment } from "../../public/asset/asset";
import { BlogPost } from "@/types/blog";
import { stripHtml } from "@/lib/ctripHtmlTags";
import Link from "next/link";

const BlogCardNoPic = ({ id, title, content, likes, comments }: BlogPost) => {
    return (
        <div className="flex flex-row w-full max-w-[361px] md:max-w-[297px] gap-4 border-b-2 py-7" id={(id ?? "").toString()}>
            <div className="w-full flex flex-col gap-3">
                <Link href={`/detail/${id}`} className="text-xl font-bold">{title}</Link>
                <div className="text-ellipsis text-sm line-clamp-2">
                    {stripHtml(content ?? "").slice(0, 230)}
                </div>
                <div className="flex flex-row gap-5 items-center">
                    <span className="flex items-center gap-2 text-sm">
                        <Image
                            src={iconLike}
                            width={20}
                            height={20}
                            alt="Icon Like"
                            className="shrink-0 object-contain"
                        />
                        {likes}
                    </span>

                    <span className="flex items-center gap-2 text-sm">
                        <Image
                            src={iconComment}
                            width={20}
                            height={20}
                            alt="Icon Comment"
                            className="shrink-0 object-contain"
                        />
                        {comments}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default BlogCardNoPic;