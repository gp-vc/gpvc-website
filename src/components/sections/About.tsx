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
			title: 'Our Vision',
			subtitle: '컬처·아이디어·글로벌 영감을 엮어—경계를 넘어 연결합니다.',
			// subtitle2:
			// 	'당사의 강점인 미디어 & 콘텐츠 엘리베이션으로 글로벌 비즈니스를 지향합니다.',
			description1: '컬처에서 시작해 아이디어로 빚고, 세계와 나눕니다.',
			description2: '찾고. 만들고. 선보입니다.',
			// description3:
			// 	'우리는 문화와 언어를 넘나들며 관객들과 연결되는 매력적이고 의미 있는 콘텐츠를 위한 목적지가 되는',
		},
		en: {
			title: 'Our Vision',
			subtitle:
				'Blending culture, innovation, and global inspiration, creating connections that span continents.',
			// subtitle2:
			// 	'We aim to expand globally by elevating media & content and engaging with leading domestic production teams.',
			description1:
				'We discover what resonates, craft it with care, and share it widely. From screen to shelf.',
			description2:
				'We explore, we create, we showcase. For audiences everywhere.',
			// description3:
			// 	'Our team is building a destination for meaningful content that connects with audiences across cultures and languages.',
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
						{/* <p className='text-lg sm:text-xl text-white/90 leading-relaxed font-medium drop-shadow-md'>
							{t.subtitle2}
						</p> */}
					</div>
				</div>

				{/* Content - Single Column */}
				<div className='max-w-4xl mx-auto'>
					<div className='animate-on-scroll space-y-6'>
						<div>
							<p className='text-white/80 leading-relaxed drop-shadow-sm'>
								{t.description1}
							</p>
							<p className='text-white/80 leading-relaxed drop-shadow-sm'>
								{t.description2}
							</p>
							{/* {t.description3 && (
								<p className='text-white/80 leading-relaxed drop-shadow-sm'>
									{t.description3}
								</p>
							)} */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
