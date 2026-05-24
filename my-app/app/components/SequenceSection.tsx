"use client";

import Script from "next/script";
import "./sequence-section.css";

export default function SequenceSection() {
  return (
    <div className="sequence-tutorial-wrapper">
      <Script
        src="https://unpkg.com/@fiddle-digital/string-tune@1.1.53/dist/index.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && window.StringTune) {
            const stringTune = window.StringTune.StringTune.getInstance();
            stringTune.use(window.StringTune.StringLazy);
            stringTune.use(window.StringTune.StringSequence);
            stringTune.start(0);
          }
        }}
      />

      <div className="seq-w">
        <nav className="arrows">
          <span {...{ string: "sequence", "string-sequence-trigger": "demo[prev|loop]" }}>←</span>
          <span {...{ string: "sequence", "string-sequence-trigger": "demo[next|loop]" }}>→</span>
        </nav>

        <div className="mini-sequence">
          <figure {...{ string: "sequence", "string-sequence-trigger": "demo[0]" }}>
            <img {...{ string: "lazy", "string-lazy": "/assets/keyboard.png" }} alt="" />
          </figure>
          <figure {...{ string: "sequence", "string-sequence-trigger": "demo[1]" }}>
            <img {...{ string: "lazy", "string-lazy": "/assets/headset.png" }} alt="" />
          </figure>
          <figure {...{ string: "sequence", "string-sequence-trigger": "demo[2]" }}>
            <img {...{ string: "lazy", "string-lazy": "/assets/drone.png" }} alt="" />
          </figure>
          <figure {...{ string: "sequence", "string-sequence-trigger": "demo[3]" }}>
            <img {...{ string: "lazy", "string-lazy": "/assets/gpu.png" }} alt="" />
          </figure>
        </div>

        <div
          className="sequence"
          {...{
            string: "sequence",
            "string-entering-duration": "demo[50]",
            "string-leaving-duration": "demo[900]",
            "string-active-step": "demo[0]"
          }}
        >
          <figure {...{ string: "sequence", "string-sequence": "demo[0]" }}>
            <img {...{ string: "lazy", "string-lazy": "/assets/keyboard.png" }} alt="" />
          </figure>
          <figure {...{ string: "sequence", "string-sequence": "demo[1]" }}>
            <img {...{ string: "lazy", "string-lazy": "/assets/headset.png" }} alt="" />
          </figure>
          <figure {...{ string: "sequence", "string-sequence": "demo[2]" }}>
            <img {...{ string: "lazy", "string-lazy": "/assets/drone.png" }} alt="" />
          </figure>
          <figure {...{ string: "sequence", "string-sequence": "demo[3]" }}>
            <img {...{ string: "lazy", "string-lazy": "/assets/gpu.png" }} alt="" />
          </figure>
        </div>

        <nav className="pages">
          <span {...{ string: "sequence", "string-sequence-trigger": "demo[0]" }}>1</span>
          <span {...{ string: "sequence", "string-sequence-trigger": "demo[1]" }}>2</span>
          <span {...{ string: "sequence", "string-sequence-trigger": "demo[2]" }}>3</span>
          <span {...{ string: "sequence", "string-sequence-trigger": "demo[3]" }}>4</span>
        </nav>
      </div>
    </div>
  );
}
