import Image from "next/image";
import { tmpProfilePicture } from "../../public/asset/asset";
import { formattedDate } from "@/lib/formatDate";
import { CommentAuthor } from "@/types/commentlike";
import Link from "next/link";

type CommentCardProps = {
    id: number;
    author: CommentAuthor;
    createdAt: Date;
    content: string;
}

const CommentCard = ({ id, author, createdAt, content }: CommentCardProps) => {
    return (
        <div key={id}
            className="grid border-t py-3 text-sm gap-3">
            <div className="flex gap-2 items-center">
                <Image
                    src={author.avatarUrl
                        ? `${author.avatarUrl}`
                        : tmpProfilePicture
                    }
                    alt={author.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10"
                />
                <Link href={`/profile/${author.id}`} className="grid gap-1">
                    <b>{author.name}</b>
                    <span>{createdAt && (formattedDate(createdAt, 'DD MMMM YYYY'))}</span>
                </Link>
            </div>
            <p>{content}</p>
        </div>
    )
}

export default CommentCard;