"use client";





import { motion } from "framer-motion";

export default function EditorialPortfolio() {
  return (
    <div className="relative w-full bg-white text-[#111111] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 lg:py-32 flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Sticky Sidebar */}
        <div className="lg:w-1/4 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-4">
              INFO [P.P.*]
            </h3>
            <p className="text-lg md:text-xl font-medium leading-snug mb-10 max-w-sm">
             しずかなあさ、かれはちいさなかふぇでこーひーをのんだ。にがくてあたたかいかおりがこころをおちつかせる。まどのそとにはあめがふり、まちはしずかだった。いっぱいのこーひーが、かれにあたらしいいちにちをはじめるゆうきをくれた。
            </p>
            <div className="flex flex-col gap-1 text-[11px] font-bold tracking-widest uppercase">
              <a href="#" className="hover:opacity-50 transition-opacity w-fit">INSTAGRAM</a>
              <a href="#" className="hover:opacity-50 transition-opacity w-fit">LINKEDIN</a>
            </div>
          </div>
        </div>

        {/* Right Scrolling Content Area */}
        <div className="lg:w-3/4 flex flex-col gap-32 md:gap-48 pb-32">
          
          {/* Project 1: CHAOSK */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col w-full"
          >
            {/* Aspect Video / Image layout resembling the large billboard */}
            <div className="w-full aspect-[21/9] relative overflow-hidden mb-4">
              <video 
                src="/videos/vecteezy_2d-animation-italian-light-blue-moka-pot-coffee-maker_11680223.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <h2 className="text-[10vw] lg:text-[140px] font-black tracking-tighter uppercase mix-blend-difference text-white opacity-90">
                    COFFEE
                 </h2>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h4 className="text-lg font-bold">RAHUL</h4>
              <p className="text-sm font-medium">Brand  — 2023</p>
              <p className="text-sm text-gray-500">MY COFFEE BRAND 2023</p>
            </div>
          </motion.div>

          {/* Project 2: ANNKI STUDIO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-24"
          >
            {/* Left side text segment */}
            <div className="flex flex-col">
              <h3 className="text-4xl lg:text-5xl font-normal leading-tight tracking-tight mb-32 max-w-lg">
静かな朝、彼は小さなカフェでコーヒーを飲んだ。苦くて温かい香りが心を落ち着かせる。窓の外には雨が降り、
              </h3>
              
              <div className="mt-auto">
                <p className="text-xs max-w-xs mb-8 text-gray-600 leading-relaxed">
                 静かな朝、彼は小さなカフェでコーヒーを飲んだ。苦くて温かい香りが心を落ち着かせる。窓の外には雨が降り、街は静かだった。一杯のコーヒーが、彼に新しい一日を始める勇気をくれた
                </p>
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold">RAHUL STUDIO</h4>
                  <p className="text-sm font-medium">Brand for you</p>
                </div>
              </div>
            </div>
            
            {/* Right side image grid segment */}
            
            <div className="grid grid-cols-2 gap-4">
               {/* 6 images and videos collection */}
               <img src="/images/quickmodel_images-anime-girl-9821144.png" className="w-full aspect-[4/3] object-cover rounded-lg" alt="Anime girl 1" />
               <img src="/images/quickmodel_images-anime-girl-9821145.png" className="w-full aspect-[4/3] object-cover rounded-lg" alt="Anime girl 2" />
               <video src="/videos/sample-1.mp4" className="w-full aspect-[4/3] object-cover rounded-lg" autoPlay loop muted />
               <video src="/videos/sample-2.mp4" className="w-full aspect-[4/3] object-cover rounded-lg" autoPlay loop muted />
               <img src="https://images.unsplash.com/photo-1631545663704-585ee585fd44?auto=format&fit=crop&q=80&w=600" className="w-full aspect-[4/3] object-cover" alt="Bed 4" />
               <img src="https://images.unsplash.com/photo-1583847268964-b28e530eee3c?auto=format&fit=crop&q=80&w=600" className="w-full aspect-[4/3] object-cover" alt="Bed 5" />
            
  
             </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
} 
