import Image from "next/image";
import { tmpBlogimg, tmpProfilePicture, iconLike, iconComment } from "../../public/asset/asset";
import { BlogPost } from "@/types/blog";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { formattedDate } from "@/lib/formatDate";
import { stripHtml } from "@/lib/ctripHtmlTags";
import Link from "next/link";

const BlogCard = ({ id, title, content, tags, imageUrl, author, createdAt, likes, comments }: BlogPost) => {
    return (
        <div className="flex flex-row w-full gap-4 border-b-2 py-7" id={(id ?? "").toString()}>
            <Link href={`/post/${id}`} className="hidden md:block md:w-1/4">
                <AspectRatio ratio={4 / 3.1}>
                    <Image
                        src={imageUrl || tmpBlogimg}
                        alt="Blog Cover"
                        fill
                        className="rounded-sm object-cover"
                    />
                </AspectRatio>
            </Link>
            <div className="w-full md:w-3/4 flex flex-col gap-3">
                <Link href={`/post/${id}`} className="text-xl font-bold">{title}</Link>
                <div className="flex flex-row flex-wrap gap-2">
                    {
                        tags?.map((tag) => (
                            <span key={tag} className="p-2 border-1 rounded-lg">{tag}</span>
                        ))
                    }
                </div>
                <div className="text-ellipsis text-sm line-clamp-2">
                    {stripHtml(content ?? '')}
                </div>
                <div className="flex flex-row items-center gap-2 text-sm">
                    <Image src={author?.avatarUrl ?? tmpProfilePicture} width={40} height={40} alt="Profile-Img" className="rounded-full" />
                    <b>{author?.name ?? 'John Doe'}</b> &middot; {createdAt && (<span>{formattedDate(createdAt, 'DD MMMM YYYY')}</span>)}
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

export default BlogCard;