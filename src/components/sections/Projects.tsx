'use client';
import { useEffect, useRef } from 'react';
import { Calendar, Users, ExternalLink, Play } from 'lucide-react';
import { Locale } from '@/lib/i18n';
import Carousel from '@/components/ui/Carousel';

interface ProjectsProps {
	locale: Locale;
}

export default function Projects({ locale }: ProjectsProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	const content = {
		ko: {
			title: 'Projects',
			subtitle: 'Infinite Autoplay Carousel with items',
			description:
				'돌아가는 그림들 Mouseover시 설명이나 텍스트 또 켰음. No Mouseover → monochrome, Mouseover → real color',
			viewProject: '프로젝트 보기',
			duration: '기간',
			teamSize: '팀 규모',
			status: {
				completed: '완료',
				ongoing: '진행중',
				planning: '기획중',
			},
		},
		en: {
			title: 'Projects',
			subtitle: 'Infinite Autoplay Carousel with items',
			description:
				'Rotating images with descriptions or text on mouseover. No Mouseover → monochrome, Mouseover → real color',
			viewProject: 'View Project',
			duration: 'Duration',
			teamSize: 'Team Size',
			status: {
				completed: 'Completed',
				ongoing: 'Ongoing',
				planning: 'Planning',
			},
		},
	};

	const projects = [
		{
			id: 1,
			title: { ko: "Clos de L'Obac Wine", en: "Clos de L'Obac Wine" },
			description: {
				ko: '설명',
				en: 'Description',
			},
			category: {
				ko: '불수있는곳 / 홈페이지 / Etc',
				en: 'Available places / Homepage / Etc',
			},
			duration: '12개월',
			teamSize: '15명',
			status: 'completed',
			image: '/placeholder-wine.jpg',
			type: 'wine',
		},
		{
			id: 2,
			title: { ko: '요술램프 포스터(2개)', en: 'Magic Lamp Poster (2pcs)' },
			description: {
				ko: '설명',
				en: 'Description',
			},
			category: {
				ko: '불수있는곳 / 홈페이지 / Etc',
				en: 'Available places / Homepage / Etc',
			},
			duration: '8개월',
			teamSize: '10명',
			status: 'ongoing',
			image: '/placeholder-poster.jpg',
			type: 'poster',
		},
		{
			id: 3,
			title: {
				ko: '숏폼드라마 썸네일 경쟁',
				en: 'Short Drama Thumbnail Competition',
			},
			description: {
				ko: '설명',
				en: 'Description',
			},
			category: {
				ko: '불수있는곳 / 홈페이지 / Etc',
				en: 'Available places / Homepage / Etc',
			},
			duration: '6개월',
			teamSize: '8명',
			status: 'completed',
			image: '/placeholder-drama.jpg',
			type: 'drama',
		},
		{
			id: 4,
			title: { ko: '웹 에돌 레인보우무+', en: 'Web Episode Rainbow Mu+' },
			description: {
				ko: '설명',
				en: 'Description',
			},
			category: {
				ko: '불수있는곳 / 홈페이지 / Etc',
				en: 'Available places / Homepage / Etc',
			},
			duration: '10개월',
			teamSize: '12명',
			status: 'ongoing',
			image: '/placeholder-web.jpg',
			type: 'web',
		},
		{
			id: 5,
			title: {
				ko: '인피니트 아성열 중국 Fan meeting1,2',
				en: 'Infinite Lee Seong Yeol China Fan Meeting 1,2',
			},
			description: {
				ko: '설명',
				en: 'Description',
			},
			category: {
				ko: '불수있는곳 / 홈페이지 / Etc',
				en: 'Available places / Homepage / Etc',
			},
			duration: '15개월',
			teamSize: '20명',
			status: 'completed',
			image: '/placeholder-fanmeeting.jpg',
			type: 'event',
		},
		{
			id: 6,
			title: {
				ko: 'CLNL Body wipes, DNS Perfume Oil, Mas Den Bruno',
				en: 'CLNL Body wipes, DNS Perfume Oil, Mas Den Bruno',
			},
			description: {
				ko: '설명',
				en: 'Description',
			},
			category: {
				ko: '불수있는곳 / 홈페이지 / Etc',
				en: 'Available places / Homepage / Etc',
			},
			duration: '12개월',
			teamSize: '15명',
			status: 'planning',
			image: '/placeholder-cosmetics.jpg',
			type: 'cosmetics',
		},
	];

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

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed':
				return 'bg-green-100 text-green-800';
			case 'ongoing':
				return 'bg-blue-100 text-blue-800';
			case 'planning':
				return 'bg-yellow-100 text-yellow-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const renderProjectCard = (project: (typeof projects)[0], index: number) => (
		<div
			key={project.id}
			className='group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'
		>
			{/* Image with monochrome effect */}
			<div className='h-64 relative overflow-hidden'>
				{/* Project-specific styling based on type */}
				<div
					className={`absolute inset-0 transition-all duration-500 ${
						project.type === 'wine'
							? 'bg-gradient-to-br from-amber-200 to-red-300'
							: project.type === 'poster'
							? 'bg-gradient-to-br from-blue-200 to-purple-300'
							: project.type === 'drama'
							? 'bg-gradient-to-br from-pink-200 to-purple-300'
							: project.type === 'event'
							? 'bg-gradient-to-br from-green-200 to-blue-300'
							: project.type === 'cosmetics'
							? 'bg-gradient-to-br from-purple-200 to-pink-300'
							: 'bg-gradient-to-br from-gray-200 to-gray-400'
					} group-hover:from-[#bdb9dc] group-hover:to-[#827bb8]`}
				>
					{/* Content based on project type */}
					<div className='absolute inset-0 flex items-center justify-center'>
						{project.type === 'wine' && (
							<div className='relative'>
								<div className='w-12 h-24 bg-white/30 rounded-b-full mx-auto mb-2'></div>
								<div className='w-20 h-8 bg-white/20 rounded-lg mx-auto'></div>
								<div className='absolute top-4 right-0 w-4 h-4 bg-white/25 rounded-full'></div>
								<div className='absolute bottom-0 left-1 w-3 h-3 bg-white/25 rounded-full'></div>
							</div>
						)}
						{project.type === 'poster' && (
							<div className='text-center'>
								<div className='w-16 h-20 bg-white/30 rounded-lg mx-auto mb-2'></div>
								<div className='w-12 h-12 bg-white/20 rounded-lg mx-auto'></div>
							</div>
						)}
						{project.type === 'drama' && (
							<div className='flex space-x-2'>
								<div className='w-12 h-16 bg-white/30 rounded-lg'></div>
								<div className='w-12 h-16 bg-white/25 rounded-lg'></div>
							</div>
						)}
						{project.type === 'event' && (
							<div className='text-center'>
								<div className='w-20 h-20 bg-white/30 rounded-full mx-auto mb-2 flex items-center justify-center'>
									<Play size={24} className='text-white/60' />
								</div>
								<div className='flex space-x-1 justify-center'>
									<div className='w-3 h-3 bg-white/25 rounded-full'></div>
									<div className='w-3 h-3 bg-white/25 rounded-full'></div>
									<div className='w-3 h-3 bg-white/25 rounded-full'></div>
								</div>
							</div>
						)}
						{project.type === 'cosmetics' && (
							<div className='flex space-x-3'>
								<div className='w-8 h-16 bg-white/30 rounded-full'></div>
								<div className='w-10 h-12 bg-white/25 rounded-lg'></div>
								<div className='w-6 h-14 bg-white/20 rounded-full'></div>
							</div>
						)}
						{project.type === 'web' && (
							<div className='grid grid-cols-2 gap-2'>
								<div className='w-12 h-8 bg-white/30 rounded'></div>
								<div className='w-12 h-8 bg-white/25 rounded'></div>
								<div className='w-12 h-8 bg-white/20 rounded'></div>
								<div className='w-12 h-8 bg-white/25 rounded'></div>
							</div>
						)}
					</div>
				</div>

				{/* Monochrome overlay that disappears on hover */}
				<div className='absolute inset-0 bg-gray-500/60 group-hover:bg-transparent transition-all duration-500 backdrop-grayscale group-hover:backdrop-grayscale-0'></div>

				{/* Status badge */}
				<div className='absolute top-4 left-4'>
					<span
						className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
							project.status
						)}`}
					>
						{t.status[project.status as keyof typeof t.status]}
					</span>
				</div>

				{/* Project number */}
				<div className='absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
					<span className='text-white text-sm font-bold'>{project.id}</span>
				</div>

				{/* Hover overlay with description */}
				<div className='absolute inset-0 bg-[#bdb9dc]/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center'>
					<div className='text-center text-white p-6'>
						<h4 className='text-lg font-bold mb-2'>{project.title[locale]}</h4>
						<p className='text-white/90 text-sm mb-4'>
							{project.description[locale]}
						</p>
						<div className='flex items-center justify-center space-x-4 text-xs'>
							<div className='flex items-center space-x-1'>
								<Calendar size={12} />
								<span>{project.duration}</span>
							</div>
							<div className='flex items-center space-x-1'>
								<Users size={12} />
								<span>{project.teamSize}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className='p-6'>
				<h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-[#bdb9dc] transition-colors duration-300 line-clamp-2'>
					{project.title[locale]}
				</h3>

				<p className='text-sm text-[#bdb9dc] font-medium mb-3'>
					{project.category[locale]}
				</p>

				<p className='text-gray-600 text-sm leading-relaxed mb-4'>
					{project.description[locale]}
				</p>

				<button className='flex items-center space-x-2 text-[#bdb9dc] hover:text-[#827bb8] transition-colors duration-300 group/btn'>
					<span className='text-sm font-medium'>{t.viewProject}</span>
					<ExternalLink
						size={16}
						className='group-hover/btn:translate-x-1 transition-transform duration-300'
					/>
				</button>
			</div>
		</div>
	);

	return (
		<section id='projects' className='py-16 lg:py-24 bg-white relative'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div ref={sectionRef} className='text-center mb-16'>
					<h2 className='text-3xl lg:text-5xl font-bold text-gray-900 mb-6'>
						{t.title}
					</h2>
					<p className='text-xl text-[#bdb9dc] mb-4 font-medium'>
						{t.subtitle}
					</p>
					<p className='text-gray-600 max-w-3xl mx-auto leading-relaxed'>
						{t.description}
					</p>
				</div>

				{/* Carousel */}
				<div className='relative'>
					<Carousel items={projects} renderItem={renderProjectCard} />
				</div>

				{/* Clients/Partners Section */}
				<div className='mt-20'>
					<h3 className='text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8'>
						Clients / Partners
					</h3>
					<div className='text-center'>
						<p className='text-lg text-gray-600 mb-4'>
							{locale === 'ko'
								? '파트너사를 로고만 들어갈 부분'
								: 'Partners logo section will be here'}
						</p>
						<p className='text-gray-600 leading-relaxed max-w-5xl mx-auto'>
							MBC Plus, MVC everyone, Tving, Waave, Shortime, Clos De L&apos;obac,
							이상엔터, Pledis, YG, Inkode, Rain Company, Viu, ViuTV,
							DatVietVAC, VieON, 하우스오브신세계,
						</p>
					</div>
				</div>

				{/* Background decoration */}
				<div className='absolute inset-0 overflow-hidden pointer-events-none'>
					<div className='absolute top-20 left-10 w-32 h-32 bg-[#bdb9dc]/5 rounded-full'></div>
					<div className='absolute bottom-20 right-10 w-24 h-24 bg-[#bdb9dc]/5 rounded-full'></div>
					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#bdb9dc]/3 rounded-full blur-3xl'></div>
				</div>
			</div>
		</section>
	);
}
