import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/elements/Header";
import Footer from "@/components/elements/Footer";
import { settingApi } from "@/api/setting";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
    const res = await settingApi.getSettings()
    const data = res?.data;
    return {
        title: data?.seo?.meta_title || '',
        description: data?.seo?.meta_description || 'Mô tả mặc định toàn trang',
        alternates: {
            canonical: data?.seo?.canonical || '',
        },
        icons: {
            icon: [
                { url: data?.favicon || '', sizes: 'any' },
                { url: data?.favicon || '', sizes: '16x16', type: 'image/png' },
            ],
            apple: data?.favicon || '',
        },
        twitter: {
            card: 'summary_large_image',
            title: data?.seo?.meta_og_title || '',
            description: data?.seo?.meta_og_description || '',
            images: [data?.seo?.meta_og_image || ''],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const res = await settingApi.getSettings()
    const data = res?.data;
    const copyRight = data?.company?.copyright;
    const description = data?.company?.description;
    const brand = data?.logo;
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header brand={brand}/>
                    <div className="flex flex-1">
                        <main className="flex-1">{children}</main>
                    </div>
                    {/* {description && copyRight && (( */}
                        <Footer copyRight={copyRight} description={description} />
                    {/* ))} */}
                </ThemeProvider>
            </body>
        </html>
    );
}