module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'bg-primary': 'var(--color-bg-primary)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
      },
      spacing: {
        sidebar: '240px',
        'sidebar-collapsed': '80px',
        'fluid-sm': 'clamp(0.5rem, 1vw, 0.75rem)',
        'fluid-base': 'clamp(1rem, 2vw, 1.5rem)',
        'fluid-lg': 'clamp(2rem, 4vw, 3rem)',
        'fluid-xl': 'clamp(4rem, 8vw, 6rem)',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      fontSize: {
        // --- REVISI UNTUK SKALA YANG LEBIH SEIMBANG DIMULAI ---
        'fluid-xs': ['clamp(0.75rem, 0.25vw + 0.65rem, 0.875rem)','1.4'],
        'fluid-sm': ['clamp(0.875rem, 0.25vw + 0.75rem, 1rem)', '1.5'],
        'fluid-base': ['clamp(1rem, 0.34vw + 0.91rem, 1.19rem)', '1.5'],
        'fluid-lg': ['clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)', '1.4'],
        'fluid-xl': ['clamp(1.56rem, 1vw + 1.31rem, 2.11rem)', '1.4'],
        'fluid-2xl': ['clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)', '1.2'],
        'fluid-3xl': ['clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)', '1.2'],
        // --- REVISI SELESAI ---
      },
      screens: {
        '3xl': '1920px',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-out',
      },
    },
  },
  plugins: [],
};