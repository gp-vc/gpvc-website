'use client';
import { useEffect, useRef, useState } from 'react';
import { Locale } from '@/lib/i18n';
import Image from 'next/image';

interface ClientsProps {
	locale: Locale;
}

export default function Clients({ locale }: ClientsProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [clientLogos, setClientLogos] = useState<string[]>([]);

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

	// Function to load client logos from /public/client-logos directory
	useEffect(() => {
		const loadClientLogos = async () => {
			try {
				// List of common client logo filenames (you can expand this list)
				const possibleLogos = [
					'shinsegae',
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
					// 'rain-company',
					'viu',
					'viu-tv',
					'dat-viet-vac',
					'vie-on',
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

	return (
		<section id='clients' className='py-16 lg:py-24 bg-[#ffffff]'>
			<div ref={sectionRef} className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-2xl text-[#827bb8] mb-8'>{t.title}</h2>
				</div>

				{/* Client Logos Section */}
				{clientLogos.length > 0 ? (
					<div className='mb-8'>
						{/* Updated grid: 3 columns on mobile, more on larger screens */}
						<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center'>
							{clientLogos.map((logoPath, index) => (
								<div
									key={index}
									className='group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 cursor-pointer'
								>
									{/* Logo Image with monochrome filter */}
									<Image
										src={logoPath}
										alt={`Client logo ${index + 1}`}
										fill
										className='object-contain transition-all duration-500 filter grayscale group-hover:grayscale-0 group-active:grayscale-0'
										sizes='(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px'
										unoptimized
									/>

									{/* Removed the border hover effect as requested */}
								</div>
							))}
						</div>
					</div>
				) : (
					/* Fallback text when logos aren't available */
					<div className='mb-8'>
						<div className='max-w-5xl mx-auto text-center'>
							<p className='text-base text-gray-600 leading-relaxed'>
								{t.description}
							</p>
						</div>

						{/* Placeholder circular containers for demonstration */}
						{/* Updated grid: 3 columns on mobile, more on larger screens */}
						<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center mt-12'>
							{Array.from({ length: 12 }).map((_, index) => (
								<div
									key={index}
									className='group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 cursor-pointer'
								>
									{/* Circular placeholder container with monochrome effect */}
									<div className='w-full h-full bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 flex items-center justify-center p-3 sm:p-4 group-hover:bg-gray-50 filter grayscale group-hover:grayscale-0 group-active:grayscale-0'>
										<div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#bdb9dc]/20 to-[#827bb8]/20 rounded-lg flex items-center justify-center'>
											<div className='w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-[#bdb9dc] rounded opacity-30'></div>
										</div>
									</div>
								</div>
							))}
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
