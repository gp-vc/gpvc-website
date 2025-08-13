'use client';
import { useEffect, useRef } from 'react';
import { Locale } from '@/lib/i18n';

interface AboutProps {
	locale: Locale;
}

export default function About({ locale }: AboutProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	const content = {
		ko: {
			title: 'Our Story',
			subtitle:
				'GPVC는 콘텐츠 제작/투자/유통을 하고 있으며, 국내 유수의 제작진과 비즈니스를 활동 범위를 넓어,',
			subtitle2:
				'당사의 강점인 미디어 & 콘텐츠 엘리베이션으로 글로벌 비즈니스를 지향합니다.',
			description1:
				'우리는 다양한 지역(미국, 홍콩, 중국, 스페인, 베트남)에 걸쳐 여러 기업과 파트너십을 맺고 있습니다.',
			description2: '우리의 파트너십은 앞으로 전 세계적으로 확장될 것 입니다.',
			description3:
				'우리는 문화와 언어를 넘나들며 관객들과 연결되는 매력적이고 의미 있는 콘텐츠를 위한 목적지가 되는',
			description4: '것을 목표로 합니다.',
			mission:
				'We aim to be a destination for engaging meaningful content that connects with audiences across cultures and languages.',
		},
		en: {
			title: 'Our Story',
			subtitle:
				'GPVC is engaged in content production/investment/distribution, and with the expansion of business activities with leading domestic production teams,',
			subtitle2:
				"we aim for global business through media & content elevation, which is our company's strength.",
			description1:
				'We have partnerships with various companies across multiple regions (USA, Hong Kong, China, Spain, Vietnam).',
			description2: 'Our partnerships will expand globally in the future.',
			description3:
				'We aim to be a destination for engaging meaningful content that connects with audiences across cultures and languages.',
			description4: '',
			mission:
				'We aim to be a destination for engaging meaningful content that connects with audiences across cultures and languages.',
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

		if (sectionRef.current) {
			const elements =
				sectionRef.current.querySelectorAll('.animate-on-scroll');
			elements.forEach((el) => observer.observe(el));
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section
			id='about'
			ref={sectionRef}
			className='py-16 lg:py-24 bg-white relative overflow-hidden'
		>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='animate-on-scroll text-center mb-16'>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8'>
						{t.title}
					</h2>

					<div className='max-w-5xl mx-auto space-y-4'>
						<p className='text-lg sm:text-xl text-gray-700 leading-relaxed font-medium'>
							{t.subtitle}
						</p>
						<p className='text-lg sm:text-xl text-gray-700 leading-relaxed font-medium'>
							{t.subtitle2}
						</p>
					</div>
				</div>

				{/* Content Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
					{/* Left Content */}
					<div className='animate-on-scroll space-y-6'>
						<div className='space-y-4'>
							<p className='text-gray-600 leading-relaxed'>{t.description1}</p>
							<p className='text-gray-600 leading-relaxed'>{t.description2}</p>
							<p className='text-gray-600 leading-relaxed'>{t.description3}</p>
							{t.description4 && (
								<p className='text-gray-600 leading-relaxed'>
									{t.description4}
								</p>
							)}
						</div>

						{/* Mission Statement */}
						<div className='bg-gradient-to-r from-[#bdb9dc]/10 to-[#a8a4d0]/10 p-6 rounded-2xl border-l-4 border-[#bdb9dc]'>
							<p className='text-[#827bb8] font-medium leading-relaxed italic text-lg'>
								{t.mission}
							</p>
						</div>

						{/* Stats */}
						<div className='grid grid-cols-3 gap-6 pt-8'>
							<div className='text-center'>
								<div className='text-2xl lg:text-3xl font-bold text-[#bdb9dc] mb-2'>
									5+
								</div>
								<div className='text-sm text-gray-600'>
									{locale === 'ko' ? '국가' : 'Countries'}
								</div>
							</div>
							<div className='text-center'>
								<div className='text-2xl lg:text-3xl font-bold text-[#bdb9dc] mb-2'>
									50+
								</div>
								<div className='text-sm text-gray-600'>
									{locale === 'ko' ? '파트너사' : 'Partners'}
								</div>
							</div>
							<div className='text-center'>
								<div className='text-2xl lg:text-3xl font-bold text-[#bdb9dc] mb-2'>
									100+
								</div>
								<div className='text-sm text-gray-600'>
									{locale === 'ko' ? '프로젝트' : 'Projects'}
								</div>
							</div>
						</div>
					</div>

					{/* Right Content - Visual */}
					<div className='animate-on-scroll'>
						<div className='relative'>
							{/* Main visual placeholder */}
							<div className='aspect-square bg-gradient-to-br from-[#bdb9dc] to-[#827bb8] rounded-3xl shadow-2xl relative overflow-hidden'>
								{/* Decorative elements */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent'></div>

								{/* Content overlay */}
								<div className='absolute inset-0 flex items-center justify-center'>
									<div className='text-center text-white p-8'>
										<div className='w-20 h-20 bg-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center backdrop-blur-sm'>
											<div className='w-10 h-10 bg-white/30 rounded-xl'></div>
										</div>
										<h3 className='text-xl font-bold mb-2'>Global Reach</h3>
										<p className='text-white/80 text-sm'>
											{locale === 'ko'
												? '전 세계를 연결하는 콘텐츠'
												: 'Content Connecting the World'}
										</p>
									</div>
								</div>

								{/* Floating elements */}
								<div className='absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm animate-float'></div>
								<div
									className='absolute bottom-6 left-6 w-8 h-8 bg-white/15 rounded-full backdrop-blur-sm animate-float'
									style={{ animationDelay: '1s' }}
								></div>
								<div
									className='absolute top-1/2 left-4 w-6 h-6 bg-white/12 rounded-full backdrop-blur-sm animate-float'
									style={{ animationDelay: '2s' }}
								></div>
							</div>

							{/* Secondary visual elements */}
							<div className='absolute -bottom-6 -right-6 w-24 h-24 bg-[#a8a4d0] rounded-2xl shadow-xl opacity-80 transform rotate-12'></div>
							<div className='absolute -top-4 -left-4 w-16 h-16 bg-[#9590c4] rounded-xl shadow-lg opacity-60 transform -rotate-12'></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
