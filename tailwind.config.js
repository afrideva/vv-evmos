/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@afrideva/ui/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
       colors: {
        sRed:  '#ff3232',
        
      }
    },
  },
    safelist: [
    'text-sRed',
    'bg-sRed',
    'bg-blue',
    // {
    //   pattern: /bg-(sRed|green|blue)-(100|200|300)/,
    //   variants: ['lg', 'hover', 'focus', 'lg:hover'],
    // },
  ],
  plugins: [require('@tailwindcss/forms'),],
}
