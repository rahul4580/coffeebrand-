"use client";

import Script from "next/script";
import "./fps-tracker.css";

const images = [
  "/assets/gpu.png",
  "/assets/keyboard.png",
  "/assets/headset.png",
  "/assets/drone.png",
];

export default function FpsTrackerSection() {
  return (
    <div className="fps-tutorial-wrapper">
      <Script
        src="https://unpkg.com/@fiddle-digital/string-tune@1.1.53/dist/index.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).StringTune) {
            const stringTune = (window as any).StringTune.StringTune.getInstance();
            (window as any).StringTuneContext = stringTune;
            stringTune.use((window as any).StringTune.StringLazy);
            stringTune.use((window as any).StringTune.StringFPSTracker);
            stringTune.start(0);
            stringTune.FPSTrackerVisible = true;
          }
        }}
      />
      <div className="fps-w">
        <div className="fps-grid">
          {Array.from({ length: 16 }).map((_, i) => (
            <figure key={i}>
              <img
                {...{ string: "lazy", "string-lazy": images[i % images.length] }}
                alt=""
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
