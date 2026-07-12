import React from "react";
import {Header} from "@/components/Header";
import {HeroSection} from "@/components/HeroSection";
import {SearchSection} from "@/components/SearchSection";
import {Footer} from "@/components/Footer";
import{BlogSection} from "@/components/BlogSection";
export const Home = () => {
    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50">
            <Header  />
            <div className="flex-1">
            <div className="mx-auto max-w-7xl px-5 pb-10 pt-9 sm:px-6 lg:pt-10">
            <div className="mx-auto max-w-3xl text-center">
            <HeroSection />
            <SearchSection />
            </div>
            <BlogSection />
            <Footer />
            </div>
            </div>
        </div>
    );
}