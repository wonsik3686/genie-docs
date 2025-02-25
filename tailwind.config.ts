import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretentard: ['Pretendard', 'sans-serif'],
        verdana: ['Verdana', 'sans-serif'],
      },
      fontSize: {
        // 40px / 48px => 2.5rem / 3rem, Medium
        '4xl-medium': ['2.5rem', { lineHeight: '3rem', fontWeight: '500' }],

        // 32px / 38px => 2rem / 2.375rem
        '3xl-bold': ['2rem', { lineHeight: '2.375rem', fontWeight: '700' }],
        '3xl-semibold': ['2rem', { lineHeight: '2.375rem', fontWeight: '600' }],
        '3xl-medium': ['2rem', { lineHeight: '2.375rem', fontWeight: '500' }],
        '3xl-regular': ['2rem', { lineHeight: '2.375rem', fontWeight: '400' }],

        // 24px / 28px => 1.5rem / 1.75rem
        '2xl-bold': ['1.5rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        '2xl-semibold': [
          '1.5rem',
          { lineHeight: '1.75rem', fontWeight: '600' },
        ],
        '2xl-medium': ['1.5rem', { lineHeight: '1.75rem', fontWeight: '500' }],
        '2xl-regular': ['1.5rem', { lineHeight: '1.75rem', fontWeight: '400' }],

        // 20px / 24px => 1.25rem / 1.5rem
        'xl-bold': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        'xl-semibold': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        'xl-medium': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        'xl-regular': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '400' }],

        // 18px / 21px => 1.125rem / 1.3125rem
        '2lg-bold': [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '700' },
        ],
        '2lg-semibold': [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '600' },
        ],
        '2lg-medium': [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '500' },
        ],
        '2lg-regular': [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '400' },
        ],

        // 16px / 19px => 1rem / 1.1875rem
        'lg-bold': ['1rem', { lineHeight: '1.1875rem', fontWeight: '700' }],
        'lg-semibold': ['1rem', { lineHeight: '1.1875rem', fontWeight: '600' }],
        'lg-medium': ['1rem', { lineHeight: '1.1875rem', fontWeight: '500' }],
        'lg-regular': ['1rem', { lineHeight: '1.1875rem', fontWeight: '400' }],

        // 14px / 17px => 0.875rem / 1.0625rem
        'md-bold': ['0.875rem', { lineHeight: '1.0625rem', fontWeight: '700' }],
        'md-semibold': [
          '0.875rem',
          { lineHeight: '1.0625rem', fontWeight: '600' },
        ],
        'md-medium': [
          '0.875rem',
          { lineHeight: '1.0625rem', fontWeight: '500' },
        ],
        'md-regular': [
          '0.875rem',
          { lineHeight: '1.0625rem', fontWeight: '400' },
        ],

        // 13px / 16px => 0.8125rem / 1rem
        'sm-bold': ['0.8125rem', { lineHeight: '1rem', fontWeight: '700' }],
        'sm-semibold': ['0.8125rem', { lineHeight: '1rem', fontWeight: '600' }],
        'sm-medium': ['0.8125rem', { lineHeight: '1rem', fontWeight: '500' }],
        'sm-regular': ['0.8125rem', { lineHeight: '1rem', fontWeight: '400' }],

        // 12px / 14px => 0.75rem / 0.875rem
        'xs-bold': ['0.75rem', { lineHeight: '0.875rem', fontWeight: '700' }],
        'xs-semibold': [
          '0.75rem',
          { lineHeight: '0.875rem', fontWeight: '600' },
        ],
        'xs-medium': ['0.75rem', { lineHeight: '0.875rem', fontWeight: '500' }],
        'xs-regular': [
          '0.75rem',
          { lineHeight: '0.875rem', fontWeight: '400' },
        ],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
				brand: {
          DEFAULT: '#6E44FF', // 메인 브랜드 컬러(퍼플)
          light: '#A28CFF',   // 밝은 톤 (옵션)
          dark: '#4A2FCC',    // 어두운 톤 (옵션)
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
					emerald: '#10B981', // 민트/에메랄드 (버튼 호버 등)
          lime: '#A3E635',    // 라임 (원한다면 추가 포인트)
          pink: '#EC4899',    // 핑크/마젠타 (상황별로 사용)
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      screens: {
        // >= 20rem → 320px
        xs: '20rem',

        // >= 26.5625rem → 425px
        sm: '26.5625rem',

        // >= 46.4375rem → 743px
        md: '46.4375rem',

        // >= 74.9375rem → 1199px
        lg: '74.9375rem',

        // >= 78rem → 1248px (또는 75rem -> 1200px 사용도 가능)
        xl: '78rem',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
