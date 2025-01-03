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
import ProductHero from "@/components/ProductHero";
import ClothDealsSlider from "@/components/clothDeals";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={` flex min-h-screen flex-col items-center justify-between  ${inter.className}`}
    >
      <Header className="" />
      <h1 className="text-3xl font-bold text-center mt-8 mb-8">EXPLORE</h1>
      {/* Other content */}

      <div className=" flex flex-col md:flex-row mt-4 justify-around w-full">
      
      <ProductHero product={"Clothes"}  imageUrl={"https://drive.google.com/uc?id=1J6XVGrLLbRnAsumcsV3RpFfELI9Y7H0R"} color={"#EEE2E6"} offer={"Upto 72% off"} />
      <ProductHero product={"Groceries"}  imageUrl={"https://drive.google.com/uc?id=1wRnQ3NovxRx7ANZHen04aHbqCMP9rnuZ"} color={"#8BC34A"} offer={"Upto 85% off"} />

      <ProductHero product={"Electronics"}  imageUrl={"https://drive.google.com/uc?id=14p_P7SjOzoudWWoOgXBiOjo4EuYHrFNm"} color={"#E4D1D7"} offer={"Upto 33% off"} />

      </div>
      <h1 className="text-3xl font-bold text-center mt-8 mb-12">Groceries...</h1>
      <Groceries />
      
      <ClothDealsSlider />
      <Cloths />
      <GoodSidesSection />
      <Electronics  />
      <Footer />
      

      
    
    </main>
  );
}
