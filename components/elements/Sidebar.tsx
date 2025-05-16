'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface SidebarMovie {
    id: string;
    title: string;
    thumbnail: string;
    slug: string;
    views?: number;
    releaseDate?: string;
}

export const Sidebar: React.FC = () => {
    const [popularMovies, setPopularMovies] = useState<SidebarMovie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data - replace with actual API calls
        const mockPopular: SidebarMovie[] = Array.from({ length: 8 }, (_, i) => ({
            id: `popular-${i + 1}`,
            title: `Podfbvvvvvbdfffffffffffffffffffffffffffffffffpular Movie ${i + 1}`,
            thumbnail: `https://picsum.photos/100/150?random=${i + 1}`,
            slug: `popular-movie-${i + 1}`,
            views: Math.floor(Math.random() * 100000) + 10000,
            releaseDate: '2024'
        }));

        setPopularMovies(mockPopular);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-[#171717] rounded-md"></div>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex gap-3">
                            <div className="w-20 h-28 bg-[#252525] rounded-md"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-[#252525] rounded-md"></div>
                                <div className="h-3 bg-[#252525] rounded-md w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="md:space-y-6 space-y-4">
            {popularMovies.map((movie, index) => (
                <div key={index} className="group flex gap-4 md:gap-4 group rounded-md transition-colors">
                    <Link href={`/movie/${movie.slug}`} className="block relative rounded-lg overflow-hidden relative aspect-[16/9] w-3/5">
                            <Image
                                src={movie.thumbnail}
                                alt={movie.title}
                                width={300}
                                height={169}
                                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.1]"
                            />
                    </Link>

                    <Link href={`/movie/${movie.slug}`} className="block mt-2 w-2/5 min-w-0">
                        <h3 className="text-sm font-medium line-clamp-2 text-white group-hover:text-primary group-hover:underline transition-all">
                            {movie.title}
                        </h3>
                    </Link>
                </div>
            ))}
        </div>
    );
};