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
						<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 items-center justify-items-center'>
							{clientLogos.map((logoPath, index) => (
								<div
									key={index}
									className='group relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32'
								>
									<Image
										src={logoPath}
										alt={`Client logo ${index + 1}`}
										fill
										className='object-contain'
										sizes='(max-width: 640px) 80px, (max-width: 768px) 96px, 112px'
										unoptimized
									/>
									{/* Optional: Subtle animation on hover */}
									<div className='absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#bdb9dc] transition-all duration-300 opacity-0 group-hover:opacity-100'></div>
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
						<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 items-center justify-items-center mt-12'>
							{Array.from({ length: 12 }).map((_, index) => (
								<div
									key={index}
									className='group relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32'
								>
									{/* Circular placeholder container */}
									<div className='w-full h-full bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center p-4 group-hover:bg-gray-50'>
										<div className='w-12 h-12 bg-gradient-to-br from-[#bdb9dc]/20 to-[#827bb8]/20 rounded-lg flex items-center justify-center'>
											<div className='w-6 h-6 bg-[#bdb9dc] rounded opacity-30'></div>
										</div>
									</div>

									{/* Optional: Subtle animation on hover */}
									<div className='absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#bdb9dc] transition-all duration-300 opacity-0 group-hover:opacity-100'></div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Additional content section */}
				{/* <div className='mt-16 text-center'>
					<div className='bg-white rounded-2xl p-8 lg:p-12 shadow-lg'>
						<h3 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-6'>
							{locale === 'ko' ? '파트너십' : 'Partnership'}
						</h3>
						<p className='text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed'>
							{locale === 'ko'
								? '우리는 다양한 지역(미국, 홍콩, 중국, 스페인, 베트남)에 걸쳐 여러 기업과 파트너십을 맺고 있습니다. 우리의 파트너십은 앞으로 전 세계적으로 확장될 것입니다.'
								: 'We have partnerships with various companies across multiple regions (USA, Hong Kong, China, Spain, Vietnam). Our partnerships will expand globally in the future.'}
						</p>
						<div className='grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12'>
							<div className='text-center'>
								<div className='text-3xl lg:text-4xl font-bold text-[#bdb9dc] mb-2'>
									5+
								</div>
								<div className='text-gray-600 font-medium'>
									{locale === 'ko' ? '국가' : 'Countries'}
								</div>
							</div>
							<div className='text-center'>
								<div className='text-3xl lg:text-4xl font-bold text-[#bdb9dc] mb-2'>
									50+
								</div>
								<div className='text-gray-600 font-medium'>
									{locale === 'ko' ? '파트너사' : 'Partners'}
								</div>
							</div>
							<div className='text-center'>
								<div className='text-3xl lg:text-4xl font-bold text-[#bdb9dc] mb-2'>
									100+
								</div>
								<div className='text-gray-600 font-medium'>
									{locale === 'ko' ? '프로젝트' : 'Projects'}
								</div>
							</div>
						</div>
					</div>
				</div> */}
			</div>

			{/* Background decoration */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-1/4 -left-20 w-40 h-40 bg-[#bdb9dc]/5 rounded-full blur-3xl'></div>
				<div className='absolute bottom-1/4 -right-20 w-32 h-32 bg-[#a8a4d0]/5 rounded-full blur-3xl'></div>
			</div>
		</section>
	);
}
