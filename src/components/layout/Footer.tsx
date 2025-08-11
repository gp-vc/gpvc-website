import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface FooterProps {
	locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
	const content = {
		ko: {
			company: 'GPVC',
			description: '혁신적인 기술로 미래를 선도하는 글로벌 기업',
			quickLinks: '빠른 링크',
			contact: '연락처',
			address: '서울특별시 강남구 테헤란로 123',
			phone: '+82-2-1234-5678',
			email: 'info@gpvc.com',
			copyright: '© 2025 GPVC. 모든 권리 보유.',
			links: {
				about: '회사소개',
				business: '사업영역',
				projects: '프로젝트',
				careers: '채용정보',
				news: '뉴스',
				privacy: '개인정보처리방침',
			},
		},
		en: {
			company: 'GPVC',
			description:
				'A global company leading the future with innovative technology',
			quickLinks: 'Quick Links',
			contact: 'Contact Info',
			address: '123 Teheran-ro, Gangnam-gu, Seoul, South Korea',
			phone: '+82-2-1234-5678',
			email: 'info@gpvc.com',
			copyright: '© 2025 GPVC. All rights reserved.',
			links: {
				about: 'About',
				business: 'Business Areas',
				projects: 'Projects',
				careers: 'Careers',
				news: 'News',
				privacy: 'Privacy Policy',
			},
		},
	};

	const t = content[locale];

	return (
		<footer className='bg-gray-900 text-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
					{/* Company Info */}
					<div className='col-span-1 lg:col-span-2'>
						<div className='mb-6'>
							<div className='text-3xl font-bold text-[#bdb9dc] mb-4'>
								{t.company}
							</div>
							<p className='text-gray-300 text-sm leading-relaxed max-w-md'>
								{t.description}
							</p>
						</div>

						{/* Contact Info */}
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

					{/* Quick Links */}
					<div>
						<h3 className='text-lg font-semibold mb-4 text-[#bdb9dc]'>
							{t.quickLinks}
						</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='#about'
									className='text-gray-300 hover:text-[#bdb9dc] transition-colors duration-200 text-sm'
								>
									{t.links.about}
								</a>
							</li>
							<li>
								<a
									href='#business'
									className='text-gray-300 hover:text-[#bdb9dc] transition-colors duration-200 text-sm'
								>
									{t.links.business}
								</a>
							</li>
							<li>
								<a
									href='#projects'
									className='text-gray-300 hover:text-[#bdb9dc] transition-colors duration-200 text-sm'
								>
									{t.links.projects}
								</a>
							</li>
							<li>
								<a
									href='#careers'
									className='text-gray-300 hover:text-[#bdb9dc] transition-colors duration-200 text-sm'
								>
									{t.links.careers}
								</a>
							</li>
						</ul>
					</div>

					{/* Additional Links */}
					<div>
						<h3 className='text-lg font-semibold mb-4 text-[#bdb9dc]'>
							&nbsp;
						</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='#news'
									className='text-gray-300 hover:text-[#bdb9dc] transition-colors duration-200 text-sm'
								>
									{t.links.news}
								</a>
							</li>
							<li>
								<a
									href='#privacy'
									className='text-gray-300 hover:text-[#bdb9dc] transition-colors duration-200 text-sm'
								>
									{t.links.privacy}
								</a>
							</li>
						</ul>
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
