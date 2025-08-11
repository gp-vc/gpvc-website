'use client';
import { useEffect, useRef } from 'react';
import { Calendar, Users, ExternalLink } from 'lucide-react';
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
			subtitle: '성공적으로 완료된 프로젝트들을 소개합니다',
			description:
				'GPVC가 다양한 파트너와 함께 수행한 혁신적인 프로젝트들을 통해 우리의 역량과 전문성을 확인하세요.',
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
			subtitle: 'Introducing successfully completed projects',
			description:
				'Discover our capabilities and expertise through innovative projects that GPVC has conducted with various partners.',
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
			title: { ko: 'AI 기반 금융 솔루션', en: 'AI-Based Financial Solution' },
			description: {
				ko: '머신러닝을 활용한 실시간 리스크 분석 시스템 구축',
				en: 'Building real-time risk analysis system using machine learning',
			},
			client: { ko: 'KB금융그룹', en: 'KB Financial Group' },
			duration: '12개월',
			teamSize: '15명',
			status: 'completed',
			image: '/placeholder-project1.png',
			tech: ['AI/ML', 'Python', 'TensorFlow', 'AWS'],
		},
		{
			id: 2,
			title: { ko: '스마트시티 IoT 플랫폼', en: 'Smart City IoT Platform' },
			description: {
				ko: '도시 인프라 통합 관리를 위한 IoT 센서 네트워크 구축',
				en: 'Building IoT sensor network for integrated city infrastructure management',
			},
			client: { ko: '서울시', en: 'Seoul Metropolitan Government' },
			duration: '18개월',
			teamSize: '22명',
			status: 'ongoing',
			image: '/placeholder-project2.png',
			tech: ['IoT', 'Node.js', 'MongoDB', 'Azure'],
		},
		{
			id: 3,
			title: {
				ko: '블록체인 공급망 관리',
				en: 'Blockchain Supply Chain Management',
			},
			description: {
				ko: '투명하고 안전한 공급망 추적 시스템 개발',
				en: 'Developing transparent and secure supply chain tracking system',
			},
			client: { ko: '삼성전자', en: 'Samsung Electronics' },
			duration: '8개월',
			teamSize: '12명',
			status: 'completed',
			image: '/placeholder-project3.png',
			tech: ['Blockchain', 'Solidity', 'React', 'IPFS'],
		},
		{
			id: 4,
			title: {
				ko: '의료 데이터 분석 플랫폼',
				en: 'Medical Data Analysis Platform',
			},
			description: {
				ko: '병원 데이터 통합 및 예측 분석 시스템',
				en: 'Hospital data integration and predictive analysis system',
			},
			client: { ko: '서울대병원', en: 'Seoul National University Hospital' },
			duration: '15개월',
			teamSize: '18명',
			status: 'ongoing',
			image: '/placeholder-project4.png',
			tech: ['Data Science', 'Python', 'PostgreSQL', 'Docker'],
		},
		{
			id: 5,
			title: { ko: '클라우드 마이그레이션', en: 'Cloud Migration Project' },
			description: {
				ko: '레거시 시스템의 클라우드 전환 및 최적화',
				en: 'Cloud migration and optimization of legacy systems',
			},
			client: { ko: 'LG화학', en: 'LG Chem' },
			duration: '10개월',
			teamSize: '20명',
			status: 'completed',
			image: '/placeholder-project5.png',
			tech: ['AWS', 'Kubernetes', 'DevOps', 'Terraform'],
		},
		{
			id: 6,
			title: {
				ko: '사이버보안 통합 솔루션',
				en: 'Integrated Cybersecurity Solution',
			},
			description: {
				ko: '기업 전체 보안 체계 구축 및 위협 탐지 시스템',
				en: 'Enterprise-wide security framework and threat detection system',
			},
			client: { ko: '현대자동차', en: 'Hyundai Motors' },
			duration: '24개월',
			teamSize: '25명',
			status: 'planning',
			image: '/placeholder-project6.png',
			tech: ['Cybersecurity', 'SIEM', 'AI/ML', 'Networking'],
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
			className='group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
		>
			{/* Image Placeholder */}
			<div className='h-48 bg-gradient-to-br from-[#bdb9dc] to-[#827bb8] relative overflow-hidden'>
				<div className='absolute inset-0 bg-black/10'></div>
				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
						<div className='w-10 h-10 bg-white/40 rounded-lg'></div>
					</div>
				</div>
				{/* Hover overlay */}
				<div className='absolute inset-0 bg-[#bdb9dc]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

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
			</div>

			{/* Content */}
			<div className='p-6'>
				<h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-[#bdb9dc] transition-colors duration-300'>
					{project.title[locale]}
				</h3>

				<p className='text-sm text-[#bdb9dc] font-medium mb-3'>
					{project.client[locale]}
				</p>

				<p className='text-gray-600 text-sm leading-relaxed mb-4'>
					{project.description[locale]}
				</p>

				{/* Project Details */}
				<div className='flex items-center justify-between mb-4 text-sm text-gray-500'>
					<div className='flex items-center space-x-1'>
						<Calendar size={14} />
						<span>
							{t.duration}: {project.duration}
						</span>
					</div>
					<div className='flex items-center space-x-1'>
						<Users size={14} />
						<span>
							{t.teamSize}: {project.teamSize}
						</span>
					</div>
				</div>

				{/* Tech Stack */}
				<div className='flex flex-wrap gap-2 mb-4'>
					{project.tech.map((tech, techIndex) => (
						<span
							key={techIndex}
							className='px-2 py-1 bg-[#bdb9dc]/10 text-[#827bb8] text-xs rounded-md font-medium'
						>
							{tech}
						</span>
					))}
				</div>

				<button className='flex items-center space-x-2 text-[#bdb9dc] hover:text-[#827bb8] transition-colors duration-300 group/btn'>
					<span className='text-sm font-medium'>{t.viewProject}</span>
					<ExternalLink
						size={16}
						className='group-hover/btn:translate-x-1 transition-transform duration-300'
					/>
				</button>
			</div>

			{/* Project number */}
			<div className='absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
				<span className='text-white text-sm font-bold'>{project.id}</span>
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
