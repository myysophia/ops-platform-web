/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
  // 确保 Tailwind 不会覆盖 Ant Design 的样式
  corePlugins: {
    preflight: false,
  },
} 