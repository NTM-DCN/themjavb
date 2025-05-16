'use client';

import MovieList from "@/components/elements/MovieList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {

    // const [searchQuery, setSearchQuery] = useState('');
    // const [activeSearch, setActiveSearch] = useState('');

    // const popularKeywords = [
    //     { tag: '#Mới nhất', keyword: 'Mới nhất' },
    //     { tag: '#Phổ biến', keyword: 'Phổ biến' },
    //     { tag: '#Việt Nam', keyword: 'Việt Nam' },
    //     { tag: '#Châu Á', keyword: 'Châu Á' },
    //     { tag: '#Khổng lồ', keyword: 'Khổng lồ' },
    // ];

    // const handleSearch = (e: { preventDefault: () => void; }) => {
    //     e.preventDefault();
    //     setActiveSearch(searchQuery.trim());
    // };

    return (
        <div className="grid font-[family-name:var(--font-geist-sans)]">
            <div className="flex justify-center items-center flex-col mb-4 md:mb-8">
                <p className="text-white text-2xl md:text-4xl font-extrabold md:mb-8 mb-4">Tìm kiếm</p>
                <form className="md:w-full md:max-w-[504px] flex items-center">
                    <div className="grow min-w-0">
                        <Input type="email" placeholder="Từ khóa tìm kiếm"className="md:h-12 shadow-0 outline-0 text-white rounded-r-none" />
                    </div>
                    <Button type="submit" className="md:h-12 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md rounded-l-none">
                        Tìm kiếm
                    </Button>
                </form>
            </div>
            <section className="px-4 md:px-0">
                <h1 className="md:mb-6 mb-3 md:text-2xl text-lg text font-bold text-white">Ngẫu nhiên</h1>
                    <MovieList />
            </section>
        </div>
    );
}