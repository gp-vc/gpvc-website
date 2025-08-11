'use client';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Locale } from '@/lib/i18n';
import Carousel from '@/components/ui/Carousel';

interface BusinessAreasProps {
	locale: Locale;
}

export default function BusinessAreas({ locale }: BusinessAreasProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	const content = {
		ko: {
			title: '사업영역',
			subtitle: '다양한 분야에서 혁신적인 솔루션을 제공합니다',
			description:
				'GPVC는 첨단 기술과 전문성을 바탕으로 고객의 비즈니스 성공을 지원하는 통합 솔루션을 제공합니다.',
			learnMore: '자세히 보기',
		},
		en: {
			title: 'Business Areas',
			subtitle: 'Providing innovative solutions across various fields',
			description:
				'GPVC provides integrated solutions that support customer business success based on advanced technology and expertise.',
			learnMore: 'Learn More',
		},
	};

	const businessAreas = [
		{
			id: 1,
			title: { ko: 'AI & 머신러닝', en: 'AI & Machine Learning' },
			description: {
				ko: '인공지능과 머신러닝 기술을 활용한 혁신적인 솔루션',
				en: 'Innovative solutions using AI and machine learning technology',
			},
			image: '/placeholder-ai.png', // Replace with actual image path
			color: '#bdb9dc',
		},
		{
			id: 2,
			title: { ko: '클라우드 컴퓨팅', en: 'Cloud Computing' },
			description: {
				ko: '안전하고 확장 가능한 클라우드 인프라 구축',
				en: 'Building secure and scalable cloud infrastructure',
			},
			image: '/placeholder-cloud.png',
			color: '#a8a4d0',
		},
		{
			id: 3,
			title: { ko: 'IoT 솔루션', en: 'IoT Solutions' },
			description: {
				ko: '사물인터넷을 통한 스마트 환경 구축',
				en: 'Building smart environments through IoT',
			},
			image: '/placeholder-iot.png',
			color: '#9590c4',
		},
		{
			id: 4,
			title: { ko: '블록체인', en: 'Blockchain' },
			description: {
				ko: '분산 원장 기술 기반의 보안 솔루션',
				en: 'Security solutions based on distributed ledger technology',
			},
			image: '/placeholder-blockchain.png',
			color: '#827bb8',
		},
		{
			id: 5,
			title: { ko: '사이버보안', en: 'Cybersecurity' },
			description: {
				ko: '포괄적인 보안 솔루션과 위험 관리',
				en: 'Comprehensive security solutions and risk management',
			},
			image: '/placeholder-security.png',
			color: '#6f67ac',
		},
		{
			id: 6,
			title: { ko: '데이터 분석', en: 'Data Analytics' },
			description: {
				ko: '빅데이터 분석을 통한 인사이트 제공',
				en: 'Providing insights through big data analysis',
			},
			image: '/placeholder-data.png',
			color: '#5c52a0',
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

	const renderBusinessCard = (
		area: (typeof businessAreas)[0],
		index: number
	) => (
		<div
			key={area.id}
			className='group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
		>
			{/* Image Placeholder */}
			<div
				className='h-48 bg-gradient-to-br from-[#bdb9dc] to-[#9590c4] relative overflow-hidden'
				style={{ backgroundColor: area.color }}
			>
				<div className='absolute inset-0 bg-black/10'></div>
				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center'>
						<div className='w-8 h-8 bg-white/40 rounded-full'></div>
					</div>
				</div>
				{/* Hover overlay */}
				<div className='absolute inset-0 bg-[#bdb9dc]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
			</div>

			{/* Content */}
			<div className='p-6'>
				<h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-[#bdb9dc] transition-colors duration-300'>
					{area.title[locale]}
				</h3>
				<p className='text-gray-600 text-sm leading-relaxed mb-4'>
					{area.description[locale]}
				</p>

				<button className='flex items-center space-x-2 text-[#bdb9dc] hover:text-[#9590c4] transition-colors duration-300 group/btn'>
					<span className='text-sm font-medium'>{t.learnMore}</span>
					<ArrowRight
						size={16}
						className='group-hover/btn:translate-x-1 transition-transform duration-300'
					/>
				</button>
			</div>

			{/* Card number */}
			<div className='absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
				<span className='text-white text-sm font-bold'>{area.id}</span>
			</div>
		</div>
	);

	return (
		<section id='business' className='py-16 lg:py-24 bg-gray-50'>
			<div className=''>
				<div ref={sectionRef} className='text-center mb-16'>
					<h2 className='text-3xl lg:text-5xl font-bold text-gray-900 mb-6'>
						{t.title}
					</h2>
					<p className='text-xl text-[#bdb9dc] mb-4 font-medium'>
						{t.subtitle}
					</p>
					<p className='text-gray-600 max-w-3xl mx-auto leading-relaxed'>
						{t.description}
					</p>
				</div>

				{/* Carousel */}
				<div className='relative'>
					<Carousel items={businessAreas} renderItem={renderBusinessCard} />
				</div>

				{/* Background decoration */}
				{/* <div className='absolute inset-0 overflow-hidden pointer-events-none'>
					<div className='absolute -top-10 -right-10 w-40 h-40 bg-[#bdb9dc]/5 rounded-full'></div>
					<div className='absolute -bottom-10 -left-10 w-32 h-32 bg-[#bdb9dc]/5 rounded-full'></div>
				</div> */}
			</div>
		</section>
	);
}
