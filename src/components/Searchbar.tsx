import Image from "next/image"
import { searchIcon } from "@/app/asset/asset"

const SearchBar = () => {
    return (
        <div className="flex flex-row w-full max-w-[373px] h-[48px] border border-gray-500 rounded-2xl items-center gap-2 py-1 px-4">
            <Image src={searchIcon} alt="search-icon" className="w-[24px] h-[24px]" /> 
            <input type="text" placeholder="Search" className="w-full h-full" aria-label="Search Box" />
        </div>
    )
}

export default SearchBar