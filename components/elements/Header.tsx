

'use client';

import { useEffect, useState, useRef } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, X } from "lucide-react";

interface HeaderProps {
    brand?: string;
}

const categories = [
    {
        name: 'VIDEO',
        slug: 'video'
    },
    {
        name: 'TRENDING',
        slug: 'trending'
    },
    {
        name: 'KHÔNG CHE',
        slug: 'khong-che'
    },
    {
        name: 'BEATY',
        slug: 'beaty'
    },
    {
        name: 'CENSORED',
        slug: 'censored'
    },
]

const Header: React.FC<HeaderProps> = ({ brand }) => {
    console.log(brand);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current && 
                !menuRef.current.contains(event.target as Node) && 
                menuButtonRef.current && 
                !menuButtonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return (
        <header className="sm:px-6 bg-background sticky top-0 z-50 border-b border-b border-[#403f3f80]">
            <div className="container mx-auto px-2 wrap py-2 md:px-0 flex justify-center items-center">
                <div className="lg:hidden mr-4">
                    <button 
                        ref={menuButtonRef}
                        onClick={toggleMenu}
                        className="p-2 rounded-md text-white hover:bg-accent/80 transition-colors"
                        aria-label="Open menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                
                <div className="flex items-center">
                    <div className="me-4">
                        <Link href="/" className="relative block w-32 h-8">
                            <div className="relative w-full h-full">
                                <Image
                                    src='/logo.png'
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 192px, 256px"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="hidden lg:block">
                        <NavigationMenu className="w-full max-w-none">
                            <NavigationMenuList className="flex-wrap">
                                {categories.map((item: { name: string; slug: string; }, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className="cursor-pointer w-auto text-center transition-colors"
                                    >
                                        <NavigationMenuLink
                                            href={`/${item.slug}/`}
                                            className="px-4 py-2 hover:bg-transparent active:bg-transparent focus:bg-transparent hover:text-gray-300 text-center text-white"
                                        >
                                            {item.name}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </div>
            <div 
                ref={menuRef}
                className={`lg:hidden fixed top-[56px] left-0 right-0 bottom-0 transition-all duration-500 ease-in-out ${
                    isMenuOpen 
                        ? 'opacity-100 scale-y-100 border-t border-gray-700 shadow-lg' 
                        : 'opacity-0 scale-y-0 pointer-events-none'
                }`}
                style={{
                    transformOrigin: 'top',
                    height: isMenuOpen ? 'calc(100vh - 56px)' : '0',
                    zIndex: 40
                }}
            >
                <div className="bg-[var(--background-header)] h-full overflow-y-auto">
                    <nav className="p-4">
                        <ul className="space-y-4">
                            {categories.map((item, index) => (
                                <li key={index} className="border-b border-gray-700 pb-2">
                                    <Link 
                                        href={`/${item.slug}/`}
                                        className="block text-white hover:text-gray-300 py-2 font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;