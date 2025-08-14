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
			title: '프로젝트',
		},
		en: {
			title: 'Projects',
		},
	};

	const projects = [
		{
			id: 1,
			title: { ko: "Clos de L'Obac 와이너리", en: "Clos de L'Obac Winery" },
			imagePath: '/project-images/project-1.png',
			description: {
				ko: '스페인 프리오라토 지역의 프리미엄 와이너리 브랜딩 및 글로벌 마케팅',
				en: 'Premium winery branding and global marketing from Priorat region, Spain',
			},
			category: {
				ko: '와인 / 브랜드 / 유통',
				en: 'Wine / Brand / Distribution',
			},
			duration: '12개월',
			teamSize: '15명',
			type: 'wine',
		},
		{
			id: 2,
			title: { ko: '요술램프', en: 'Magic Lamp' },
			imagePath: '/project-images/project-2.jpeg',
			description: {
				ko: '환상적인 시각적 스토리텔링과 마케팅 캠페인',
				en: 'Fantastic visual storytelling and marketing campaign',
			},
			category: {
				ko: '마케팅 / 광고 / 브랜딩',
				en: 'Marketing / Advertising / Branding',
			},
			duration: '8개월',
			teamSize: '10명',
			type: 'poster',
		},
		{
			id: 3,
			title: { ko: '요술램프', en: 'Magic Lamp' },
			imagePath: '/project-images/project-3.jpeg',
			description: {
				ko: '창의적인 콘텐츠 제작과 브랜드 아이덴티티 구축',
				en: 'Creative content production and brand identity development',
			},
			category: {
				ko: '콘텐츠 / 제작 / 기획',
				en: 'Content / Production / Planning',
			},
			duration: '8개월',
			teamSize: '10명',
			type: 'poster',
		},
		{
			id: 4,
			title: {
				ko: '숏폼드라마 쏘니의 경쟁',
				en: "Short Drama Sonny's Competition",
			},
			imagePath: '/project-images/project-4.jpeg',
			description: {
				ko: '글로벌 숏폼 드라마 시리즈 제작 및 다국가 배급',
				en: 'Global short-form drama series production and multi-country distribution',
			},
			category: {
				ko: '드라마 / 제작 / 유통',
				en: 'Drama / Production / Distribution',
			},
			duration: '6개월',
			teamSize: '8명',
			type: 'drama',
		},
		{
			id: 5,
			title: { ko: '웹 예능 레인보우7+', en: 'Web Reality Rainbow7+' },
			imagePath: '/project-images/project-5.jpeg',
			description: {
				ko: '인터랙티브 웹 예능 프로그램 기획 및 제작',
				en: 'Interactive web reality program planning and production',
			},
			category: {
				ko: '예능 / 웹 콘텐츠 / 스트리밍',
				en: 'Variety / Web Content / Streaming',
			},
			duration: '10개월',
			teamSize: '12명',
			type: 'web',
		},
		{
			id: 6,
			title: {
				ko: '인피니트 아성열 중국 Fan meeting',
				en: 'Infinite Lee Seong Yeol China Fan Meeting',
			},
			imagePath: '/project-images/project-6.jpeg',
			description: {
				ko: '글로벌 팬미팅 이벤트 기획, 진행 및 라이브 스트리밍',
				en: 'Global fan meeting event planning, execution and live streaming',
			},
			category: {
				ko: '이벤트 / 팬미팅 / 글로벌',
				en: 'Event / Fan Meeting / Global',
			},
			duration: '15개월',
			teamSize: '20명',
			type: 'event',
		},
		{
			id: 7,
			title: {
				ko: '뷰티 브랜드 콜라보레이션',
				en: 'Beauty Brand Collaboration',
			},
			imagePath: '/project-images/project-7.jpeg',
			description: {
				ko: '프리미엄 뷰티 브랜드 런칭 및 마케팅 전략',
				en: 'Premium beauty brand launch and marketing strategy',
			},
			category: {
				ko: '뷰티 / 브랜드 / 마케팅',
				en: 'Beauty / Brand / Marketing',
			},
			duration: '12개월',
			teamSize: '15명',
			type: 'cosmetics',
		},
		{
			id: 8,
			title: {
				ko: 'CLNL Body wipes, DNS Perfume Oil, Mas Den Bruno',
				en: 'CLNL Body wipes, DNS Perfume Oil, Mas Den Bruno',
			},
			imagePath: '/project-images/project-8.png',
			description: {
				ko: '프리미엄 바디케어 제품 라인 개발 및 브랜딩',
				en: 'Premium body care product line development and branding',
			},
			category: {
				ko: '바디케어 / 제품 개발 / 브랜딩',
				en: 'Body Care / Product Development / Branding',
			},
			duration: '12개월',
			teamSize: '15명',
			type: 'cosmetics',
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
		<section
			id='projects'
			className='py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden'
		>
			{/* Background decoration */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-1/4 -left-20 w-40 h-40 bg-[#bdb9dc]/5 rounded-full blur-3xl'></div>
				<div className='absolute bottom-1/4 -right-20 w-32 h-32 bg-[#a8a4d0]/5 rounded-full blur-3xl'></div>
			</div>

			<div className='relative z-10'>
				{/* Section Header */}
				<div
					ref={sectionRef}
					className='text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
				>
					<h2 className='text-3xl lg:text-5xl font-bold text-gray-900 mb-6'>
						{t.title}
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-[#bdb9dc] to-[#a8a4d0] mx-auto rounded-full'></div>
				</div>

				{/* Single Infinite Carousel */}
				<div className='relative'>
					<InfiniteCarousel
						items={projects}
						speed={40} // Adjust speed as needed (lower = faster)
						// direction='left'
						pauseOnHover={true}
						itemWidth={240} // Portrait width
						itemHeight={360} // Portrait height (3:2 aspect ratio)
						gap={24}
						locale={locale}
						className='py-8'
					/>
				</div>
			</div>
		</section>
	);
}
