import Image from "next/image";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { iconLogOut, iconUser, tmpProfilePicture } from "../../public/asset/asset";
import Link from "next/link";

const NavigationProfilePart = ({avatarUrl, name, handleLogout} : {avatarUrl: string | null, name: string | null, handleLogout: ()=> void}) => {
    return (
        <DropdownMenu modal={false} key={`dropdownMenuProfile`}>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className="h-auto py-2 px-2 flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full overflow-hidden">
                        <Image src={avatarUrl ?? tmpProfilePicture} alt="profile" width={40} height={40} className="w-10 h-10" />
                    </div>
                    <span className="hidden md:inline">{name}</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[182px] mt-1 rounded-lg grid gap-4 p-2" align="end">
                <DropdownMenuItem asChild>
                    <Link href="/myprofile" className="flex gap-2 cursor-pointer">
                        <Image src={iconUser} width={20} height={20} alt="profile" />Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <div className="flex gap-2">
                        <Image src={iconLogOut} width={20} height={20} alt="logout" />Logout
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NavigationProfilePart;