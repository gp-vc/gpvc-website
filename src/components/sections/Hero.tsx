'use client';
import { useEffect, useRef } from 'react';
import { Locale } from '@/lib/i18n';

interface HeroProps {
	locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
	const heroRef = useRef<HTMLDivElement>(null);

	const content = {
		ko: {
			title: 'GPVC',
			subtitle1: '글로벌 시장과 아이디어를 아우르며',
		},
		en: {
			title: 'GPVC',
			subtitle1: 'Across markets & ideas',
		},
	};

	const t = content[locale];

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-slide-up');
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (heroRef.current) {
			const elements = heroRef.current.querySelectorAll('.animate-on-scroll');
			elements.forEach((el) => observer.observe(el));
		}

		return () => observer.disconnect();
	}, []);

	const scrollToNext = () => {
		const businessSection = document.getElementById('business');
		if (businessSection) {
			businessSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section
			id='hero'
			ref={heroRef}
			className='min-h-screen flex items-center justify-center relative'
		>
			{/* Content */}
			<div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<div className='space-y-8'>
					{/* Main Title */}
					<h1 className='animate-on-scroll text-4xl sm:text-5xl lg:text-7xl font-thin text-white leading-tight drop-shadow-2xl'>
						<span className='block'>{t.title}</span>
					</h1>
					{/* Sub Title */}
					<h1 className='animate-on-scroll text-xl sm:text-2xl lg:text-4xl font-thin text-white leading-tight drop-shadow-2xl'>
						<span className='block'>{t.subtitle1}</span>
					</h1>
				</div>
			</div>

			{/* Scroll indicator - Desktop */}
			<div
				onClick={scrollToNext}
				className='cursor-pointer hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20'
			>
				<div className='w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm'>
					<div className='w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse'></div>
				</div>
			</div>

			{/* Swipe indicator - Mobile/Tablet */}
			<div
				onClick={scrollToNext}
				className='lg:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20'
			>
				<div className='flex items-center space-x-2 text-white/80 animate-pulse'>
					<div className='flex space-x-1'>
						<div className='w-2 h-2 bg-white/60 rounded-full animate-bounce'></div>
						<div
							className='w-2 h-2 bg-white/60 rounded-full animate-bounce'
							style={{ animationDelay: '0.1s' }}
						></div>
						<div
							className='w-2 h-2 bg-white/60 rounded-full animate-bounce'
							style={{ animationDelay: '0.2s' }}
						></div>
					</div>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='animate-pulse'
					>
						<path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' />
						<polyline points='10,17 15,12 10,7' />
						<line x1='15' x2='3' y1='12' y2='12' />
					</svg>
				</div>
			</div>
		</section>
	);
}
