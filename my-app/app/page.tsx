import ScrollScaleVideo from "./components/ScrollScaleVideo";
import RevealOnScroll from "./components/RevealOnScroll";
import GlideSection from "./components/GlideSection";
import CursorSection from "./components/CursorSection";
import ProgressSection from "./components/ProgressSection";
import FinalSection from "./components/FinalSection";
import JasmineHero from "./components/JasmineHero";
import CharlyHero from "./components/CharlyHero";
// import FpsTrackerSection from "./components/FpsTrackerSection";
// import LerpSection from "./components/LerpSection";
// import SequenceSection from "./components/SequenceSection";
// import KineticTextSection from "./components/KineticTextSection";

export default function Home() {
  return (
    <div className="bg-white text-[#111111] font-sans">
      <div className="flex h-[120vh] min-h-[80vh] flex-col overflow-hidden">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-8 py-4 border-b border-black/10">
          <div className="text-3xl font-extrabold tracking-tighter flex items-center">
            {/* Logo representation */}
            <span className="leading-none">C</span>
          </div>

          <div className="flex items-center gap-8 text-[11px] sm:text-xs tracking-[0.15em] font-medium uppercase">
            <div className="hidden lg:flex items-center gap-10">
              <a href="#" className="hover:opacity-60 transition-opacity">Platform</a>
              <a href="#" className="hover:opacity-60 transition-opacity">Culture</a>
              <a href="#" className="hover:opacity-60 transition-opacity">Work</a>
              <a href="#" className="hover:opacity-60 transition-opacity">Insights</a>
            </div>
            <a href="#" className="border border-black/30 px-8 py-2.5 hover:bg-black hover:text-[#f4f4f4] transition-colors">
              Contact
            </a>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-between px-8 pt-10 pb-4">
          <div className="max-w-4xl">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight leading-snug text-gray-900">
              Ship Fast. Build Smart.<br />
              Scale Forever..
            </h1>
          </div>

          <div className="mt-8 lg:mt-auto w-full flex items-end justify-center">
            <div className="relative w-[90vw] max-w-6xl aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="/images/silviagaudenzi-coffee-8478202_1920.jpg"
                alt="Coffee hero background"
                className="absolute inset-0 w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30" />
              <h2
                className="relative z-10 w-full text-[clamp(4rem,15vw,16rem)] font-light tracking-widest text-white leading-[0.8] select-none text-center px-8 py-20"
                style={{
                  letterSpacing: '0.1em',
                }}
              >
                OBSIDIAN
              </h2>
            </div>
          </div>
        </main>
      </div>

      <ScrollScaleVideo />
      <RevealOnScroll />  

      <GlideSection />
      <CursorSection />
      <ProgressSection />



      {/* <FpsTrackerSection /> */}
      {/* <LerpSection />
      <SequenceSection />
      <KineticTextSection /> */}
      {/* <FinalSection /> */}
      <JasmineHero />
      <CharlyHero />
    </div>
  );
}
