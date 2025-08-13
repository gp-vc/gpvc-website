'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface BusinessAreasProps {
	locale: Locale;
}

export default function BusinessAreas({ locale }: BusinessAreasProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	const content = {
		ko: {
			title: '사업분야',
		},
		en: {
			title: 'Business Areas',
		},
	};

	const businessAreas = [
		{
			id: 1,
			title: { ko: '프로듀싱/투자', en: 'Production & Investment' },
			description: {
				ko: '드라마, 영화, 콘서트, 팬미팅, 공연',
				en: 'Drama, Film, Concert, Fan meeting, Performance',
			},
			image: '/stock-images/production.jpeg',
			items: [
				{ ko: '방송', en: 'Broadcasting' },
				{ ko: '드라마', en: 'Drama' },
				{ ko: '영화', en: 'Film' },
				{ ko: '콘서트', en: 'Concert' },
				{ ko: '팬미팅', en: 'Fan meeting' },
				{ ko: '공연', en: 'Performance' },
			],
		},
		{
			id: 2,
			title: { ko: '저작권', en: 'IP' },
			description: {
				ko: '방송, 숏폼 드라마, 웹 에둘, 유튜브',
				en: 'Broadcasting, Short-form Drama, Web Episodes, YouTube',
			},
			image: '/stock-images/ip.jpeg',
			items: [
				{ ko: '방송', en: 'Broadcasting' },
				{ ko: '숏폼 드라마', en: 'Short-form Drama' },
				{ ko: '웹 에둘', en: 'Web Episodes' },
				{ ko: '유튜브', en: 'YouTube' },
			],
		},
		{
			id: 3,
			title: { ko: '브랜드', en: 'Brand' },
			description: {
				ko: '와인, 화장품, 바디워시, 향유',
				en: 'Wine, Cosmetics, Body wipes, Perfume oil',
			},
			image: '/stock-images/brand.jpeg',
			items: [
				{ ko: '와인', en: 'Wine' },
				{ ko: '화장품', en: 'Cosmetics' },
				{ ko: '바디워시', en: 'Body wipes' },
				{ ko: '향유', en: 'Perfume oil' },
			],
		},
		{
			id: 4,
			title: { ko: '배포', en: 'Distribution' },
			description: {
				ko: '콘텐츠, 음원, MD, 굿즈, etc.',
				en: 'Contents, Music, MD, Goods, etc.',
			},
			image: '/stock-images/distribution.jpeg',
			items: [
				{ ko: '콘텐츠', en: 'Contents' },
				{ ko: '음원', en: 'Music' },
				{ ko: 'MD', en: 'MD' },
				{ ko: '굿즈', en: 'Goods' },
				{ ko: 'etc.', en: 'etc.' },
			],
		},
		{
			id: 5,
			title: { ko: '대행사', en: 'Agency' },
			description: {
				ko: '아티스트, 브랜드, 이벤트',
				en: 'Artists, Brand, Events',
			},
			image: '/stock-images/agency.jpeg',
			items: [
				{ ko: '아티스트', en: 'Artists' },
				{ ko: '브랜드', en: 'Brand' },
				{ ko: '이벤트', en: 'Events' },
			],
		},
	];

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
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const renderBusinessCard = (area: (typeof businessAreas)[0]) => (
		<div
			key={area.id}
			className='group relative bg-white rounded-2xl overflow-hidden hover:shadow-none transition-all duration-500 h-full flex flex-col'
		>
			{/* Image with monochrome effect */}
			<div className='h-64 relative overflow-hidden flex-shrink-0'>
				{/* Placeholder image with food styling similar to mockup */}
				<Image
					src={area.image}
					alt={area.title[locale]}
					fill
					className='object-cover transition-all duration-500'
					sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
					priority={area.id <= 3} // Priority for first 3 images
				/>

				{/* Monochrome overlay that disappears on hover */}
				<div className='absolute inset-0 bg-gray-500/60 group-hover:bg-transparent transition-all duration-500 backdrop-grayscale group-hover:backdrop-grayscale-0'></div>
			</div>

			{/* Content - now fills remaining space */}
			<div className='p-6 flex-1 flex flex-col'>
				<h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-[#827bb8] transition-colors duration-300'>
					{area.title[locale]}
				</h3>

				{/* Items list - with consistent spacing */}
				<div className='space-y-2 mb-4 flex-1'>
					{area.items.map((item, itemIndex) => (
						<div key={itemIndex} className='flex items-center space-x-2'>
							<div className='w-1.5 h-1.5 bg-[#a8a4d0] rounded-full flex-shrink-0'></div>
							<span className='text-sm text-gray-600'>{item[locale]}</span>
						</div>
					))}
				</div>

				{/* Button - always at bottom */}
				<div className='mt-auto'>
					<button className='flex items-center space-x-2 text-[#a8a4d0] hover:text-[#827bb8] transition-colors duration-300 group/btn'>
						<span className='text-sm font-medium'>
							{locale === 'ko' ? '자세히 보기' : 'Learn More'}
						</span>
						<ArrowRight
							size={16}
							className='group-hover/btn:translate-x-1 transition-transform duration-300'
						/>
					</button>
				</div>
			</div>
		</div>
	);

	return (
		<section
			id='business'
			className='py-16 lg:py-24 bg-white mx-auto px-4 sm:px-6 lg:px-8'
		>
			<div ref={sectionRef}>
				<div className='text-center mb-16'>
					<h2 className='text-3xl lg:text-5xl font-bold text-gray-900 mb-6'>
						{t.title}
					</h2>
				</div>

				{/* Carousel with consistent card heights */}
				<div className='relative'>
					{/* Static Grid Layout */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8'>
						{businessAreas.map((area) => renderBusinessCard(area))}
					</div>
				</div>
			</div>
		</section>
	);
}
