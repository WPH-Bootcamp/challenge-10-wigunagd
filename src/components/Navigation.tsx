'use client'

import { logo, iconMenu, iconMenuClose, iconSearch } from "@/app/asset/asset";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { useGetSearch } from "@/app/(SearchQuery)/hooksSearchQuery";
import SearchResultView from "./SearchResultView";
import Link from "next/link";

const MotionButton = motion.create(Button);

const Navigation = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [searchText, setsetSearchText] = useState("");
    const [triggerSearch, setTriggerSearch] = useState('')
    const [pageSearchQuery, setPageSearchQuery] = useState(1);

    useEffect(() => {
        const handler = setTimeout(() => {
            setTriggerSearch(searchText);
        }, 1000); // --> tunggu keystroke selesai supaya tidak langsung kirim query sebelum ketikan selesai

        return () => clearTimeout(handler);
    }, [searchText]);

    const {
        data: dataSearch,
        isLoading: isLoadingSearch,
        isFetching: isFetchingSearch
    } = useGetSearch({
        page: pageSearchQuery,
        limit: 3,
        query: triggerSearch
    }, {
        enabled: triggerSearch.length > 0
    });

    console.log(dataSearch, 'dataSearch');

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    const desktopMode = isMounted ? window.innerWidth >= 768 : false;


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

                <div className="flex">
                    <Link href="/" className="flex md:text-2xl text-lg font-semibold items-center gap-2 shrink-0">
                        <Image src={logo} alt="Logo" width={36} height={36} priority />
                    Your Logo
                    </Link>
                </div>

                <div className={`
                    ${!isOpenSearch && 'hidden'} 
                    md:flex w-full items-center justify-center h-[48px]
                    absolute top-[80px] left-0 md:relative md:top-0
                `}>

                    <div id="searchresult" className={`
                        fixed top-[80.5px] left-0 w-screen h-[calc(100vh-80px)] bg-white
                        h-[calc(100vh-80px)]
                        justify-start
                        overflow-y-auto z-[45]
                        ${searchText == "" && 'md:hidden'}
                        `}>

                        <SearchResultView
                            dataSearch={dataSearch ?? undefined}
                            searchText={searchText}
                            handleOpenSearch={handleOpenSearch}
                            isLoadingSearch={isLoadingSearch}
                            isFetchingSearch={isFetchingSearch}
                            pageSearchQuery={pageSearchQuery}
                            setPageSearchQuery={setPageSearchQuery} />

                    </div>

                    <div id="searchdiv" className="w-full px-5 md:px-0 z-55 flex justify-center md:py-0 py-3 md:mt-0 relative md:bg-transparent bg-white">

                        <div className={`
                                        flex flex-row items-center gap-2 
                                        bg-white border border-gray-500 rounded-2xl py-1 px-4 
                                        w-full h-[48px]
                                        md:max-w-[373px]
                                    `}>
                            <Image src={iconSearch} alt="search-icon" className="w-[24px] h-[24px]" />
                            <input onChange={(e) => handleTextSearch(e.target.value)} 
                            type="text" value={searchText} 
                            placeholder="Search" 
                            className="w-full h-full px-2" aria-label="Search Box" />
                        </div>

                    </div>
                </div>

                <AnimatePresence>
                    {(isOpenMenu || desktopMode) && (
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