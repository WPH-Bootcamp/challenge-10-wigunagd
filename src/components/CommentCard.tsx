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
    action?: (idDeleteComment: number) => void;
}

const CommentCard = ({ id, author, createdAt, content, action }: CommentCardProps) => {
    return (
        <div key={id}
            className={`grid w-full py-3 text-sm gap-3 relative ${action ? 'border-b' : 'border-t'}`}>
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
            {action && (<a href="#" onClick={() => action(id)} className="absolute font-semibold colorerrormsg text-xs right-0">Delete</a>)}
        </div>
    )
}

export default CommentCard;