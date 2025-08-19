'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
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
			title: {
				ko: '엔터테인먼트, 콘텐츠, 그 너머',
				en: 'Entertainment, Content, and Experiences',
			},
			description: {
				ko: '제작/투자 및 에이전시 서비스',
				en: 'Production/Investment and Agency Services',
			},
			image: '/stock-images/production.jpeg',
			categories: [
				{
					title: { ko: '제작/투자', en: 'Production & Investment' },
					items: [
						{ ko: '영화', en: 'Feature Films' },
						{ ko: '드라마 및 숏폼 드라마', en: 'Dramas & Short-Form Dramas' },
						{ ko: '시리즈물', en: 'Series' },
						{ ko: '디지털 콘텐츠', en: 'Digital Contents' },
						{
							ko: '콘서트 와 라이브 퍼포먼스',
							en: 'Concerts, Theatres & Live Performances',
						},
						{
							ko: '요술램프',
							en: 'Magic Lamp',
							link: 'https://mbcplus.com/web/program/contentList.do?programInfoSeq=262',
						},
						{
							ko: 'rainbow7+',
							en: 'rainbow7+',
							link: 'https://youtube.com/@love_bridge7',
						},
					],
				},
				{
					title: { ko: '에이전시', en: 'Agency' },
					items: [
						{ ko: 'K-Pop 및 글로벌 아티스트', en: 'K-Pop and Global Artists' },
						{ ko: '브랜드 스폰서쉽', en: 'Brand Sponsorships' },
						{ ko: '이벤트/ 프로모션', en: 'Events/ Promotions' },
						{ ko: '광고/ PPL', en: 'Advertisement/ PPL' },
					],
				},
			],
		},
		{
			id: 2,
			title: { ko: '코스메틱스', en: 'Cosmetics' },
			description: {
				ko: '프리미엄 뷰티 브랜드',
				en: 'Premium Beauty Brands',
			},
			image: '/stock-images/cosmetics.jpeg',
			categories: [
				{
					title: { ko: 'CLNL', en: 'CLNL' },
					items: [
						{
							ko: '소개 / 제품소개',
							en: 'Introduction / Product Overview',
						},
					],
				},
				{
					title: { ko: 'donotstare co.', en: 'donotstare co.' },
					items: [
						{
							ko: '소개 / 제품소개 ',
							en: 'Introduction / Product Overview',
						},
					],
				},
			],
		},
		{
			id: 3,
			title: { ko: '글로벌 소싱', en: 'Global Sourcing' },
			description: {
				ko: '엄선된 글로벌 프리미엄 제품',
				en: 'Curated Global Premium Products',
			},
			image: '/stock-images/brand.jpeg',
			categories: [
				{
					title: {
						ko: '컬트 와인/ 소량생산 프리미엄 와인',
						en: 'Artisan Wines',
					},
					items: [
						{
							ko: "Clos de L'Obac",
							en: "Clos de L'Obac",
							link: 'https://obac.es/en_US',
						},
						{
							ko: 'Bodega El Capricho',
							en: 'Bodega El Capricho',
							link: 'https://bodegaelcapricho.com/en/',
						},
					],
				},
				{
					title: {
						ko: '엄선된 글로벌 셀렉션',
						en: 'Curated Provisions or Global Finds',
					},
					items: [],
				},
			],
		},
		{
			id: 4,
			title: { ko: '유통', en: 'Distribution' },
			description: {
				ko: '콘텐츠 및 상품 유통',
				en: 'Content and Product Distribution',
			},
			image: '/stock-images/distribution.jpeg',
			categories: [
				{
					title: { ko: '유통 서비스', en: 'Distribution Services' },
					items: [
						{ ko: '콘텐츠', en: 'Contents' },
						{ ko: '사운드트랙 OST', en: 'Soundtracks' },
						{ ko: '외부 협력 제품', en: 'External Products' },
						{ ko: '굿즈 상품', en: 'Merchandise/ Goods' },
						{ ko: 'and more.', en: 'and more.' },
					],
				},
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
			className='group relative bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/30 hover:shadow-2xl transition-all duration-500 h-full flex flex-col'
		>
			{/* Image with monochrome effect */}
			<div className='h-64 relative overflow-hidden flex-shrink-0'>
				<Image
					src={area.image}
					alt={area.title[locale]}
					fill
					className='object-cover transition-all duration-500'
					sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
					priority={area.id <= 3}
				/>

				{/* Monochrome overlay that disappears on hover */}
				<div className='absolute inset-0 bg-gray-500/60 group-hover:bg-transparent transition-all duration-500 backdrop-grayscale group-hover:backdrop-grayscale-0'></div>
			</div>

			{/* Content - now fills remaining space */}
			<div className='p-6 flex-1 flex flex-col'>
				<h3 className='text-xl font-thin text-white mb-3 group-hover:text-[#bdb9dc] transition-colors duration-300 drop-shadow-lg'>
					{area.title[locale]}
				</h3>

				{/* Categories and Items list - with consistent spacing */}
				<div className='space-y-4 mb-4 flex-1 overflow-y-auto'>
					{area.categories.map((category, categoryIndex) => (
						<div key={categoryIndex} className='space-y-2'>
							{/* Category title */}
							<h4 className='text-sm font-medium text-[#bdb9dc] drop-shadow'>
								{category.title[locale]}
							</h4>

							{/* Category items */}
							{category.items.length > 0 && (
								<div className='space-y-1 ml-2'>
									{category.items.map((item, itemIndex) => {
										const hasLink = item.link;
										const ItemComponent = hasLink ? 'a' : 'div';
										const itemProps = hasLink
											? {
													href: item.link,
													target: '_blank',
													rel: 'noopener noreferrer',
													className:
														'flex items-start space-x-2 hover:text-[#bdb9dc] transition-colors duration-200 cursor-pointer group/item',
											  }
											: {
													className: 'flex items-start space-x-2',
											  };

										return (
											<ItemComponent key={itemIndex} {...itemProps}>
												<div className='w-1 h-1 bg-white/70 rounded-full flex-shrink-0 mt-2 group-hover/item:bg-[#bdb9dc] transition-colors duration-200'></div>
												<span className='text-xs text-white/90 drop-shadow leading-relaxed flex items-center gap-1'>
													{item[locale]}
													{hasLink && (
														<ExternalLink
															size={10}
															className='opacity-60 group-hover/item:opacity-100 transition-opacity duration-200'
														/>
													)}
												</span>
											</ItemComponent>
										);
									})}
								</div>
							)}
						</div>
					))}
				</div>

				{/* Button - always at bottom */}
				<div className='mt-auto'>
					<button className='flex items-center space-x-2 text-[#bdb9dc] hover:text-white transition-colors duration-300 group/btn'>
						<span className='text-sm font-medium drop-shadow'>
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
			className='py-16 lg:py-24 mx-auto px-4 sm:px-6 lg:px-8'
		>
			<div ref={sectionRef}>
				<div className='text-center mb-16'>
					<h2 className='text-3xl lg:text-5xl font-thin text-white mb-6 drop-shadow-2xl'>
						{t.title}
					</h2>
				</div>

				{/* Grid Layout for Business Cards */}
				<div className='relative'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8'>
						{businessAreas.map((area) => renderBusinessCard(area))}
					</div>
				</div>
			</div>
		</section>
	);
}
