'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Locale } from '@/lib/i18n';
import Image from 'next/image';

interface HeaderProps {
	locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navigation = {
		ko: {
			about: '회사소개',
			business: '사업분야',
			projects: '프로젝트',
			contact: '연락처',
		},
		en: {
			about: 'Our Story',
			business: 'Industry Expertise',
			projects: 'Projects',
			contact: 'Contact Us',
		},
	};

	const navItems = [
		// { key: 'about', href: '#about' },
		{ key: 'business', href: '#business' },
		{ key: 'projects', href: '#projects' },
		{ key: 'contact', href: '#contact' },
	];

	const toggleLanguage = () => {
		if (!mounted) return;
		const newLocale = locale === 'ko' ? 'en' : 'ko';
		const currentPath = window.location.pathname.replace(`/${locale}`, '');
		window.location.href = `/${newLocale}${currentPath}`;
	};

	const handleNavClick = (href: string) => {
		setIsMenuOpen(false);
		if (typeof window !== 'undefined') {
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	// Don't render until mounted to avoid hydration issues
	if (!mounted) {
		return (
			<header className='fixed top-0 left-0 right-0 z-50 bg-transparent'>
				<nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16 lg:h-20'>
						<div className='flex-shrink-0'>
							<div className='w-20 h-10 lg:w-24 lg:h-12 relative'>
								<Image
									src='/branding/gpvc-text-logo-white.svg'
									alt='GPVC Logo'
									fill
									className='object-contain drop-shadow-lg'
									sizes='48px'
								/>
							</div>
						</div>
					</div>
				</nav>
			</header>
		);
	}

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				isScrolled
					? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-100'
					: 'bg-transparent'
			}`}
		>
			<nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16 lg:h-20'>
					{/* Logo */}
					<div className='flex-shrink-0'>
						<a href={`/${locale}`} className='flex items-center group'>
							<div className='w-20 h-10 lg:w-24 lg:h-12 relative transition-all duration-300 hover:scale-105'>
								{/* White logo for transparent background */}
								<Image
									src='/branding/gpvc-text-logo-white.svg'
									alt='GPVC Logo'
									fill
									className={`object-contain drop-shadow-lg transition-opacity duration-300 ${
										isScrolled ? 'opacity-0' : 'opacity-100'
									}`}
									sizes='48px'
								/>
								{/* Primary colored logo for scrolled state */}
								<Image
									src='/branding/gpvc-text-logo-primary.svg'
									alt='GPVC Logo'
									fill
									className={`object-contain drop-shadow-lg transition-opacity duration-300 absolute inset-0 ${
										isScrolled ? 'opacity-100' : 'opacity-0'
									}`}
									sizes='48px'
								/>
							</div>
						</a>
					</div>

					{/* Desktop Navigation */}
					<div className='hidden lg:block'>
						<div className='ml-10 flex items-baseline space-x-8'>
							{navItems.map((item) => (
								<button
									key={item.key}
									onClick={() => handleNavClick(item.href)}
									className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group ${
										isScrolled
											? 'text-gray-700 hover:text-[#bdb9dc]'
											: 'text-white hover:text-[#bdb9dc]'
									}`}
								>
									{
										navigation[locale][
											item.key as keyof (typeof navigation)[typeof locale]
										]
									}
									<span
										className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#bdb9dc] transition-all duration-300 group-hover:w-full group-hover:left-0`}
									></span>
								</button>
							))}
						</div>
					</div>

					{/* Language Toggle & Mobile Menu Button */}
					<div className='flex items-center space-x-4'>
						<button
							onClick={toggleLanguage}
							className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-300 hover:scale-105 ${
								isScrolled
									? 'border-[#bdb9dc]/30 text-gray-700 hover:border-[#bdb9dc] hover:text-[#bdb9dc] hover:bg-[#bdb9dc]/5'
									: 'border-white/30 text-white hover:border-[#bdb9dc] hover:text-[#bdb9dc] hover:bg-white/10'
							}`}
						>
							<Globe size={16} />
							<span className='text-sm font-semibold'>
								{locale.toUpperCase()}
							</span>
						</button>

						{/* Mobile menu button */}
						<div className='lg:hidden'>
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
									isScrolled
										? 'text-gray-700 hover:text-[#bdb9dc] hover:bg-[#bdb9dc]/5'
										: 'text-white hover:text-[#bdb9dc] hover:bg-white/10'
								}`}
							>
								{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className='lg:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1 bg-white/98 backdrop-blur-xl rounded-2xl mt-2 shadow-2xl border border-gray-100 animate-slide-up'>
							{navItems.map((item) => (
								<button
									key={item.key}
									onClick={() => handleNavClick(item.href)}
									className='block w-full text-left px-4 py-3 text-gray-700 hover:text-[#bdb9dc] hover:bg-[#bdb9dc]/5 rounded-xl text-base font-medium transition-all duration-200 hover:translate-x-1'
								>
									{
										navigation[locale][
											item.key as keyof (typeof navigation)[typeof locale]
										]
									}
								</button>
							))}

							{/* Mobile Language Toggle */}
							<div className='border-t border-gray-200 pt-3 mt-3'>
								<button
									onClick={toggleLanguage}
									className='flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-[#bdb9dc] hover:bg-[#bdb9dc]/5 rounded-xl w-full transition-all duration-200'
								>
									<Globe size={16} />
									<span className='text-sm font-medium'>
										{locale === 'ko' ? 'English' : '한국어'}
									</span>
								</button>
							</div>
						</div>
					</div>
				)}
			</nav>
		</header>
	);
}
