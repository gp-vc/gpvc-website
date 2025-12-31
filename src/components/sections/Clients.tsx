'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { clientLogos } from '@/assets/logos';

interface ClientsProps {
	locale: Locale;
}

export default function Clients({ locale }: ClientsProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	const content = {
		ko: {
			title: '파트너사',
			description:
				"MBC Plus, MVC everyone, Tving, Waave, Shortime, Clos De L'obac, 이상엔터, Pledis, YG, Inkode, Rain Company, Viu, ViuTV, DatVietVAC, VieON, 하우스오브신세계,",
		},
		en: {
			title: 'Partners',
			description:
				"MBC Plus, MVC everyone, Tving, Waave, Shortime, Clos De L'obac, Lee Sang Entertainment, Pledis, YG, Inkode, Rain Company, Viu, ViuTV, DatVietVAC, VieON, House of Shinsegae,",
		},
	};

	const t = content[locale];

	// Intersection animation effect
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
		<section id='clients' className='py-16 lg:py-24'>
			<div ref={sectionRef} className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Section Header */}
				<div className='text-center'>
					<h2 className='text-3xl lg:text-5xl font-thin text-white mb-6 drop-shadow-2xl'>
						{t.title}
					</h2>
				</div>

				{/* Client Logos Section */}
				<div className='mb-8'>
					<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center p-8 lg:p-12'>
						{clientLogos.map((logo, index) => (
							<div
								key={index}
								className='group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 cursor-pointer'
							>
								<Image
									src={logo.src}
									alt={logo.alt}
									fill
			// 						className='object-contain transition-all duration-500 
            //    filter grayscale 
            //    brightness-[5] contrast-[0.2] 
            //    group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100'
									className='object-contain transition-all duration-500 filter grayscale group-hover:grayscale-0 group-active:grayscale-0 brightness-0 invert group-hover:brightness-100 group-hover:invert-0'
									sizes='(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px'
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Custom styles for touch interactions on mobile/tablet */}
			<style jsx>{`
				@media (max-width: 1023px) {
					.group:active img,
					.group:active .filter {
						filter: grayscale(0) brightness(100%) invert(0) !important;
					}
				}
			`}</style>
		</section>
	);
}
