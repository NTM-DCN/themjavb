'use client';

import { movieApi } from "@/api/movie";
import MovieCard from "@/components/elements/MovieCard";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IMovie {
    name: string;
    image_url: string;
    slug: string;
}

interface MovieListProps {
    overrideSlug?: string;
    forceShowAll?: boolean;
}

export default function MovieList({ overrideSlug, forceShowAll = false }: MovieListProps) {
    const params = useParams();
    const slug = forceShowAll ? '' : (overrideSlug !== undefined ? overrideSlug : (params?.slug as string || ""));

    const [listData, setListData] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (slug === '') {
                    const result = await movieApi.getMovies();

                    if (result.status === true) {
                        if (forceShowAll === true) {
                            const targetSlug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;
                            const data = result.data.data.filter((v: { slug: string; }) => {
                                return v.slug !== targetSlug;
                            }).slice(0, 8);
                            setListData(data);
                            setHasMore(false);
                            return;
                        }
                        setListData(result.data.data);
                    }
                } else {
                    const result = await movieApi.getMoviesByCategory({ slug: slug });

                    if (result.status === true) {
                        setListData(result.data.items.data);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [params?.slug, slug, forceShowAll]);

    const loadMoreMovies = async () => {
        if (loading) return;

        try {
            setLoading(true);
            const nextPage = page + 1;
            const result = await movieApi.getMovies({ page: nextPage });

            if (result.status === true) {
                setListData(prevData => [...prevData, ...result.data.data]);
                setPage(nextPage);
                setHasMore(result.data.data.length > 0);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {listData && listData.length > 0 && (
                    listData.map((movie: IMovie, index: number) => (
                        <div key={index}>
                            <MovieCard
                                key={index}
                                name={movie.name}
                                poster={movie.image_url}
                                slug={movie.slug}
                                />
                        </div>
                    ))
                )}
            </div>

            {loading && (
                <div className="flex items-center justify-center h-20 w-full mt-6">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {!loading && hasMore && (
                <Button
                onClick={loadMoreMovies}
                className="mt-6 text-sm cursor-pointer bg-accent text-white rounded-md hover:bg-opacity-90 transition-all"
                >
                    Xem Thêm »
                </Button>
            )}
        </div>
    );
}