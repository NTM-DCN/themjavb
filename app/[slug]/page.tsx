'use client';

import Image from "next/image";
import { Calendar, Clock, Film, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams, usePathname, } from "next/navigation";
import { useEffect, useState } from "react";
import { IModeItem, movieApi } from "@/api/movie";
import Link from "next/link";
import MovieList from "@/components/elements/MovieList";

const defaultMovieData: IModeItem = {
    id: 0,
    image_url: '',
    name: '',
    categories: [],
    description: '',
    content: '',
    time: '',
    created_at: '',
    video: '',
};

export default function MovieDetail () {
    const params = useParams();
    const pathname = usePathname();
    let slugValue = '';
    
    if (params.slug) {
        if (Array.isArray(params.slug)) {
            slugValue = params.slug[0] || '';
        } else {
            slugValue = params.slug as string;
        }
    }
    
    const isHtmlPage = pathname.endsWith('.html');

    const [movieData, setMovieData] = useState<IModeItem>(defaultMovieData);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    useEffect(() => {
        if (isHtmlPage) {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    setHasError(false);
                    const result = await movieApi.getDetail({ slug: slugValue });
                    if (result.status === true) {
                        setMovieData(result.data as IModeItem);
                    }
                } catch (error) {
                    console.error(error);
                    setHasError(true);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchData();
        }
    }, [slugValue, isHtmlPage]);

    if (!isHtmlPage) {
        return <MovieList overrideSlug={slugValue} />;
    }

    if (hasError) {
        return (
            <div className="flex flex-col items-center justify-center h-dvh">
                <h1 className="scroll-m-20 text-2xl mb-4 font-extrabold tracking-tight lg:text-5xl text-center">
                    Trang Không Tồn Tại
                </h1>
                <p className="text-lg text-gray-300 text-center">
                    Trang bạn đang truy cập không tồn tại hoặc đã bị xóa, vui lòng quay lại <Link href={`/`} className="text-[var(--primary-border)] font-bold h-full"> Trang Chủ </Link>để tiếp tục trải nghiệm.
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg text-gray-300">Đang tải thông tin phim...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto mb-12">
            <div className="relative overflow-hidden bg-accent mb-4">
                <div className="relative z-10 flex flex-col md:flex-row">
                    <div className="flex-shrink-0 w-full md:w-64">
                        <div className="relative aspect-[2/1] md:aspect-square overflow-hidden shadow-xl">
                            <Image
                                src={`${movieData?.image_url}`}
                                alt={movieData?.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                        </div>
                    </div>

                    <div className="flex-grow text-white p-4 space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold">{movieData?.name}</h1>

                        <div className="flex flex-wrap gap-3">
                            {movieData?.categories && movieData.categories.length > 0 && (
                                movieData.categories.map((genre: { name: string; slug: string; }, index: number) => (
                                    <Link key={index} href={`/${genre.slug}/`} className="block h-full bg-black rounded-2xl">
                                        <Badge variant="secondary" className="text-sm cursor-pointer bg-black text-white px-3 py-1">
                                            {genre.name}
                                        </Badge>
                                    </Link>
                                ))
                            )}
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <Calendar size={20} className="me-1" />
                                <span>{movieData?.created_at.split('-')[0]}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock size={20} className="me-1" />
                                <span>{movieData?.time}</span>
                            </div>
                            <div className="flex items-center">
                                <Film size={20} className="me-1" />
                                <span>HD</span>
                            </div>
                        </div>
                        <p
                            className="text-gray-200"
                            dangerouslySetInnerHTML={{ __html: movieData.content || "No description available." }}
                        />
                    </div>
                </div>
            </div>
            <div className="my-4">
                <h2 className="text-2xl font-bold mb-4 text-white">Xem Phim</h2>
                <div className="relative overflow-hidden bg-black aspect-video">
                    {!isPlaying && movieData.image_url ? (
                        <div className="absolute inset-0 flex items-center justify-center" onClick={handlePlay}>
                            <Image
                                src={`${movieData?.image_url}`}
                                alt={movieData?.name}
                                fill
                                className={`object-cover transition-opacity duration-300`}
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                                <PlayCircle className="w-16 h-16 text-white opacity-80 hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-black">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`${movieData.video}`}
                                title={movieData?.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
            <Badge variant="secondary" className="text-sm cursor-pointer p-2 bg-accent text-white mb-4">
                PHIM KHÁC
            </Badge>
            <MovieList forceShowAll={true} />
        </div>
    );
}
