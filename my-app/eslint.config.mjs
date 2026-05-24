import eslintConfigNext from "eslint-config-next";

const config = [
  ...eslintConfigNext,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Intentional client-only mount guards for scroll/DOM effects
      "react-hooks/set-state-in-effect": "off",
      // Portfolio uses plain img/video in several animation sections
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
