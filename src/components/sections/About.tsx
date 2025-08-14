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
				'GPVC는 콘텐츠 제작/투자/유통을 하고 있으며, 국내 유수의 제작진과 비즈니스를 활동 범위를 넓혀,',
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
				'GPVC specializes in content production, investment and distribution with an emphasis on culture.',
			subtitle2:
				'We aim to expand globally by elevating media & content and engaging with leading domestic production teams.',
			description1:
				'We have partnerships with various companies across multiple regions (USA, Hong Kong, China, Spain, Vietnam).',
			description2: '',
			description3:
				'Our team is building a destination for meaningful content that connects with audiences across cultures and languages.',
			description4: '',
			mission:
				'Our team is building a destination for meaningful content that connects with audiences across cultures and languages.',
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
			className='py-16 lg:py-24 bg-transparent relative overflow-hidden'
		>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='animate-on-scroll text-left mb-16'>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-thin text-white mb-8 drop-shadow-lg'>
						{t.title}
					</h2>

					<div className='max-w-5xl mx-auto'>
						<p className='text-lg sm:text-xl text-white/90 leading-relaxed font-medium drop-shadow-md'>
							{t.subtitle}
						</p>
						<p className='text-lg sm:text-xl text-white/90 leading-relaxed font-medium drop-shadow-md'>
							{t.subtitle2}
						</p>
					</div>
				</div>

				{/* Content - Single Column */}
				<div className='max-w-4xl mx-auto'>
					<div className='animate-on-scroll space-y-6'>
						<div>
							<p className='text-white/80 leading-relaxed drop-shadow-sm'>{t.description1}</p>
							<p className='text-white/80 leading-relaxed drop-shadow-sm'>{t.description2}</p>
							<p className='text-white/80 leading-relaxed drop-shadow-sm'>{t.description3}</p>
							{t.description4 && (
								<p className='text-white/80 leading-relaxed drop-shadow-sm'>
									{t.description4}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
