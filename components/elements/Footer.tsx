'use client';

import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
    copyRight?: string;
    description?: string
}

const Footer: React.FC<FooterProps> = ({ copyRight, description }) => {
    console.log(copyRight)
    console.log(description)
    const categories = [
        { name: 'Truyện Tranh', href: '/truyen-tranh' },
        { name: 'ThemPhim', href: '/themphim' },
        { name: 'PhimMoi', href: '/phimmoi' },
        { name: 'Phim hay 2018', href: '/phim-hay-2018' },
        { name: 'Phimmochill', href: '/phimmochill' },
        { name: 'VLXX', href: '/vlxx' },
        { name: 'JAV HAY', href: '/jav-hay' },
        { name: 'OnlyFans Leak', href: '/onlyfans-leak' },
        { name: 'JAV', href: '/jav' },
        { name: 'Nettruyện', href: '/nettruyen' },
        { name: 'Nettruyen', href: '/nettruyen' },
        { name: 'Hentai', href: '/hentai' },
        { name: 'ThePornDude', href: '/theporndude' },
        { name: 'XGLUZ', href: '/xgluz' },
        { name: 'TheBestFetishSites', href: '/the-best-fetish-sites' },
        { name: 'ThePornList', href: '/the-porn-list' },
        { name: 'BestLustoPorn', href: '/best-lusto-porn' },
        { name: 'PornMate', href: '/pornmate' },
        { name: 'PornRangers', href: '/pornrangers' },
        { name: 'BuomTV', href: '/buomtv' },
        { name: 'BuomTube', href: '/buomtube' },
        { name: 'Vlsex', href: '/vlsex' },
        { name: 'hentai không che', href: '/hentai-khong-che' },
        { name: 'phim hentai', href: '/phim-hentai' },
        { name: 'nettruyen ngôn tình', href: '/nettruyen-ngon-tinh' },
        { name: 'nettruyen com', href: '/nettruyen-com' },
    ];

    return (
        <footer className="w-full bg-black text-white border-t border-gray-800">
            <div className="p-4 md:p-8 container mx-auto md:px-0 flex flex-col md:flex-row justify-between items-start">
                <div className="mb-4 md:mb-0 md:w-2/3">
                    <div className="w-[140px] flex items-center">
                        <Link href="/" className="w-full relative aspect-[300/58]">
                            <Image
                                src='https://themjav.com/resources/logo-dark.svg'
                                alt="Logo"
                                fill
                                className="object-contain"
                                sizes="140px"
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="text-sm bg-gray-900 hover:bg-gray-800 px-3 py-1 rounded transition-colors border border-[#403f3f80]"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;