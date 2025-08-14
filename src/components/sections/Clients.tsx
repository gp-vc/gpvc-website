'use client';
import { useRef, useEffect } from 'react';
import { Locale } from '@/lib/i18n';
import Image from 'next/image';

// Static import of all logo paths
// You can add/remove logos here — must match exact file name in /public/client-logos
const clientLogos = [
	'/client-logos/shinsegae.svg',
	'/client-logos/mbc-plus.svg',
	'/client-logos/mbc-everyone.svg',
	'/client-logos/tving.svg',
	'/client-logos/wavve.svg',
	'/client-logos/shortime.svg',
	'/client-logos/pledis.svg',
	'/client-logos/yg.svg',
	'/client-logos/inkode.svg',
	'/client-logos/viu.svg',
	'/client-logos/viu-tv.svg',
	'/client-logos/dat-viet-vac.svg',
	'/client-logos/vie-on.svg',
];

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
		<section id='clients' className='py-16 lg:py-24 bg-[#ffffff]'>
			<div ref={sectionRef} className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-2xl text-[#827bb8] mb-8'>{t.title}</h2>
				</div>

				{/* Client Logos Section */}
				{clientLogos.length > 0 ? (
					<div className='mb-8'>
						<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center'>
							{clientLogos.map((logoPath, index) => (
								<div
									key={index}
									className='group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 cursor-pointer'
								>
									<Image
										src={logoPath}
										alt={`Client logo ${index + 1}`}
										fill
										className='object-contain transition-all duration-500 filter grayscale group-hover:grayscale-0 group-active:grayscale-0'
										sizes='(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px'
										unoptimized
									/>
								</div>
							))}
						</div>
					</div>
				) : (
					/* Fallback text when no logos are available */
					<div className='mb-8'>
						<div className='max-w-5xl mx-auto text-center'>
							<p className='text-base text-gray-600 leading-relaxed'>
								{t.description}
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Background decoration */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-1/4 -left-20 w-40 h-40 bg-[#bdb9dc]/5 rounded-full blur-3xl'></div>
				<div className='absolute bottom-1/4 -right-20 w-32 h-32 bg-[#a8a4d0]/5 rounded-full blur-3xl'></div>
			</div>

			{/* Custom styles for touch interactions on mobile/tablet */}
			<style jsx>{`
				@media (max-width: 1023px) {
					.group:active img,
					.group:active .filter {
						filter: grayscale(0) !important;
					}
				}
			`}</style>
		</section>
	);
}
