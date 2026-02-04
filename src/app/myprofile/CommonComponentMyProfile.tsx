import { Button } from "@/components/ui/button";
import Image from "next/image";
import { iconWritePostWhite } from "../../../public/asset/asset";
import Link from "next/link";

const ButtonWriteNewPost = ({className}: {className: string}) => {
    return (
        <Button
            asChild
            className={`font-semibold rounded-full underline px-4 items-center gap-2 ${className}`}
        >
            <Link href="/write">
                <Image src={iconWritePostWhite} width={24} height={24} alt="Write Post" />
                <span className="whitespace-nowrap">Write Post</span>
            </Link>
        </Button>
    )
}

export default ButtonWriteNewPost;