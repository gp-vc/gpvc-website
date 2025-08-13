'use client';
import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface HeroProps {
	locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
	const heroRef = useRef<HTMLDivElement>(null);

	const content = {
		ko: {
			title: 'Global Content Media Group GPVC',
			subtitle1: '우리는 문화와 언어를 넘나들며 관객들과 연결되는 매력적이고',
			subtitle2: '의미 있는 콘텐츠를 위한 목적지가 되는 것을 목표로 합니다.',
			description1:
				'우리의 컨텐츠에 대한 글로벌 고객을 구축하고 업계의 선도적인 힘이 될 것입니다.',
			description2:
				'또한 창의적인 마인드가 모여 전성한 차이를 만드는 콘텐츠를 제작할 수 있는',
			description3: '혁신과 협업의 문화를 조성하기 위해 노력하고 있습니다.',
			scrollDown: '더 알아보기',
		},
		en: {
			title: 'Global Content Media Group GPVC',
			subtitle1: 'We aim to be a destination for engaging meaningful content',
			subtitle2: 'that connects with audiences across cultures and languages.',
			description1:
				'We will build a global audience for our content and become a leading force in our industry.',
			description2:
				'We are also committed to fostering a culture of innovation and collaboration ',
			description3:
				'where creative minds come together to produce content that makes a real difference.',
			scrollDown: 'Learn More',
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
		const aboutSection = document.getElementById('about');
		if (aboutSection) {
			aboutSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section
			id='hero'
			ref={heroRef}
			className='min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent'
		>
			{/* Background overlay */}
			<div className='absolute inset-0 bg-black/20'></div>

			{/* Content */}
			<div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<div className='space-y-8'>
					{/* Main Title */}
					<h1 className='animate-on-scroll text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight'>
						<span className='block'>{t.title}</span>
					</h1>

					{/* Subtitle */}
					<div className='animate-on-scroll max-w-4xl mx-auto space-y-2'>
						<p className='text-xl sm:text-2xl lg:text-3xl text-[#bdb9dc] font-light leading-relaxed'>
							{t.subtitle1}
						</p>
						<p className='text-xl sm:text-2xl lg:text-3xl text-[#bdb9dc] font-light leading-relaxed'>
							{t.subtitle2}
						</p>
					</div>

					{/* Description */}
					<div className='animate-on-scroll max-w-4xl mx-auto space-y-4 pt-8'>
						<p className='text-base sm:text-lg text-gray-300 leading-relaxed'>
							{t.description1}
						</p>
						<p className='text-base sm:text-lg text-gray-300 leading-relaxed'>
							{t.description2}
						</p>
						<p className='text-base sm:text-lg text-gray-300 leading-relaxed'>
							{t.description3}
						</p>
					</div>

					{/* CTA Button */}
					<div className='animate-on-scroll pt-12'>
						<button
							onClick={scrollToNext}
							className='group inline-flex items-center space-x-3 bg-[#bdb9dc] hover:bg-[#a8a4d0] text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl'
						>
							<span className='font-semibold text-lg'>{t.scrollDown}</span>
							<ArrowDown
								size={20}
								className='group-hover:translate-y-1 transition-transform duration-300'
							/>
						</button>
					</div>
				</div>
			</div>

			{/* Scroll indicator - Desktop */}
			<div className='hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
				<div className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center'>
					<div className='w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse'></div>
				</div>
			</div>

			{/* Swipe indicator - Mobile/Tablet */}
			<div className='lg:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2'>
				<div className='flex items-center space-x-2 text-white/70 animate-pulse'>
					<div className='flex space-x-1'>
						<div className='w-2 h-2 bg-white/50 rounded-full animate-bounce'></div>
						<div
							className='w-2 h-2 bg-white/50 rounded-full animate-bounce'
							style={{ animationDelay: '0.1s' }}
						></div>
						<div
							className='w-2 h-2 bg-white/50 rounded-full animate-bounce'
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
