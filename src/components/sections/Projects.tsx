'use client';
import { useEffect, useRef } from 'react';
import { Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import Carousel from '@/components/ui/Carousel';

interface ProjectsProps {
	locale: Locale;
}

export default function Projects({ locale }: ProjectsProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	const content = {
		ko: {
			title: '프로젝트',
			duration: '기간',
			teamSize: '팀 규모',
		},
		en: {
			title: 'Projects',
			duration: 'Duration',
			teamSize: 'Team Size',
		},
	};

	const projects = [
		{
			id: 1,
			title: { ko: "Clos de L'Obac Wine", en: "Clos de L'Obac Wine" },
			imagePath: '/project-images/project-1.png',
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
			type: 'wine',
		},
		{
			id: 2,
			title: { ko: '요술램프 포스터(2개)', en: 'Magic Lamp Poster (2pcs)' },
			imagePath: '/project-images/project-2.jpeg',
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
			type: 'poster',
		},
		{
			id: 3,
			title: {
				ko: '숏폼드라마 썸네일 경쟁',
				en: 'Short Drama Thumbnail Competition',
			},
			imagePath: '/project-images/project-3.jpeg',
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
			type: 'drama',
		},
		{
			id: 4,
			title: { ko: '웹 에돌 레인보우무+', en: 'Web Episode Rainbow Mu+' },
			imagePath: '/project-images/project-4.jpeg',
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
			type: 'web',
		},
		{
			id: 5,
			title: {
				ko: '인피니트 아성열 중국 Fan meeting1,2',
				en: 'Infinite Lee Seong Yeol China Fan Meeting 1,2',
			},
			imagePath: '/project-images/project-5.jpeg',
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
			type: 'event',
		},
		{
			id: 6,
			title: {
				ko: 'CLNL Body wipes, DNS Perfume Oil, Mas Den Bruno',
				en: 'CLNL Body wipes, DNS Perfume Oil, Mas Den Bruno',
			},
			imagePath: '/project-images/project-6.jpeg',
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

	const renderProjectCard = (project: (typeof projects)[0]) => (
		<div
			key={project.id}
			className='group relative bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 aspect-[4/3] cursor-pointer'
		>
			{/* Full Image Background */}
			<div className='absolute inset-0'>
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
						<Image
							src={project.imagePath}
							alt={`Client logo ${project.id}`}
							width={80}
							height={80}
							className='max-w-full max-h-full object-contain'
							style={{ width: 'auto', height: 'auto' }}
							unoptimized
						/>
					</div>
				</div>

				{/* Monochrome overlay that disappears on hover/touch */}
				<div className='absolute inset-0 bg-gray-500/60 group-hover:bg-transparent transition-all duration-500 backdrop-grayscale group-hover:backdrop-grayscale-0'></div>

				{/* Project number */}
				{/* <div className='absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
					<span className='text-white text-sm font-bold'>{project.id}</span>
				</div> */}
			</div>

			{/* Overlay content that appears on hover (Desktop) / tap (Mobile) */}
			<div className='absolute inset-0 bg-[#bdb9dc]/95 opacity-0 group-hover:opacity-100 lg:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-6 text-center'>
				<div className='text-white'>
					<h3 className='text-xl lg:text-2xl font-bold mb-3 leading-tight'>
						{project.title[locale]}
					</h3>

					<p className='text-sm lg:text-base text-white/90 font-medium mb-4'>
						{project.category[locale]}
					</p>

					<p className='text-white/80 text-sm mb-6 leading-relaxed'>
						{project.description[locale]}
					</p>

					{/* Project Details */}
					<div className='flex items-center justify-center space-x-6 text-sm'>
						<div className='flex items-center space-x-2'>
							<Calendar size={16} />
							<span>
								{t.duration}: {project.duration}
							</span>
						</div>
						<div className='flex items-center space-x-2'>
							<Users size={16} />
							<span>
								{t.teamSize}: {project.teamSize}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile/Tablet tap overlay (alternative approach for touch devices) */}
			<div className='lg:hidden absolute inset-0 bg-[#bdb9dc]/95 opacity-0 transition-all duration-300 flex flex-col justify-center items-center p-4 text-center touch-overlay'>
				<div className='text-white'>
					<h3 className='text-lg font-bold mb-2 leading-tight'>
						{project.title[locale]}
					</h3>

					<p className='text-sm text-white/90 font-medium mb-3'>
						{project.category[locale]}
					</p>

					<p className='text-white/80 text-xs mb-4 leading-relaxed'>
						{project.description[locale]}
					</p>

					{/* Project Details for Mobile */}
					<div className='flex items-center justify-center space-x-4 text-xs'>
						<div className='flex items-center space-x-1'>
							<Calendar size={14} />
							<span>{project.duration}</span>
						</div>
						<div className='flex items-center space-x-1'>
							<Users size={14} />
							<span>{project.teamSize}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<section id='projects' className='py-16 lg:py-24 bg-white relative'>
			<div>
				<div ref={sectionRef} className='text-center mb-16'>
					<h2 className='text-3xl lg:text-5xl font-bold text-gray-900 mb-6'>
						{t.title}
					</h2>
				</div>

				{/* Carousel */}
				<div className='relative'>
					<Carousel items={projects} renderItem={renderProjectCard} spaceBetween={0} />
				</div>
			</div>

			{/* Add custom styles for mobile touch interaction */}
			<style jsx>{`
				@media (max-width: 1023px) {
					.touch-overlay {
						opacity: 0;
						pointer-events: none;
					}

					.group:active .touch-overlay,
					.group.active .touch-overlay {
						opacity: 1;
						pointer-events: all;
					}
				}
			`}</style>
		</section>
	);
}
