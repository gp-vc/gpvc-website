'use client';
import { useEffect, useRef } from 'react';
import { Locale } from '@/lib/i18n';

interface HeroProps {
	locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
	const heroRef = useRef<HTMLDivElement>(null);

	const content = {
		en: {
			title: 'Across markets & ideas',
			subtitle1:
				'Blending culture, innovation, and global inspiration, creating connections that span continents.',
			subtitle2:
				'We discover what resonates, craft it with care, and share it widely. From screen to shelf.',
			subtitle3:
				'We explore, we create, we showcase. For audiences everywhere.',
		},
		ko: {
			title: 'Across markets & ideas',
			subtitle1: '문화에서 얻은 아이디어를 정교하게 다듬어 세계와 나눕니다.',
			subtitle2: '스크린에서 삶 속까지 울림 있는 이야기를 찾아 전합니다.',
			subtitle3: '우리는 탐색하고 만들고, 선보입니다.',
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

	const scrollToVideo = () => {
		const aboutSection = document.getElementById('about');
		if (aboutSection) {
			aboutSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section
			id='hero'
			ref={heroRef}
			className='min-h-screen flex items-center justify-center relative'
		>
			{/* Content */}
			<div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='space-y-8'>
					{/* Main Title */}
					<h1 className='animate-on-scroll text-3xl sm:text-5xl lg:text-7xl font-extralight text-white text-center leading-tight drop-shadow-2xl mb-16'>
						<span className='block'>{t.title}</span>
					</h1>
					{/* Sub Title */}
					<h1 className='animate-on-scroll text-lg sm:text-xl lg:text-2xl font-thin text-white text-left leading-tight drop-shadow-2xl'>
						<span className='block'>{t.subtitle1}</span>
					</h1>
					<h1 className='animate-on-scroll text-lg sm:text-xl lg:text-2xl font-thin text-white text-left leading-tight drop-shadow-2xl'>
						<span className='block'>{t.subtitle2}</span>
					</h1>
					<h1 className='animate-on-scroll text-lg sm:text-xl lg:text-2xl font-thin text-white text-left leading-tight drop-shadow-2xl'>
						<span className='block'>{t.subtitle3}</span>
					</h1>
				</div>
			</div>

			{/* Scroll indicator - Desktop */}
			<div
				onClick={scrollToVideo}
				className='cursor-pointer hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20'
			>
				<div className='w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm'>
					<div className='w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse'></div>
				</div>
			</div>

			{/* Swipe indicator - Mobile/Tablet */}
			<div
				onClick={scrollToVideo}
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
