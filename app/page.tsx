'use client';

import MovieList from "@/components/elements/MovieList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {

    const [searchQuery, setSearchQuery] = useState('');
    const [activeSearch, setActiveSearch] = useState('');

    const popularKeywords = [
        { tag: '#Mới nhất', keyword: 'Mới nhất' },
        { tag: '#Phổ biến', keyword: 'Phổ biến' },
        { tag: '#Việt Nam', keyword: 'Việt Nam' },
        { tag: '#Châu Á', keyword: 'Châu Á' },
        { tag: '#Khổng lồ', keyword: 'Khổng lồ' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        setActiveSearch(searchQuery.trim());
    };

    return (
        <div className="container mx-auto py-5 grid font-[family-name:var(--font-geist-sans)]">
            {/* <div className="w-full mb-8 bg-gray-900 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Tìm kiếm phim</h2>
                <form onSubmit={handleSearch} className="relative mb-4">
                    <Input type="email" placeholder="Email" />
                    <Button 
                        type="submit" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        Tìm kiếm
                    </Button>
                </form>
                
            </div> */}

<div className="flex justify-center items-center flex-col mb-5">
    <p className="typography font-content lg:text-[32px] lg:leading-[48px] lg:font-semibold text-[28px] leading-[36px] max-lg:font-semibold">Tìm kiếm</p>
    <form className="w-full max-w-[504px] flex items-center max-lg:px-4 mt-4 lg:mt-8">
        <div className="grow min-w-0">
                    <Input type="email" placeholder="Email" />
            {/* <input className="block w-full a-input rounded-md outline-none font-content bg-default border-[#a71c1c] border lg:h-11 lg:px-4 lg:text-[1rem] h-10 px-4 text-[1rem] rounded-r-none duration-200 focus:bg-default-100 focus:dark:bg-white dark:bg-white/90 dark:text-black" placeholder="Từ khoá: Yui Hanako ..." /> */}
            </div>
                    <Button 
                        type="submit" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        Tìm kiếm
                    </Button>
            {/* <button className="a-button flex items-center justify-center [&amp;:not(:disabled)]:active:opacity-[0.92] relative font-content rounded-md duration-200 whitespace-nowrap leading-normal active:scale-[0.98] disabled:active:scale-100 bg-[#a71c1c] [&amp;:not(:disabled)]:hover:bg-primary-400 text-white lg:h-11 lg:px-4 lg:text-[1rem] h-10 px-4 rounded-l-none border-l border-default/70 dark:border-black/70" type="submit">Tìm kiếm</button> */}
            </form>
            </div>

            <h1 className="mb-2 md:mb-4 font-bold text-white">Ngẫu nhiên</h1>
            <main className="flex flex-col gap-8 row-start-2 items-center">
                <MovieList />
            </main>
        </div>
    );
}