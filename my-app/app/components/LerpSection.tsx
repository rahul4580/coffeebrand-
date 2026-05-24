"use client";

import Script from "next/script";
import "./lerp-section.css";

export default function LerpSection() {
  return (
    <div className="lerp-tutorial-wrapper">
      <Script
        src="https://unpkg.com/@fiddle-digital/string-tune@1.1.53/dist/index.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && window.StringTune) {
            const stringTune = window.StringTune.StringTune.getInstance();
            stringTune.use(window.StringTune.StringLazy);
            stringTune.use(window.StringTune.StringLerp);
            stringTune.start(0);
          }
        }}
      />
      
      <div className="lerp-w">
        <figure className="image-1" {...{ string: "lerp" }}>
          <img {...{ string: "lazy", "string-lazy": "/assets/gpu.png" }} alt="" />
        </figure>
      </div>

      <div className="lerp-w" style={{ marginTop: '5vh' }}>
        <figure className="image-1" {...{ string: "lerp" }}>
          <img {...{ string: "lazy", "string-lazy": "/assets/keyboard.png" }} alt="" />
        </figure>
      </div>

      <div className="lerp-w" style={{ marginTop: '5vh' }}>
        <figure className="image-1" {...{ string: "lerp" }}>
          <img {...{ string: "lazy", "string-lazy": "/assets/headset.png" }} alt="" />
        </figure>
      </div>

      <div className="lerp-w" style={{ marginTop: '5vh', marginBottom: '10vh' }}>
        <figure className="image-1" {...{ string: "lerp" }}>
          <img {...{ string: "lazy", "string-lazy": "/assets/drone.png" }} alt="" />
        </figure>
      </div>
    </div>
  );
}
