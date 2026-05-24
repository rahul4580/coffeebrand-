import eslintConfigNext from 'eslint-config-next';

export default [
  ...eslintConfigNext,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
