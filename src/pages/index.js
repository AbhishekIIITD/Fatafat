import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import {ProductSection} from "@/components/ProductSection"
import Groceries from "@/components/Groceries";
import Electronics from "@/components/Electronics";
import Cloths from "@/components/Cloths";
import Footer from "@/components/Footer";
import GoodSidesSection from "@/components/GoodSideSection";
import FeatureSection from "@/components/FeatureSection";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={` flex min-h-screen flex-col items-center justify-between  ${inter.className}`}
    >
      <Header className="" />
      <h1 className="text-3xl font-bold text-center mt-8 mb-8">EXPLORE</h1>
      {/* Other content */}
      <ProductSection />

      <h1 className="text-3xl font-bold text-center mt-8 mb-12">Groceries...</h1>
      <Groceries />
      <GoodSidesSection />
      <h1 className="text-3xl font-bold text-center mt-8 mb-8">Clothes...</h1>
      <Cloths />
      <GoodSidesSection />
      <h1 className="text-3xl font-bold text-center mt-8 mb-8">Electronics...</h1>
      <Electronics  />
      <Footer />
      

      
    
    </main>
  );
}
