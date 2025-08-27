'use client';
import { useEffect, useRef } from 'react';
import { Locale } from '@/lib/i18n';
import InfiniteCarousel from '@/components/ui/InfiniteCarousel';

interface ProjectsProps {
	locale: Locale;
}

export default function Projects({ locale }: ProjectsProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	const content = {
		ko: {
			title: 'Highlights',
		},
		en: {
			title: 'Highlights',
		},
	};

	const projects = [
		{
			id: 1,
			title: { ko: '요술램프', en: 'Magic Lamp' },
			imagePath: '/project-images/project-2.jpeg',
			year: { ko: '2023년 제작', en: 'Produced 2023' },
			category: { ko: 'TV예능', en: 'Travel Reality Show' },
			platforms: {
				ko: 'MBCevery1, Tving, Wavve 방영',
				en: 'Aired on MBCevery1, Tving, Wavve',
			},
			type: 'tv-variety',
		},
		{
			id: 2,
			title: { ko: '쏘니의 경쟁', en: "Sonny's Competition" },
			imagePath: '/project-images/project-4.jpeg',
			year: {
				ko: '2024년 제작, 2025년 1월 방영',
				en: 'Produced 2024, Aired January 2025',
			},
			category: { ko: '숏폼드라마', en: 'Short-Form Drama' },
			platforms: {
				ko: 'Shortime, 숏챠 방영',
				en: 'Aired on Shortime, Shortcha',
			},
			type: 'short-drama',
		},
		{
			id: 3,
			title: { ko: '레인보우7+', en: 'Rainbow7+' },
			imagePath: '/project-images/project-5.jpeg',
			year: { ko: '2024년 제작', en: 'Produced 2024' },
			category: { ko: '모바일 웹예능', en: 'Mobile Web Variety' },
			platforms: {
				ko: 'U+모바일tv, BFLIX 방영',
				en: 'Aired on U+Mobile TV, BFLIX',
			},
			type: 'mobile-web',
		},
		{
			id: 4,
			title: {
				ko: '인피니트 이성열 팬미팅 이벤트',
				en: 'INFINITE Lee Seong Yeol Fan Meetup',
			},
			imagePath: '/project-images/project-6.jpeg',
			year: {
				ko: '2025년 7월 상해',
				en: 'July 2025 Shanghai',
			},
			category: { ko: '팬미팅 이벤트', en: 'Fan Meetup' },
			platforms: { ko: '글로벌 이벤트', en: 'Global Events' },
			type: 'fan-meetup',
		},
		{
			id: 5,
			title: { ko: '요술램프', en: 'Magic Lamp' },
			imagePath: '/project-images/project-3.jpeg',
			year: { ko: '2023년 제작', en: 'Produced 2023' },
			category: { ko: 'TV예능', en: 'Travel Reality Show' },
			platforms: {
				ko: 'MBCevery1, Tving, Wavve 방영',
				en: 'Aired on MBCevery1, Tving, Wavve',
			},
			type: 'tv-variety',
		},
		// Don't remove below, waiting for assets
		// {
		// 	id: 5,
		// 	title: { ko: 'CLNL', en: 'CLNL' },
		// 	imagePath: '/project-images/project-7.png',
		// 	year: { ko: 'Body wipes brand', en: 'Body Wipes Brand' },
		// 	category: { ko: '뷰티 브랜드', en: 'Beauty Brand' },
		// 	platforms: { ko: '한국, 미국 수출', en: 'Export to Korea, USA' },
		// 	type: 'beauty-brand',
		// },
		// {
		// 	id: 6,
		// 	title: { ko: 'Donotstare co.', en: 'Donotstare co.' },
		// 	imagePath: '/project-images/project-8.png',
		// 	year: { ko: 'Perfume Oil brand', en: 'Perfume Oil Brand' },
		// 	category: { ko: '향수 브랜드', en: 'Fragrance Brand' },
		// 	platforms: {
		// 		ko: '한국, 미국, 인도네시아 수출',
		// 		en: 'Export to Korea, USA, Indonesia',
		// 	},
		// 	type: 'perfume-brand',
		// },
		{
			id: 6,
			title: { ko: "Clos de L'obac winery", en: "Clos de L'Obac Winery" },
			imagePath: '/project-images/project-1.png',
			year: { ko: 'Spain, Priorat 지방', en: 'Spain, Priorat Region' },
			category: { ko: '와인 수입', en: 'Wine Import' },
			platforms: {
				ko: "Clos de l'Obac, Miserere, Kyrie, Usatges Blanc, Usatges Negre, L'Escarpart",
				en: "Clos de l'Obac, Miserere, Kyrie, Usatges Blanc, Usatges Negre, L'Escarpart",
			},
			type: 'wine-import',
		},
		{
			id: 7,
			title: {
				ko: '인피니트 이성열 팬미팅 이벤트',
				en: 'INFINITE Lee Seong Yeol Fan Mwwrup',
			},
			imagePath: '/project-images/project-7.jpeg',
			year: {
				ko: '2025년 8월 광저우',
				en: 'August 2025 Guangzhou',
			},
			category: { ko: '팬미팅 이벤트', en: 'Fan Meetup' },
			platforms: { ko: '글로벌 이벤트', en: 'Global Events' },
			type: 'fan-meetup',
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

	return (
		<section id='projects' className='py-16 lg:py-24 relative overflow-hidden'>
			<div className='relative z-10'>
				{/* Section Header */}
				<div
					ref={sectionRef}
					className='text-center mb-12 lg:mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
				>
					<h2 className='text-3xl lg:text-5xl font-thin text-white mb-6 drop-shadow-2xl'>
						{t.title}
					</h2>
				</div>

				{/* Single Infinite Carousel */}
				<div className='relative'>
					<InfiniteCarousel
						items={projects}
						// speed={60}
						pauseOnHover={true}
						itemWidth={240}
						itemHeight={360}
						gap={24}
						locale={locale}
						className=''
					/>
				</div>
			</div>
		</section>
	);
}
