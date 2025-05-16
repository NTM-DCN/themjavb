'use client';

import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
    name: string;
    poster: string;
    slug: string
}

const MovieCard = ({ name, poster, slug }: MovieCardProps) => {
    return (
        <div className="group">
            <Link href={`/${slug}.html`} className="block relative rounded-lg overflow-hidden aspect-video">
                <div className="relative w-full h-full">
                    <Image
                        src={poster}
                        alt={name}
                        width={300}
                        height={169}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.1]"
                    />
                </div>
            </Link>

            <Link href={`/${slug}.html`} className="block mt-2">
                <h3 className="text-sm font-medium line-clamp-2 text-white group-hover:text-primary group-hover:underline transition-all">
                    {name}
                </h3>
            </Link>
        </div>
    )
}

export default MovieCard;