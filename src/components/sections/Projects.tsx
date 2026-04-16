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
			year: { ko: '2023년 제작', en: 'Produced in 2023' },
			category: { ko: 'TV예능', en: 'Travel Reality Show' },
			platforms: {
				ko: 'MBCevery1, Tving, Wavve 방영',
				en: 'Aired on MBCevery1, Tving, Wavve',
			},
			lineup: {
				ko: '김재중, 정한(세븐틴), 디노(세븐틴), 강휘, 이주안, 준피, 최석원(TAN)',
				en: 'Kim Jaejoong, Jeonghan(SEVENTEEN), Dino(SEVENTEEN), Kang Hui, Lee Joo Ahn, Jun p, Choi Seok Won(TAN)',
			},
			type: 'tv-variety',
		},
		{
			id: 7,
			title: {
				ko: "GOT7 영재 아시아투어 콘서트 in 홍콩, 대만",
				en: "GOT7 Youngjae Asia Tour 'Fermata' in Hong Kong, Taiwan"
			},
			imagePath: '/project-images/project-10.png',
			year: {
				ko: '2025년 10월',
				en: 'October 2025'
			},
			category: { ko: '콘서트', en: 'Concert' },
			platforms: { ko: '글로벌 이벤트', en: 'Global Events' },
			type: 'concert',
		},
		{
			id: 2,
			title: { ko: '쏘니의 경쟁', en: "Sonny's Competition" },
			imagePath: '/project-images/project-4.jpeg',
			year: {
				ko: '2024년 제작, 2025년 1월 방영',
				en: 'Produced in 2024, Aired January 2025',
			},
			category: { ko: '숏폼드라마', en: 'Short-Form Drama' },
			platforms: {
				ko: 'Shortime, 숏챠, Dramabox, Kitz, Lezhin Snack 방영',
				en: 'Aired on Shortime, Shortcha, Dramabox, Kitz, Lezhin Snack',
			},
			type: 'short-drama',
		},
		{
			id: 3,
			title: { ko: '레인보우7+', en: 'Rainbow7+' },
			imagePath: '/project-images/project-5.jpeg',
			year: { ko: '2024년 제작, 싱크작업 참여', en: 'Produced in 2024. \nParticipated in the implementation of layer synchronization.' },
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
				ko: '인피니트 이성열',
				en: 'INFINITE Lee Seong Yeol',
			},
			imagePath: '/project-images/project-6.jpeg',
			year: {
				ko: '2025 상하이 팬미팅 Lightyear of Fire',
				en: '2025 Lightyear of Fire in Shanghai',
			},
			category: { ko: '팬미팅 이벤트', en: 'Fan Meetup' },
			platforms: { ko: '글로벌 이벤트', en: 'Global Events' },
			type: 'fan-meetup',
		},
		{
			id: 5,
			title: { ko: '요술램프', en: 'Magic Lamp' },
			imagePath: '/project-images/project-3.jpeg',
			year: { ko: '2023년 제작', en: 'Produced in 2023' },
			category: { ko: 'TV예능', en: 'Travel Reality Show' },
			platforms: {
				ko: 'MBCevery1, Tving, Wavve 방영',
				en: 'Aired on MBCevery1, Tving, Wavve',
			},
			lineup: {
				ko: '김재중, 정한(세븐틴), 디노(세븐틴), 강휘, 이주안, 준피, 최석원(TAN)',
				en: 'Kim Jaejoong, Jeonghan(SEVENTEEN), Dino(SEVENTEEN), Kang Hui, Lee Joo Ahn, Jun p, Choi Seok Won(TAN)',
			},
			type: 'tv-variety',
		},
		{
			id: 6,
			title: { ko: "VICTON 강승식 팬미팅", en: "VICTON Kang Seungsik" },
			imagePath: '/project-images/project-12.webp',
			year: { ko: 'Sur(fp)hase', en: 'Sur(fp)hase' },
			category: { ko: '팬미팅 이벤트', en: 'Fan Meetup' },
			platforms: {
				ko: "이벤트",
				en: "Events",
			},
			type: 'fan-meetup',
		},
		// Don't remove below, waiting for assets
		{
			id: 7,
			title: { ko: '씨엘엔엘 누보 스킨 바디 와입', en: 'CLNL Nouveau Skin Body Wipe' },
			imagePath: '/project-images/project-13.jpg',
			year: { ko: 'Body wipes', en: 'Body Wipes' },
			category: { ko: '뷰티 브랜드', en: 'Beauty Brand' },
			platforms: { ko: '홍콩, 미국 수출', en: 'Export to Hong Kong, USA' },
			type: 'beauty-brand',
		},
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
			id: 8,
			title: { ko: "Clos de L'obac Winery", en: "Clos de L'Obac Winery" },
			imagePath: '/project-images/project-1.png',
			year: { ko: 'Priorat, Spain', en: 'Priorat, Spain' },
			category: { ko: '와인 수입', en: 'Wine Import' },
			platforms: {
				ko: "Clos de l'Obac, Miserere, Kyrie, Usatges Blanc, Usatges Negre, L'Escarpart",
				en: "Clos de l'Obac, Miserere, Kyrie, Usatges Blanc, Usatges Negre, L'Escarpart",
			},
			type: 'wine-import',
		},
		{
			id: 9,
			title: {
				ko: '인피니트 이성열',
				en: 'INFINITE Lee Seong Yeol',
			},
			imagePath: '/project-images/project-7.jpeg',
			year: {
				ko: '2025 광저우 팬미팅 Sunfire Love Letter',
				en: '2025 Sunfire Love Letter in Guangzhou',
			},
			category: { ko: '팬미팅 이벤트', en: 'Fan Meetup' },
			platforms: { ko: '글로벌 이벤트', en: 'Global Events' },
			type: 'fan-meetup',
		},
		{
			id: 10,
			title: {
				ko: "Bodega El Capricho Winery", en: "Bodega El Capricho Winery"
			},
			imagePath: '/project-images/project-9.png',
			year: { ko: 'Leon, Spain', en: 'Leon, Spain'},
			category: { ko: '와인 수입', en: 'Wine Import'},
			platforms: {
				ko: "Valdecedin, El Chano, Vina de Uta",
				en: "Valdecedin, El Chano, Vina de Uta"
			},
			type: 'wine-import'
		},
		{
			id: 11,
			title: {
				ko: "포토제닉 스캔들", en: "Photogenic Scandal"
			},
			imagePath: '/project-images/project-11.png',
			year: { ko: "2025년 제작, 2025년 12월 방영", en: "Produced in 2025, Aired in December 2025" },
			category: { ko: "숏폼드라마", en: "Short-Form Drama" },
			platforms: {
				ko: "Shortime, DramaBox, ReelShort 방영",
				en: "Aired on Shortime, DramaBox, ReelShort"
			},
			type: 'short-drama'
		}
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
				<div className='relative' style={{ whiteSpace: 'pre-line' }}>
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
