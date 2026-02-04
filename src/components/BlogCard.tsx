import Image from "next/image";
import { tmpBlogimg, tmpProfilePicture, iconLike, iconComment } from "../../public/asset/asset";
import { BlogPost } from "@/types/blog";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { formattedDate } from "@/lib/formatDate";
import { stripHtml } from "@/lib/ctripHtmlTags";
import Link from "next/link";
import { useGetPostAuthorDetail } from "@/app/detail/[id]/hooksDetail";
import { Button } from "./ui/button";

type BlogCardActionProps = {
    action?: boolean;
    onStatistikClick?: (id: number, openDialog: boolean) => void;
    onDeleteClick?: (id: number, openDialog: boolean) => void;
}
type BlogCardProps = BlogPost & BlogCardActionProps;

const BlogCard = ({ id, title, content, tags, imageUrl, author, createdAt, likes, comments, action, onStatistikClick, onDeleteClick }: BlogCardProps) => {

    const { data: dataAuthor } = useGetPostAuthorDetail(Number(author?.id));

    return (
        <div className="flex flex-row w-full gap-4 border-b-2 py-7" id={(id ?? "").toString()}>
            <Link href={`/detail/${id}`} className="hidden md:block md:w-1/4">
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
                <Link href={`/detail/${id}`} className="text-xl font-bold">{title}</Link>
                <div className="flex flex-row flex-wrap gap-2">
                    {
                        tags?.map((tag) => (
                            <span key={tag} className="p-2 border rounded-lg text-xs">{tag}</span>
                        ))
                    }
                </div>
                <div className="text-ellipsis text-sm line-clamp-2">
                    {stripHtml(content ?? '')}
                </div>

                {!action && (
                    <div className="flex flex-row items-center gap-2 text-sm">
                        <a href={`/profile/${author?.id}`} className="flex flex-row items-center gap-2 text-sm">
                            <Image src={dataAuthor?.avatarUrl ?? tmpProfilePicture} width={40} height={40} alt="Profile-Img" className="rounded-full w-10 h-10" />
                            <b>{author?.name ?? '...'}</b> &middot; {createdAt && (<span>{formattedDate(createdAt, 'DD MMMM YYYY')}</span>)}
                        </a>
                    </div>
                )}

                {!action && (
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
                )}

                {action && (
                    <div className="flex flex-row gap-5 items-center">
                        <span className="flex items-center gap-2 text-xs">Created {createdAt && (`${formattedDate(createdAt, 'DD MMM YYYY hh:mm')}`)}</span>
                        <span className="flex items-center gap-2 text-xs border-l pl-4">Last updated {createdAt && (`${formattedDate(createdAt, 'DD MMM YYYY hh:mm')}`)}</span>
                    </div>
                )}

                {action && (
                    <div className="flex flex-row items-center gap-3">
                        <Button
                            onClick={() => id && onStatistikClick?.(id, true)}
                            variant={'link'} className="underline px-0">
                            Statistic
                        </Button>
                        <Button variant={'link'} asChild className="underline border-l border-r rounded-none">
                            <a href={`/edit/${id}`}>Edit</a>
                        </Button>
                        <Button
                            onClick={() => id && onDeleteClick?.(id, true)}
                            variant={'link'} className="underline px-0 text-destructive">
                            Delete
                        </Button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default BlogCard;