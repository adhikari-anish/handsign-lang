'use client';

import { Header, HeroSection } from "./components";
import Footer from "./components/Footer";
import HomeLanguageCards from "@/components/LanguageCards";

export default function HomePage() {

  return (
    <div className="min-h-screen">
      <Header/>
      <HeroSection/>
      <div className="py-24">
        <HomeLanguageCards />
      </div>
      <Footer/>
    </div>
  )
}