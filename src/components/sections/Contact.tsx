'use client';
import { useEffect, useRef, useState } from 'react';
import { Send, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { Locale } from '@/lib/i18n';
import Image from 'next/image';

interface ContactProps {
	locale: Locale;
}

export default function Contact({ locale }: ContactProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
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
			address: '서울 강남구 언주로157길 6, 3층',
			viewOnMaps: '지도에서 보기',
			getDirections: '길찾기',
		},
		en: {
			title: 'Contact Us',
			subtitle: 'Get in Touch',
			firstName: 'First Name',
			lastName: 'Last Name',
			email: 'Email Address',
			message: 'Message',
			messagePlaceholder: 'Enter your question or message',
			submit: 'Submit',
			address: '157 Eonju-ro 6, Floor 3, Gangnam-gu, Seoul, South Korea',
			viewOnMaps: 'View on Maps',
			getDirections: 'Get Directions',
		},
	};

	const t = content[locale];

	// Address for Google Maps
	const address =
		'6, Eonju-ro 157-gil, Gangnam-gu, Seoul, Republic of Korea 06024';
	const encodedAddress = encodeURIComponent(address);

	// Alternative embed URL format
	const alternativeEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

	// External Google Maps links
	const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
	const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

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

	const openInMaps = () => {
		window.open(googleMapsLink, '_blank', 'noopener,noreferrer');
	};

	const openDirections = () => {
		window.open(directionsLink, '_blank', 'noopener,noreferrer');
	};

	return (
		<section id='contact' className='py-16 lg:py-24 relative z-10'>
			<div className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Section Header */}
				<div className='text-center mb-16'>
					<h2 className='text-3xl lg:text-5xl font-thin text-white mb-6 drop-shadow-2xl'>
						{t.title}
					</h2>
				</div>

				{/* Main Content */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
					{/* Contact Form */}
					<div className='bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl'>
						<h3 className='text-2xl font-thin text-white mb-6 drop-shadow'>
							{locale === 'ko' ? '문의하기' : 'Get in Touch'}
						</h3>

						<form onSubmit={handleSubmit} className='space-y-6'>
							{/* Name Fields */}
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<div>
									<label
										htmlFor='firstName'
										className='block text-sm font-medium text-white/90 mb-2 drop-shadow'
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
										className='w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc]/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/60'
										required
									/>
								</div>
								<div>
									<label
										htmlFor='lastName'
										className='block text-sm font-medium text-white/90 mb-2 drop-shadow'
									>
										{t.lastName}
									</label>
									<input
										type='text'
										id='lastName'
										name='lastName'
										value={formData.lastName}
										onChange={handleInputChange}
										placeholder='Doe'
										className='w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc]/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/60'
										required
									/>
								</div>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-white/90 mb-2 drop-shadow'
								>
									{t.email}
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}
									placeholder='you@email.com'
									className='w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc]/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/60'
									required
								/>
							</div>

							{/* Message */}
							<div>
								<label
									htmlFor='message'
									className='block text-sm font-medium text-white/90 mb-2 drop-shadow'
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
									className='w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc]/50 resize-vertical bg-white/10 backdrop-blur-sm text-white placeholder-white/60'
									required
								/>
							</div>

							{/* Submit Button */}
							<button
								type='submit'
								className='w-full bg-[#bdb9dc]/80 hover:bg-[#bdb9dc] backdrop-blur-sm text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 group hover:shadow-xl hover:scale-[1.02]'
							>
								<span>{t.submit}</span>
								<Send
									size={18}
									className='group-hover:translate-x-1 transition-transform duration-200'
								/>
							</button>
						</form>
					</div>

					{/* Google Maps Section */}
					<div className='h-full flex'>
						<div className='w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer relative'>
							{/* Google Maps iframe Container */}
							<div className='relative w-full h-full min-h-[600px]'>
								{/* Google Maps iframe */}
								<iframe
									src={alternativeEmbedUrl}
									width='100%'
									height='100%'
									style={{ border: 0, minHeight: '600px' }}
									allowFullScreen
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
									className='rounded-2xl'
									title={`Map showing ${t.address}`}
								/>

								{/* Overlay with address info and action buttons - appears on hover */}
								<div className='absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-8 text-center'>
									<div className='text-white bg-white/10 backdrop-blur-xl p-6 rounded-xl max-w-sm'>
										{/* GPVC Logo */}
										<div className='w-20 h-20 lg:w-24 lg:h-24 relative mx-auto mb-4'>
											<Image
												src='/branding/gpvc-symbol-logo-white.svg'
												alt='GPVC Logo'
												fill
												className='object-contain drop-shadow-2xl'
												sizes='96px'
											/>
										</div>

										{/* Address Information */}
										<div className='space-y-4'>
											<div className='flex items-center justify-center space-x-2 text-[#bdb9dc]'>
												<MapPin size={18} />
												<span className='font-semibold drop-shadow'>
													Office Location
												</span>
											</div>
											<p className='text-white/90 text-sm leading-relaxed drop-shadow'>
												{t.address}
											</p>

											{/* Action Buttons */}
											<div className='flex flex-col space-y-3 mt-6'>
												<button
													onClick={openInMaps}
													className='flex items-center justify-center space-x-2 bg-[#bdb9dc]/20 hover:bg-[#bdb9dc]/30 text-white py-2 px-4 rounded-lg transition-colors duration-300 backdrop-blur-sm'
												>
													<ExternalLink size={16} />
													<span className='text-sm font-medium'>
														{t.viewOnMaps}
													</span>
												</button>
												<button
													onClick={openDirections}
													className='flex items-center justify-center space-x-2 bg-[#a8a4d0]/20 hover:bg-[#a8a4d0]/30 text-white py-2 px-4 rounded-lg transition-colors duration-300 backdrop-blur-sm'
												>
													<Navigation size={16} />
													<span className='text-sm font-medium'>
														{t.getDirections}
													</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
