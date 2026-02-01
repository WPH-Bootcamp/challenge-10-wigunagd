import Image from "next/image"
import { iconSearch } from "@/app/asset/asset"

const SearchBar = ({className} : {className?: string}) => {
    return (
        <div className={`items-center gap-2 py-1 px-4 border border-gray-500 rounded-2xl ${className}`}>
            <Image src={iconSearch} alt="search-icon" className="w-[24px] h-[24px]" /> 
            <input type="text" placeholder="Search" className="w-full h-full" aria-label="Search Box" />
        </div>
    )
}

export default SearchBar