/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        'primary-bg': '#f8fafc',
        'secondary-bg': '#f1f5f9',
        'tertiary-bg': '#e2e8f0',
        'surface-bg': 'rgba(255, 255, 255, 0.85)',
        'card-bg': 'rgba(255, 255, 255, 0.7)',
        'glass-bg': 'rgba(255, 255, 255, 0.25)',
        'glass-border': 'rgba(255, 255, 255, 0.18)',
        
        'primary-text': '#1e293b',
        'secondary-text': '#475569',
        'muted-text': '#64748b',
        'accent-text': '#1f2937',
        
        'border-color': 'rgba(226, 232, 240, 0.6)',
        'border-hover': 'rgba(203, 213, 225, 0.8)',
        'focus-ring': 'rgba(31, 41, 55, 0.5)',
        
        'accent-primary': '#1f2937',
        'accent-secondary': '#374151',
        'accent-success': '#10b981',
        'accent-warning': '#f59e0b',
        'accent-error': '#ef4444',
        
        // Dark theme colors
        'dark': {
          'primary-bg': '#000000',
          'secondary-bg': '#1a1a1a',
          'tertiary-bg': '#2d2d2d',
          'surface-bg': 'rgba(26, 26, 26, 0.85)',
          'card-bg': 'rgba(45, 45, 45, 0.7)',
          'glass-bg': 'rgba(255, 255, 255, 0.1)',
          'glass-border': 'rgba(255, 255, 255, 0.08)',
          
          'primary-text': '#ffffff',
          'secondary-text': '#e5e5e5',
          'muted-text': '#a3a3a3',
          'accent-text': '#d1d5db',
          
          'border-color': 'rgba(64, 64, 64, 0.6)',
          'border-hover': 'rgba(115, 115, 115, 0.8)',
          'focus-ring': 'rgba(209, 213, 219, 0.5)',
          
          'accent-primary': '#d1d5db',
          'accent-secondary': '#9ca3af',
          'accent-success': '#34d399',
          'accent-warning': '#fbbf24',
          'accent-error': '#f87171',
        }
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
        'serif': ['Crimson Text', 'serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in-bounce': 'scaleInBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'glass-shimmer': 'glassShimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleInBounce: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glassShimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-sm': '0 2px 8px rgba(31, 38, 135, 0.1)',
        'glass-xl': '0 25px 50px rgba(31, 38, 135, 0.25)',
        'dark-glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'dark-glass-sm': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'dark-glass-xl': '0 25px 50px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}