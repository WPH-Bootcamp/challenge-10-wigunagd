'use client'

import { logo, iconMenu, iconMenuClose, iconSearch, iconBlankDocument } from "@/app/asset/asset";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SearchBar from "./Searchbar";
import { useState } from "react";
import { motion, AnimatePresence } from 'motion/react';

const MotionButton = motion.create(Button);

const Navigation = () => {
    const windowMobile = (typeof window !== 'undefined' && window.innerWidth >= 768);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isNoResultSearch, setIsNoResultSearch] = useState(true);
    const [searchText, setsetSearchText] = useState("");

    const handleOpenMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const handleOpenSearch = () => {
        setIsOpenSearch(!isOpenSearch);
        setsetSearchText("");
    };

    const handleTextSearch = (text: string) => {
        setsetSearchText(text);
        setIsOpenSearch(true);
    }

    return (
        <header className="fixed flex w-full top-0 bg-white border-b z-50">
            <nav className="flex w-full max-w-[1440px] h-[80px] mx-auto items-center justify-between md:px-0 px-5 relative">

                <div className="flex md:text-2xl text-lg font-semibold items-center gap-2 shrink-0">
                    <Image src={logo} alt="Logo" width={36} height={36} priority />
                    Your Logo
                </div>

                <div className={`
                    ${!isOpenSearch && 'hidden'} 
                    md:flex w-full items-center justify-center h-[48px]
                    absolute top-[80px] left-0 md:relative md:top-0
                `}>

                    <div id="searchresult" className={`
                        fixed top-[80.5px] left-0 w-screen h-screen bg-white
    flex flex-col items-center justify-center
                        ${searchText == "" && 'md:hidden'}
                        `}>
                        {
                            isNoResultSearch && (
                                <div className="flex flex-col gap-5 w-full max-w-[372px] mx-auto my-auto items-center justify-cente">
                                    {
                                        searchText != "" && (
                                            <>
                                                <Image src={iconBlankDocument} width={118} height={135} alt="No Result" />
                                                <b>No result found</b>
                                                <p>Try using different keyword</p>
                                            </>
                                        )
                                    }

                                    <Button onClick={handleOpenSearch} className="rounded-full w-full max-w-[214px] md:w-[182px] h-[44px]">
                                        Back to Home
                                    </Button>
                                </div>
                            )
                        }
                    </div>

                    <div className="w-full px-5 md:px-0 flex justify-center mt-4 md:mt-0">

                        <div className={`
                                        flex flex-row items-center gap-2 
                                        bg-white border border-gray-500 rounded-2xl py-1 px-4 
                                        w-full h-[48px]
                                        md:max-w-[373px]
                                    `}>
                            <Image src={iconSearch} alt="search-icon" className="w-[24px] h-[24px]" />
                            <input onChange={(e) => handleTextSearch(e.target.value)} type="text" value={searchText} placeholder="Search" className="w-full h-full" aria-label="Search Box" />
                        </div>

                    </div>
                </div>

                <AnimatePresence>
                    {(isOpenMenu || windowMobile) && (
                        <motion.div
                            id="buttonlogingroup"
                            className={`
                                md:flex-row md:relative md:top-0 md:h-auto md:w-auto md:p-0 ms:max-w-[266px] gap-6 items-center bg-white
                                flex flex-col absolute top-[80px] left-0 w-full h-screen pt-10 px-5
                                z-40
                            `}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button variant='link' asChild className="font-semibold underline">
                                <a href="/login" onClick={() => setIsOpenMenu(false)}>Login</a>
                            </Button>

                            <div className="hidden md:block border-l-2 h-full border-gray-200"></div>

                            <Button asChild className="rounded-full w-full max-w-[214px] md:w-[182px] h-[44px]">
                                <a href="/register" onClick={() => setIsOpenMenu(false)}>Register</a>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="md:hidden flex gap-3 items-center">
                    <AnimatePresence>
                        {(!isOpenMenu && !isOpenSearch) && (
                            <MotionButton
                                key="buttonopensearch"
                                id="buttonopensearch"
                                variant='ghost'
                                onClick={handleOpenSearch}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{
                                    duration: 0.1,
                                    ease: 'easeOut'
                                }}
                            >
                                <Image src={iconSearch} alt="Icon Search" width={24} height={24} />
                            </MotionButton>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <MotionButton
                            key={isOpenMenu ? "close" : "open"}
                            onClick={handleOpenMenu}
                            variant="ghost"
                            size="icon"
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, rotate: 45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -45 }}
                            transition={{
                                duration: 0.1,
                                ease: 'easeOut'
                            }}
                        >
                            <Image
                                src={isOpenMenu ? iconMenuClose : iconMenu}
                                alt="Menu"
                                width={24}
                                height={24}
                            />
                        </MotionButton>
                    </AnimatePresence>
                </div>
            </nav>
        </header>
    );
}

export default Navigation;