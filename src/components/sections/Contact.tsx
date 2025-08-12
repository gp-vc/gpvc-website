'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface ContactProps {
	locale: Locale;
}

export default function Contact({ locale }: ContactProps) {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		message: '',
	});

	const content = {
		ko: {
			title: 'Contact Us',
			subtitle: '연락처',
			firstName: '이름',
			lastName: '성',
			email: '이메일 주소',
			message: '메시지',
			messagePlaceholder: '질문이나 메시지를 입력하세요',
			submit: 'Submit',
			company: 'GPVC Co.,Ltd.',
			address: '서울 강남구 언주로157길 6',
			phone: '+82-2-1234-5678',
			emailAddress: 'info@gpvc.com',
			copyright: '© 2025 GPVC Co.,Ltd. All rights reserved.',
		},
		en: {
			title: 'Contact Us',
			subtitle: 'Contact Information',
			firstName: 'First Name',
			lastName: 'Last Name',
			email: 'Email Address',
			message: 'Message',
			messagePlaceholder: 'Enter your question or message',
			submit: 'Submit',
			company: 'GPVC Co.,Ltd.',
			address: '157 Eonju-ro 6, Gangnam-gu, Seoul, South Korea',
			phone: '+82-2-1234-5678',
			emailAddress: 'info@gpvc.com',
			copyright: '© 2025 GPVC Co.,Ltd. All rights reserved.',
		},
	};

	const t = content[locale];

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
	};

	return (
		<section
			id='contact'
			className='py-16 lg:py-24 bg-white relative z-10'
			style={{ backgroundColor: '#ffffff' }}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Section Header */}
				<div className='text-center mb-16'>
					<h2 className='text-3xl lg:text-5xl font-bold text-gray-900 mb-6'>
						{t.title}
					</h2>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{t.subtitle}
					</p>
				</div>

				{/* Main Content */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
					{/* Contact Form */}
					<div className='bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
						<h3 className='text-2xl font-bold text-gray-900 mb-6'>
							{locale === 'ko' ? '문의하기' : 'Get in Touch'}
						</h3>

						<form onSubmit={handleSubmit} className='space-y-6'>
							{/* Name Fields */}
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<div>
									<label
										htmlFor='firstName'
										className='block text-sm font-medium text-gray-700 mb-2'
									>
										{t.firstName}
									</label>
									<input
										type='text'
										id='firstName'
										name='firstName'
										value={formData.firstName}
										onChange={handleInputChange}
										placeholder='Jane'
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc] bg-white text-gray-900'
										required
									/>
								</div>
								<div>
									<label
										htmlFor='lastName'
										className='block text-sm font-medium text-gray-700 mb-2'
									>
										{t.lastName}
									</label>
									<input
										type='text'
										id='lastName'
										name='lastName'
										value={formData.lastName}
										onChange={handleInputChange}
										placeholder='Smitherton'
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc] bg-white text-gray-900'
										required
									/>
								</div>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-gray-700 mb-2'
								>
									{t.email}
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}
									placeholder='email@janesfakedomain.net'
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc] bg-white text-gray-900'
									required
								/>
							</div>

							{/* Message */}
							<div>
								<label
									htmlFor='message'
									className='block text-sm font-medium text-gray-700 mb-2'
								>
									{t.message}
								</label>
								<textarea
									id='message'
									name='message'
									rows={6}
									value={formData.message}
									onChange={handleInputChange}
									placeholder={t.messagePlaceholder}
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc] resize-vertical bg-white text-gray-900'
									required
								/>
							</div>

							{/* Submit Button */}
							<button
								type='submit'
								className='w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2 group'
							>
								<span>{t.submit}</span>
								<Send
									size={18}
									className='group-hover:translate-x-1 transition-transform duration-200'
								/>
							</button>
						</form>
					</div>

					{/* Contact Info & Image */}
					<div className='space-y-8'>
						{/* Hero Image */}
						<div className='aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl'>
							<div className='w-full h-full bg-gradient-to-br from-[#bdb9dc] to-[#827bb8] relative'>
								{/* Content overlay */}
								<div className='absolute inset-0 flex items-end justify-start p-8'>
									<div className='text-white'>
										<h3 className='text-2xl font-bold mb-2'>Connect With Us</h3>
										<p className='text-white/80'>
											{locale === 'ko'
												? '글로벌 파트너십을 구축해나가겠습니다'
												: 'Building global partnerships'}
										</p>
									</div>
								</div>

								{/* Abstract bridge/architecture elements */}
								<div className='absolute top-1/4 right-1/4 w-32 h-2 bg-white/20 rounded-full transform rotate-12'></div>
								<div className='absolute top-1/3 right-1/3 w-24 h-2 bg-white/15 rounded-full transform rotate-12'></div>
								<div className='absolute bottom-1/3 left-1/4 w-40 h-1 bg-white/10 rounded-full transform -rotate-12'></div>
							</div>
						</div>

						{/* Contact Information */}
						<div className='bg-gray-50 rounded-2xl p-8'>
							<h3 className='text-xl font-bold text-gray-900 mb-6'>
								{t.company}
							</h3>

							<div className='space-y-4'>
								<div className='flex items-start space-x-3'>
									<MapPin
										size={20}
										className='text-[#bdb9dc] mt-1 flex-shrink-0'
									/>
									<span className='text-gray-600 text-sm leading-relaxed'>
										{t.address}
									</span>
								</div>

								<div className='flex items-center space-x-3'>
									<Phone size={20} className='text-[#bdb9dc] flex-shrink-0' />
									<span className='text-gray-600 text-sm'>{t.phone}</span>
								</div>

								<div className='flex items-center space-x-3'>
									<Mail size={20} className='text-[#bdb9dc] flex-shrink-0' />
									<span className='text-gray-600 text-sm'>
										{t.emailAddress}
									</span>
								</div>
							</div>

							{/* Footer Info Grid */}
							<div className='mt-8 pt-6 border-t border-gray-200'>
								<div className='grid grid-cols-3 gap-4 text-center text-sm'>
									<div>
										<div className='font-medium text-gray-700 mb-1'>
											{locale === 'ko' ? '주소' : 'Address'}
										</div>
										<div className='text-gray-500'>
											{locale === 'ko' ? '페이지' : 'Page'}
										</div>
									</div>
									<div>
										<div className='font-medium text-gray-700 mb-1'>
											{locale === 'ko' ? '주소' : 'Address'}
										</div>
										<div className='text-gray-500'>
											{locale === 'ko' ? '페이지' : 'Page'}
										</div>
									</div>
									<div>
										<div className='font-medium text-gray-700 mb-1'>
											{locale === 'ko' ? '주소' : 'Address'}
										</div>
										<div className='text-gray-500'>
											{locale === 'ko' ? '페이지' : 'Page'}
										</div>
									</div>
								</div>

								<div className='mt-6 pt-4 border-t border-gray-200 text-center'>
									<p className='text-xs text-gray-500'>{t.copyright}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
