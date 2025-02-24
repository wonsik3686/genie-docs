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
  			pretentard: [
  				'Pretendard',
  				'sans-serif'
  			],
  			verdana: [
  				'Verdana',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'4xl-medium': [
  				'2.5rem',
  				{
  					lineHeight: '3rem',
  					fontWeight: '500'
  				}
  			],
  			'3xl-bold': [
  				'2rem',
  				{
  					lineHeight: '2.375rem',
  					fontWeight: '700'
  				}
  			],
  			'3xl-semibold': [
  				'2rem',
  				{
  					lineHeight: '2.375rem',
  					fontWeight: '600'
  				}
  			],
  			'3xl-medium': [
  				'2rem',
  				{
  					lineHeight: '2.375rem',
  					fontWeight: '500'
  				}
  			],
  			'3xl-regular': [
  				'2rem',
  				{
  					lineHeight: '2.375rem',
  					fontWeight: '400'
  				}
  			],
  			'2xl-bold': [
  				'1.5rem',
  				{
  					lineHeight: '1.75rem',
  					fontWeight: '700'
  				}
  			],
  			'2xl-semibold': [
  				'1.5rem',
  				{
  					lineHeight: '1.75rem',
  					fontWeight: '600'
  				}
  			],
  			'2xl-medium': [
  				'1.5rem',
  				{
  					lineHeight: '1.75rem',
  					fontWeight: '500'
  				}
  			],
  			'2xl-regular': [
  				'1.5rem',
  				{
  					lineHeight: '1.75rem',
  					fontWeight: '400'
  				}
  			],
  			'xl-bold': [
  				'1.25rem',
  				{
  					lineHeight: '1.5rem',
  					fontWeight: '700'
  				}
  			],
  			'xl-semibold': [
  				'1.25rem',
  				{
  					lineHeight: '1.5rem',
  					fontWeight: '600'
  				}
  			],
  			'xl-medium': [
  				'1.25rem',
  				{
  					lineHeight: '1.5rem',
  					fontWeight: '500'
  				}
  			],
  			'xl-regular': [
  				'1.25rem',
  				{
  					lineHeight: '1.5rem',
  					fontWeight: '400'
  				}
  			],
  			'2lg-bold': [
  				'1.125rem',
  				{
  					lineHeight: '1.3125rem',
  					fontWeight: '700'
  				}
  			],
  			'2lg-semibold': [
  				'1.125rem',
  				{
  					lineHeight: '1.3125rem',
  					fontWeight: '600'
  				}
  			],
  			'2lg-medium': [
  				'1.125rem',
  				{
  					lineHeight: '1.3125rem',
  					fontWeight: '500'
  				}
  			],
  			'2lg-regular': [
  				'1.125rem',
  				{
  					lineHeight: '1.3125rem',
  					fontWeight: '400'
  				}
  			],
  			'lg-bold': [
  				'1rem',
  				{
  					lineHeight: '1.1875rem',
  					fontWeight: '700'
  				}
  			],
  			'lg-semibold': [
  				'1rem',
  				{
  					lineHeight: '1.1875rem',
  					fontWeight: '600'
  				}
  			],
  			'lg-medium': [
  				'1rem',
  				{
  					lineHeight: '1.1875rem',
  					fontWeight: '500'
  				}
  			],
  			'lg-regular': [
  				'1rem',
  				{
  					lineHeight: '1.1875rem',
  					fontWeight: '400'
  				}
  			],
  			'md-bold': [
  				'0.875rem',
  				{
  					lineHeight: '1.0625rem',
  					fontWeight: '700'
  				}
  			],
  			'md-semibold': [
  				'0.875rem',
  				{
  					lineHeight: '1.0625rem',
  					fontWeight: '600'
  				}
  			],
  			'md-medium': [
  				'0.875rem',
  				{
  					lineHeight: '1.0625rem',
  					fontWeight: '500'
  				}
  			],
  			'md-regular': [
  				'0.875rem',
  				{
  					lineHeight: '1.0625rem',
  					fontWeight: '400'
  				}
  			],
  			'sm-bold': [
  				'0.8125rem',
  				{
  					lineHeight: '1rem',
  					fontWeight: '700'
  				}
  			],
  			'sm-semibold': [
  				'0.8125rem',
  				{
  					lineHeight: '1rem',
  					fontWeight: '600'
  				}
  			],
  			'sm-medium': [
  				'0.8125rem',
  				{
  					lineHeight: '1rem',
  					fontWeight: '500'
  				}
  			],
  			'sm-regular': [
  				'0.8125rem',
  				{
  					lineHeight: '1rem',
  					fontWeight: '400'
  				}
  			],
  			'xs-bold': [
  				'0.75rem',
  				{
  					lineHeight: '0.875rem',
  					fontWeight: '700'
  				}
  			],
  			'xs-semibold': [
  				'0.75rem',
  				{
  					lineHeight: '0.875rem',
  					fontWeight: '600'
  				}
  			],
  			'xs-medium': [
  				'0.75rem',
  				{
  					lineHeight: '0.875rem',
  					fontWeight: '500'
  				}
  			],
  			'xs-regular': [
  				'0.75rem',
  				{
  					lineHeight: '0.875rem',
  					fontWeight: '400'
  				}
  			]
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		screens: {
  			xs: '20rem',
  			sm: '26.5625rem',
  			md: '46.4375rem',
  			lg: '74.9375rem',
  			xl: '78rem'
  		}
  	}
  },
  plugins: [animate],
} satisfies Config;
