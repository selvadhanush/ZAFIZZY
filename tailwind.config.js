/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070E1B',
          900: '#101E38', // Midnight navy primary
          800: '#182A4D',
          700: '#223864',
          muted: '#5A6882', // Secondary text navy-gray
          subtle: '#8B9BB4',
        },
        ivory: {
          warm: '#F4F2ED',
          light: '#FAF9F6',
          dark: '#EBE7DF',
        },
        mist: {
          blue: '#D8DFE9',
          light: '#EEF2F8',
          wash: '#F5F7FA',
        },
        platinum: {
          DEFAULT: '#E5E9F0',
          dark: '#CBD5E1',
        },
        champagne: {
          light: '#F5EFEB',
          DEFAULT: '#CBBBA0',
          dark: '#9F8C6E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.3em',
        'widest-2xl': '0.4em',
      },
      boxShadow: {
        'luxury': '0 25px 60px -15px rgba(16, 30, 56, 0.08), 0 10px 25px -10px rgba(16, 30, 56, 0.04)',
        'luxury-hover': '0 35px 80px -15px rgba(16, 30, 56, 0.14), 0 15px 35px -10px rgba(16, 30, 56, 0.08)',
        'glow-navy': '0 0 50px rgba(16, 30, 56, 0.15)',
      },
      backgroundImage: {
        'radial-lighting': 'radial-gradient(circle at 50% 35%, rgba(216, 223, 233, 0.4) 0%, rgba(244, 242, 237, 0.15) 50%, transparent 80%)',
        'subtle-vignette': 'radial-gradient(ellipse at center, transparent 60%, rgba(16, 30, 56, 0.03) 100%)',
      }
    },
  },
  plugins: [],
}
