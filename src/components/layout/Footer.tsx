import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface FooterProps {
	locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
	const content = {
		ko: {
			address: '서울 강남구 언주로157길 6, 3층',
			phone: '+82-1600-1228',
			email: 'info@gp-vc.com',
			copyright: '©2025 GPVC Co.,Ltd. 모든 권리 보유.',
			privacyPolicy: '개인정보처리방침',
		},
		en: {
			address:
				'3F, 6, Eonju-ro 157-gil, Gangnam-gu, Seoul, Republic of Korea, 06024',
			phone: '+82-1600-1228',
			email: 'info@gp-vc.com',
			copyright: '©2025 GPVC Co.,Ltd. All rights reserved.',
			privacyPolicy: 'Privacy Policy',
		},
	};

	const t = content[locale];

	return (
		<footer className='bg-black text-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
					{/* Company Info */}
					<div className='col-span-1'>
						<div className='mb-4 flex gap-2'>
							<div className='w-28 h-14 relative'>
								<Image
									src='/branding/gpvc-text-logo-primary.svg'
									alt='GPVC'
									fill
									className='object-contain drop-shadow-2xl'
									sizes='80px'
								/>
							</div>
						</div>
					</div>

					{/* Contact Info */}
					<div>
						<div className='space-y-2'>
							<div className='flex items-start space-x-3'>
								<MapPin
									size={16}
									className='text-[#bdb9dc] mt-1 flex-shrink-0'
								/>
								<span className='text-gray-300 text-sm'>{t.address}</span>
							</div>
							<div className='flex items-center space-x-3'>
								<Phone size={16} className='text-[#bdb9dc] flex-shrink-0' />
								<span className='text-gray-300 text-sm'>{t.phone}</span>
							</div>
							<div className='flex items-center space-x-3'>
								<Mail size={16} className='text-[#bdb9dc] flex-shrink-0' />
								<span className='text-gray-300 text-sm'>{t.email}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className='border-t border-gray-800 mt-6 pt-6'>
					<div className='flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0'>
						<p className='text-gray-400 text-sm'>{t.copyright}</p>

						{/* Privacy Policy Link */}
						<Link
							href={`/${locale}/privacy-policy`}
							className='text-gray-400 hover:text-[#bdb9dc] transition-colors duration-200 text-sm underline'
						>
							{t.privacyPolicy}
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
