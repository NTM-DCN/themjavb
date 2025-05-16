'use client';

import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { useParams, } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IModeItem, movieApi } from "@/api/movie";
import Link from "next/link";
import MovieList from "@/components/elements/MovieList";
import { Sidebar } from "@/components/elements/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

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

    const rawSlug = params.slug;
    let slug = '';

    if (Array.isArray(rawSlug) && rawSlug.length > 0) {
        slug = rawSlug[0];
        slug = slug.replace(/\.html$/, '');
    } else if (typeof rawSlug === 'string') {
        slug = rawSlug.replace(/\.html$/, '');
    }
    const [movieData, setMovieData] = useState<IModeItem>(defaultMovieData);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setHasError(false);
                const result = await movieApi.getDetail({ slug: slug });
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
    }, [slug]);

    if (hasError) {
        return (
            <div className="flex flex-col items-center justify-center h-dvh px-4">
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
        <>
        <Breadcrumb className="md:px-0 px-4 pb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col lg:flex-row gap-2 md:gap-6 relative">
            <div className="flex-1 relative z-10 flex flex-col gap-8">
                <div className="text-white">
                    <div className="relative overflow-hidden bg-black aspect-video">
                        {!isPlaying && movieData.image_url ? (
                            <div className="absolute inset-0 flex items-center justify-center" onClick={handlePlay}>
                                <Image
                                    src={`${movieData?.image_url}`}
                                    alt={movieData?.name}
                                    fill
                                    className={`object-cover transition-opacity duration-300 rounded-md`}
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
                                    className="absolute inset-0 w-full h-full rounded-md"
                                ></iframe>
                            </div>
                        )}
                    </div>
                    <h1 className="md:px-0 px-4 mt-4 text-xl font-bold hover:text-primary"><Link href={''}>{movieData?.name} </Link></h1>
                    <p
                        className="md:px-0 px-4 mt-2 text-gray-200"
                        dangerouslySetInnerHTML={{ __html: movieData.content || "No description available." }}
                    />
                    <p className="md:px-0 px-4 mt-2 text-gray-400">200.00 lượt xem</p>
                    <div className="md:px-0 px-4 mt-2 flex flex-wrap gap-3">
                        <p className="text-sm">Thể loại:</p>
                        <ul className="grow flex flex-wrap gap-1">
                            {movieData?.categories && movieData.categories.length > 0 && (
                                movieData.categories.map((genre: { name: string; slug: string; }, index: number) => (
                                    <Link key={index} href={`/category/${genre.slug}/`} className="text-sm text-gray-400">
                                        {genre.name},
                                    </Link>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
                <div className="md:px-0 px-4">
                    <h2 className="text-xl font-semibold text-white mb-2">Có liên quan</h2>
                    <MovieList forceShowAll={true} />
                </div>
            </div>
            <div className="hidden md:block w-full lg:w-1/4">
                <Sidebar />
            </div>
        </div>
        </>
    );
}
