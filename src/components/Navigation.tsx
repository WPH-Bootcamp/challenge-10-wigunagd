import { logo } from "@/app/asset/asset";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import SearchBar from "./Searchbar";

const Navigation = () => {
    return (
        <header className="fixed flex w-full top-0 bg-white ">
            <nav className="flex w-full max-w-[1440px] h-[80px] mx-auto items-center justify-between">
                <div className="flex text-3xl h-[36px] font-semibold items-center gap-2">
                    <Image src={logo} alt="Logo" /> Your Logo
                </div>

                <SearchBar />

                <div className="flex w-full max-w-[266px] h-[44px] gap-6 items-center">
                    <Button variant={'link'} asChild className="font-semibold underline w-[36px] h-[36px]"><a href="/login" aria-label="Login Link">Login</a></Button>
                    <div className="border-l-2 h-full"></div>
                    <Button asChild className="rounded-full w-[182px] h-[44px]"><a href="/register">Register</a></Button>
                </div>
            </nav>
        </header>
    )
}

export default Navigation;