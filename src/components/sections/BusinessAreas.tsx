'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Locale } from '@/lib/i18n';
import Carousel from '@/components/ui/Carousel';
import Image from 'next/image';

interface BusinessAreasProps {
	locale: Locale;
}

export default function BusinessAreas({ locale }: BusinessAreasProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [clientLogos, setClientLogos] = useState<string[]>([]);

	const content = {
		ko: {
			title: 'Business Area',
			subtitle: '파트너사 로고',
			description:
				"MBC Plus, MVC everyone, Tving, Waave, Shortime, Clos De L'obac, 이상엔터, Pledis, YG, Inkode, Rain Company, Viu, ViuTV, DatVietVAC, VieON, 하우스오브신세계,",
			partnerTitle: '파트너사',
		},
		en: {
			title: 'Business Area',
			subtitle: 'Client Partners',
			description:
				"MBC Plus, MVC everyone, Tving, Waave, Shortime, Clos De L'obac, Lee Sang Entertainment, Pledis, YG, Inkode, Rain Company, Viu, ViuTV, DatVietVAC, VieON, House of Shinsegae,",
			partnerTitle: 'Partners',
		},
	};

	const businessAreas = [
		{
			id: 1,
			category: 'Production / Investment',
			title: { ko: '방송', en: 'Broadcasting' },
			description: {
				ko: '드라마, 영화, 콘서트, 팬미팅, 공연',
				en: 'Drama, Film, Concert, Fan meeting, Performance',
			},
			image: '/placeholder-production.jpg',
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
			category: 'IP',
			title: { ko: 'IP', en: 'IP' },
			description: {
				ko: '방송, 숏폼 드라마, 웹 에둘, 유튜브',
				en: 'Broadcasting, Short-form Drama, Web Episodes, YouTube',
			},
			image: '/placeholder-ip.jpg',
			items: [
				{ ko: '방송', en: 'Broadcasting' },
				{ ko: '숏폼 드라마', en: 'Short-form Drama' },
				{ ko: '웹 에둘', en: 'Web Episodes' },
				{ ko: '유튜브', en: 'YouTube' },
			],
		},
		{
			id: 3,
			category: 'Brand',
			title: { ko: 'Brand', en: 'Brand' },
			description: {
				ko: 'Wine, Cosmetics, Body wipes, Perfume oil',
				en: 'Wine, Cosmetics, Body wipes, Perfume oil',
			},
			image: '/placeholder-brand.jpg',
			items: [
				{ ko: 'Wine', en: 'Wine' },
				{ ko: 'Cosmetics', en: 'Cosmetics' },
				{ ko: 'Body wipes', en: 'Body wipes' },
				{ ko: 'Perfume oil', en: 'Perfume oil' },
			],
		},
		{
			id: 4,
			category: 'Distribution',
			title: { ko: 'Distribution', en: 'Distribution' },
			description: {
				ko: '콘텐츠, 음원, MD, 굿즈, etc.',
				en: 'Contents, Music, MD, Goods, etc.',
			},
			image: '/placeholder-distribution.jpg',
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
			category: 'Agency',
			title: { ko: 'Agency', en: 'Agency' },
			description: {
				ko: 'Artists, Brand, Events',
				en: 'Artists, Brand, Events',
			},
			image: '/placeholder-agency.jpg',
			items: [
				{ ko: 'Artists', en: 'Artists' },
				{ ko: 'Brand', en: 'Brand' },
				{ ko: 'Events', en: 'Events' },
			],
		},
	];

	const t = content[locale];

	// Function to load client logos from /public/client-logos directory
	useEffect(() => {
		const loadClientLogos = async () => {
			try {
				// List of common client logo filenames (you can expand this list)
				const possibleLogos = [
					'mbc-plus',
					'mbc-everyone',
					'tving',
					'wavve',
					'shortime',
					// 'clos-de-lobac',
					// 'lee-sang-entertainment',
					'pledis',
					'yg',
					'inkode',
					'rain-company',
					'viu',
					'viu-tv',
					'dat-viet-vac',
					'vie-on',
					'house-of-shinsegae',
					// Add more client names as needed
				];

				const extensions = ['svg', 'png', 'webp'];
				const foundLogos: string[] = [];

				// Check each possible logo with each extension
				for (const logo of possibleLogos) {
					for (const ext of extensions) {
						try {
							const logoPath = `/client-logos/${logo}.${ext}`;
							// Try to fetch the image to check if it exists
							const response = await fetch(logoPath, { method: 'HEAD' });
							if (response.ok) {
								foundLogos.push(logoPath);
								break; // Found this logo, move to next
							}
						} catch (error) {
							// Logo doesn't exist with this extension, try next
							continue;
						}
					}
				}

				setClientLogos(foundLogos);
			} catch (error) {
				console.log('Client logos directory not found or empty');
				// Fallback: set empty array or placeholder logos
				setClientLogos([]);
			}
		};

		loadClientLogos();
	}, []);

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

	const renderBusinessCard = (
		area: (typeof businessAreas)[0]
		// _index: number
	) => (
		<div
			key={area.id}
			className='group relative bg-white rounded-2xl overflow-hidden hover:shadow-none transition-all duration-500 h-full flex flex-col'
		>
			{/* Image with monochrome effect */}
			<div className='h-64 relative overflow-hidden flex-shrink-0'>
				{/* Placeholder image with food styling similar to mockup */}
				<div className='absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 group-hover:from-[#bdb9dc] group-hover:to-[#827bb8] transition-all duration-500'>
					{/* Food styling elements to match mockup */}
					<div className='absolute inset-0 flex items-center justify-center'>
						{area.category === 'Brand' && (
							<div className='relative'>
								{/* Wine glass and cheese board styling */}
								<div className='w-16 h-20 bg-white/30 rounded-b-full mx-auto mb-4'></div>
								<div className='w-24 h-12 bg-white/20 rounded-lg'></div>
								<div className='absolute top-6 right-2 w-6 h-6 bg-white/25 rounded-full'></div>
								<div className='absolute bottom-2 left-1 w-4 h-4 bg-white/25 rounded-full'></div>
							</div>
						)}
						{area.category !== 'Brand' && (
							<div className='w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm'>
								<div className='w-10 h-10 bg-white/30 rounded-xl'></div>
							</div>
						)}
					</div>
				</div>

				{/* Monochrome overlay that disappears on hover */}
				<div className='absolute inset-0 bg-gray-500/60 group-hover:bg-transparent transition-all duration-500 backdrop-grayscale group-hover:backdrop-grayscale-0'></div>
			</div>

			{/* Content - now fills remaining space */}
			<div className='p-6 flex-1 flex flex-col'>
				<div className='mb-3'>
					<span className='text-xs font-semibold text-[#bdb9dc] uppercase tracking-wide'>
						{area.category}
					</span>
				</div>

				<h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-[#bdb9dc] transition-colors duration-300'>
					{area.title[locale]}
				</h3>

				{/* Items list - with consistent spacing */}
				<div className='space-y-2 mb-4 flex-1'>
					{area.items.map((item, itemIndex) => (
						<div key={itemIndex} className='flex items-center space-x-2'>
							<div className='w-1.5 h-1.5 bg-[#bdb9dc] rounded-full flex-shrink-0'></div>
							<span className='text-sm text-gray-600'>{item[locale]}</span>
						</div>
					))}
				</div>

				{/* Button - always at bottom */}
				<div className='mt-auto'>
					<button className='flex items-center space-x-2 text-[#bdb9dc] hover:text-[#827bb8] transition-colors duration-300 group/btn'>
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
		<section id='business' className='py-16 lg:py-24 bg-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div ref={sectionRef} className='text-center mb-16'>
					<h2 className='text-3xl lg:text-5xl font-bold text-gray-900 mb-6'>
						{t.title}
					</h2>
					<div className='max-w-4xl mx-auto'>
						<h3 className='text-lg text-gray-600 mb-8'>{t.partnerTitle}</h3>

						{/* Client Logos Section */}
						{clientLogos.length > 0 ? (
							<div className='mb-8'>
								<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center'>
									{clientLogos.map((logoPath, index) => (
										<div
											key={index}
											className='flex items-center justify-center p-4 bg-transparent rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 w-full h-20'
										>
											<Image
												src={logoPath}
												alt={`Client logo ${index + 1}`}
												width={80}
												height={40}
												className='max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300'
												unoptimized
											/>
										</div>
									))}
								</div>
							</div>
						) : (
							/* Fallback text when logos aren't available */
							<div className='mb-8'>
								<p className='text-base text-gray-600 leading-relaxed'>
									{t.description}
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Carousel with consistent card heights */}
				<div className='relative'>
					<style jsx>{`
						.business-carousel .swiper-slide {
							height: auto;
							display: flex;
						}
						.business-carousel .swiper-slide > div {
							height: 100%;
							min-height: 400px;
						}
					`}</style>
					<div className='business-carousel'>
						<Carousel items={businessAreas} renderItem={renderBusinessCard} />
					</div>
				</div>
			</div>
		</section>
	);
}
