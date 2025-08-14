'use client';
import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
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

	return (
		<section
			id='contact'
			// ref={sectionRef}
			className='py-16 lg:py-24 bg-[#bdb9dc] relative z-10'
		>
			{/* Subtle overlay for better text readability */}
			<div className='absolute inset-0 bg-black/10'></div>

			<div className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Section Header */}
				<div className='text-center mb-16'>
					<h2 className='text-3xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg'>
						{t.title}
					</h2>
					{/* <p className='text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md'>
						{t.subtitle}
					</p> */}
				</div>

				{/* Main Content */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
					{/* Contact Form */}
					<div className='glass-dark p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl'>
						<h3 className='text-2xl font-bold text-white mb-6'>
							{locale === 'ko' ? '문의하기' : 'Get in Touch'}
						</h3>

						<form onSubmit={handleSubmit} className='space-y-6'>
							{/* Name Fields */}
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<div>
									<label
										htmlFor='firstName'
										className='block text-sm font-medium text-white/90 mb-2'
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
										className='w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc]/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/60'
										required
									/>
								</div>
								<div>
									<label
										htmlFor='lastName'
										className='block text-sm font-medium text-white/90 mb-2'
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
										className='w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc]/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/60'
										required
									/>
								</div>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-white/90 mb-2'
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
									className='w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc]/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/60'
									required
								/>
							</div>

							{/* Message */}
							<div>
								<label
									htmlFor='message'
									className='block text-sm font-medium text-white/90 mb-2'
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
									className='w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#bdb9dc] focus:border-transparent transition-all duration-200 hover:border-[#bdb9dc]/50 resize-vertical bg-white/10 backdrop-blur-sm text-white placeholder-white/60'
									required
								/>
							</div>

							{/* Submit Button */}
							<button
								type='submit'
								className='w-full bg-[#bdb9dc] hover:bg-[#a8a4d0] text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 group hover:shadow-xl hover:scale-[1.02]'
							>
								<span>{t.submit}</span>
								<Send
									size={18}
									className='group-hover:translate-x-1 transition-transform duration-200'
								/>
							</button>
						</form>
					</div>

					{/* Hero Image - Matches Form Height */}
					<div className='h-full flex'>
						{/* Bridge Image - Full Right Section */}
						<div className='w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer relative'>
							{/* Image Container with object-fit center */}
							<div className='relative w-full h-full min-h-[600px]'>
								<Image
									src='/stock-images/bridge-highway.jpeg'
									alt='Bridge Highway'
									fill
									className='object-cover object-center transition-all duration-500'
									sizes='(max-width: 1024px) 100vw, 50vw'
									priority
								/>

								{/* Monochrome overlay that disappears on hover */}
								<div className='absolute inset-0 bg-gray-500/60 group-hover:bg-transparent transition-all duration-500 backdrop-grayscale group-hover:backdrop-grayscale-0'></div>

								{/* Content overlay - Centered */}
								<div className='absolute inset-0 flex items-center justify-center p-8'>
									{/* Logo and text container - appears on hover */}
									<div className='relative opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100'>
										{/* Large centered logo with text inside */}
										<div className='w-48 h-48 lg:w-64 lg:h-64 relative mx-auto'>
											<Image
												src='/branding/gpvc-symbol-logo-white.svg'
												alt='GPVC Logo'
												fill
												className='object-contain drop-shadow-2xl'
												sizes='256px'
											/>
										</div>
									</div>
								</div>

								{/* Floating decorative elements */}
								<div className='absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm animate-float opacity-0 group-hover:opacity-100 transition-all duration-500'></div>
								<div
									className='absolute bottom-8 left-8 w-8 h-8 bg-white/15 rounded-full backdrop-blur-sm animate-float opacity-0 group-hover:opacity-100 transition-all duration-500'
									style={{ animationDelay: '1s' }}
								></div>
								<div
									className='absolute top-1/4 right-1/4 w-6 h-6 bg-white/12 rounded-full backdrop-blur-sm animate-float opacity-0 group-hover:opacity-100 transition-all duration-500'
									style={{ animationDelay: '2s' }}
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
