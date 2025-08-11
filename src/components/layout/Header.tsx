'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface HeaderProps {
	locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navigation = {
		ko: {
			home: '홈',
			about: '회사소개',
			business: '사업영역',
			projects: '프로젝트',
			contact: '연락처',
		},
		en: {
			home: 'Home',
			about: 'About',
			business: 'Business Areas',
			projects: 'Projects',
			contact: 'Contact',
		},
	};

	const navItems = [
		{ key: 'home', href: '#hero' },
		{ key: 'about', href: '#about' },
		{ key: 'business', href: '#business' },
		{ key: 'projects', href: '#projects' },
		{ key: 'contact', href: '#contact' },
	];

	const toggleLanguage = () => {
		const newLocale = locale === 'ko' ? 'en' : 'ko';
		// In a real app, you'd handle routing here
		console.log('Switch to:', newLocale);
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
			}`}
		>
			<nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16 lg:h-20'>
					{/* Logo */}
					<div className='flex-shrink-0'>
						<a href='#hero' className='flex items-center'>
							<div className='text-2xl lg:text-3xl font-bold text-[#bdb9dc]'>
								GPVC
							</div>
						</a>
					</div>

					{/* Desktop Navigation */}
					<div className='hidden lg:block'>
						<div className='ml-10 flex items-baseline space-x-8'>
							{navItems.map((item) => (
								<a
									key={item.key}
									href={item.href}
									className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-[#bdb9dc] ${
										isScrolled ? 'text-gray-700' : 'text-white'
									}`}
								>
									{
										navigation[locale][
											item.key as keyof (typeof navigation)[typeof locale]
										]
									}
								</a>
							))}
						</div>
					</div>

					{/* Language Toggle & Mobile Menu Button */}
					<div className='flex items-center space-x-4'>
						<button
							onClick={toggleLanguage}
							className={`flex items-center space-x-1 px-3 py-1 rounded-full border transition-colors duration-200 ${
								isScrolled
									? 'border-gray-300 text-gray-700 hover:border-[#bdb9dc] hover:text-[#bdb9dc]'
									: 'border-white/30 text-white hover:border-[#bdb9dc] hover:text-[#bdb9dc]'
							}`}
						>
							<Globe size={16} />
							<span className='text-sm font-medium'>
								{locale.toUpperCase()}
							</span>
						</button>

						{/* Mobile menu button */}
						<div className='lg:hidden'>
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className={`p-2 rounded-md transition-colors duration-200 ${
									isScrolled
										? 'text-gray-700 hover:text-[#bdb9dc]'
										: 'text-white hover:text-[#bdb9dc]'
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
						<div className='px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg'>
							{navItems.map((item) => (
								<a
									key={item.key}
									href={item.href}
									onClick={() => setIsMenuOpen(false)}
									className='block px-3 py-2 text-gray-700 hover:text-[#bdb9dc] hover:bg-gray-50 rounded-md text-base font-medium transition-colors duration-200'
								>
									{
										navigation[locale][
											item.key as keyof (typeof navigation)[typeof locale]
										]
									}
								</a>
							))}
						</div>
					</div>
				)}
			</nav>
		</header>
	);
}
