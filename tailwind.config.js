/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Áp dụng bảng màu cố định cho dự án
        'main-bg': '#020617',
        'card-bg': '#0F172A',
        'primary-blue': '#2563EB',
        'accent-cyan': '#22D3EE',
        'accent-purple': '#8B5CF6',
        'main-text': '#E2E8F0',
      },
      // Thêm hiệu ứng animation 
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'pulse-glow': 'pulseGlow 2s infinite',
        'spin-reverse': 'spin 1.5s linear infinite reverse',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

    },
  },
  plugins: [],
}