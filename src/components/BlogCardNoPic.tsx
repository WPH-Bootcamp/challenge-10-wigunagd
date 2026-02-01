import Image from "next/image";
import { iconLike, iconComment } from "@/app/asset/asset";
import { BlogPost } from "@/types/blog";
import { stripHtml } from "@/lib/ctripHtmlTags";

const BlogCardNoPic = ({ id, title, content, likes, comments }: BlogPost) => {
    return (
        <div className="flex flex-row w-full gap-4 border-b-2 py-7" id={(id ?? "").toString()}>
            <div className="w-full flex flex-col gap-3">
                <h2 className="text-xl font-bold">{title}</h2>
                <div className="text-ellipsis text-sm line-clamp-2">
                    {stripHtml(content)}
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