import Image from 'next/image';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface FooterProps {
	locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
	const content = {
		ko: {
			description:
				'다양한 문화와 언어를 통해 모두에게 의미 있는 콘텐츠를 연결하는 글로벌 콘텐츠 미디어 그룹',
			address: '서울 강남구 언주로157길 6, 3층',
			phone: '+82-1600-1228',
			email: 'info@gp-vc.com',
			copyright: '© 2025 GPVC. 모든 권리 보유.',
		},
		en: {
			description:
				'Global content media group connecting meaningful content with audiences across culture and languages',
			address:
				'3F, 6, Eonju-ro 157-gil, Gangnam-gu, Seoul, Republic of Korea 06024',
			phone: '+82-1600-1228',
			email: 'info@gp-vc.com',
			copyright: '© 2025 GPVC. All rights reserved.',
		},
	};

	const t = content[locale];

	return (
		<footer className='bg-black text-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
					{/* Company Info */}
					<div className='col-span-1'>
						<div className='mb-6 flex gap-2'>
							<div className='w-12 h-12 lg:w-28 lg:h-12 relative'>
								<Image
									src='/branding/gpvc-text-logo-primary.svg'
									alt='GPVC'
									fill
									className='object-contain drop-shadow-2xl'
									sizes='256px'
								/>
							</div>
						</div>
							<p className='text-gray-300 text-sm leading-relaxed max-w-md'>
								{t.description}
							</p>
					</div>

					{/* Contact Info */}
					<div>
						<div className='space-y-3'>
							<div className='flex items-start space-x-3'>
								<MapPin
									size={18}
									className='text-[#bdb9dc] mt-1 flex-shrink-0'
								/>
								<span className='text-gray-300 text-sm'>{t.address}</span>
							</div>
							<div className='flex items-center space-x-3'>
								<Phone size={18} className='text-[#bdb9dc] flex-shrink-0' />
								<span className='text-gray-300 text-sm'>{t.phone}</span>
							</div>
							<div className='flex items-center space-x-3'>
								<Mail size={18} className='text-[#bdb9dc] flex-shrink-0' />
								<span className='text-gray-300 text-sm'>{t.email}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className='border-t border-gray-800 mt-12 pt-8'>
					<div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
						<p className='text-gray-400 text-sm'>{t.copyright}</p>

						{/* Social Links - Placeholder */}
						<div className='flex space-x-4'>
							<a
								href='#'
								className='text-gray-400 hover:text-[#bdb9dc] transition-colors duration-200'
								aria-label='Website'
							>
								<Globe size={20} />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
