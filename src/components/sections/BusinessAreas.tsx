'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, X, ExternalLink, Instagram, Globe } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface DomainsProps {
	locale: Locale;
}

interface Domain {
	id: number;
	title: { ko: string; en: string };
	description: { ko: string; en: string };
	image: string;
	shortCategories: Array<{
		title: { ko: string; en: string };
	}>;
	detailCategories: Array<{
		title: { ko: string; en: string };
		items: Array<{
			ko: string;
			en: string;
			description?: { ko: string; en: string };
			links?: {
				website?: string;
				instagram?: string;
			};
		}>;
	}>;
}

export default function Domains({ locale }: DomainsProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const content = {
		ko: {
			title: 'Domains',
			learnMore: '자세히 보기',
			close: '닫기',
		},
		en: {
			title: 'Domains',
			learnMore: 'Learn More',
			close: 'Close',
		},
	};

	const domains: Domain[] = [
		{
			id: 1,
			title: {
				ko: '엔터테인먼트, 콘텐츠, 라이브 퍼포먼스, 그 외',
				en: 'Entertainment, Content, and Experiences',
			},
			description: {
				ko: '전 세계 다양한 문화와 언어 속에서 의미 있는 콘텐츠를 전합니다.',
				en: 'Sharing meaningful content with audiences across cultures and languages.',
			},
			image: '/stock-images/production.jpeg',
			shortCategories: [
				{
					title: { ko: '제작/투자', en: 'Production & Investment' },
				},
				{
					title: { ko: '코디네이션 파트너', en: 'Coordination Partner' },
				},
			],
			detailCategories: [
				{
					title: { ko: '제작/투자', en: 'Production & Investment' },
					items: [
						{
							ko: '영화 / 드라마 및 숏폼 드라마 / 시리즈물 / 디지털 콘텐츠',
							en: 'Feature Films/ Dramas & Short-Form Dramas/ Series/ Digital Contents',
						},
						{
							ko: '콘서트 / 팬미팅 / 라이브 퍼포먼스',
							en: 'Concerts, Theatres & Live Performances',
						},
					],
				},
				{
					title: { ko: '코디네이션 파트너', en: 'Coordination Partner' },
					items: [
						{
							ko: 'K-POP 및 글로벌 아티스트',
							en: 'K-Pop and Global Artists',
						},
						{
							ko: '브랜드 스폰서쉽',
							en: 'Brand Sponsorships',
						},
						{
							ko: '이벤트 / 프로모션',
							en: 'Events/ Promotions',
						},
						{
							ko: '광고 / PPL',
							en: 'Advertisement/ PPL',
						},
					],
				},
			],
		},
		{
			id: 2,
			title: { ko: '코스메틱스', en: 'Cosmetics' },
			description: {
				ko: '기본부터 디테일까지—다양성과 개성을 존중하는 제품으로 매일의 아름다움을 더욱 빛나게 합니다. 깨끗한 성분으로부터 시작해, 세련된 마무리로 완성된 제품을 선보입니다. 누구에게나 어울리고, 각자의 개성을 존중하며, 일상의 아름다움이 더욱 빛날 수 있도록 함께합니다.',
				en: 'Enhancing beauty through innovative products that celebrate diversity and individuality.',
			},
			image: '/stock-images/cosmetics.jpeg',
			shortCategories: [
				{
					title: { ko: 'CLNL', en: 'CLNL' },
				},
				{
					title: { ko: 'donotstare co.', en: 'donotstare co.' },
				},
			],
			detailCategories: [
				{
					title: { ko: 'CLNL', en: 'CLNL' },
					items: [
						{
							ko: 'CLNL',
							en: 'CLNL',
							description: {
								ko: 'CLNL은 깨끗함이 건강하고 균형 잡힌 피부의 시작이라고 믿습니다. 그래서 꼭 필요한 것만 담아 언제 어디서나 자극 없이 부드럽게 사용할 수 있도록 만들었습니다. CLNL은 일상 속 작은 편안함을 전하며, 피부 본연의 균형을 지켜줍니다.',
								en: "At CLNL, we believe clean is the foundation of healthy, balanced skin. That's why we keep only the essentials—gentle, irritation-free, and easy to use anytime, anywhere. CLNL brings quiet comfort to your daily routine, supporting your skin with ease.",
							},
							links: {
								instagram: '#',
								website: '#',
							},
						},
					],
				},
				{
					title: { ko: 'donotstare co.', en: 'donotstare co.' },
					items: [
						{
							ko: 'donotstare co.',
							en: 'donotstare co.',
							description: {
								ko: '아름다움은 크게 말하지 않습니다. 향·결·톤의 조용한 힘으로 존재감을 남깁니다. 소음은 줄이고, 분명하게, 흔들림 없이.',
								en: 'Beauty—hinted, not shouted. A house devoted to the quiet power of scent · texture · tone. Presence without noise. Unmistakable. Unbothered.',
							},
							links: {
								instagram: '#',
								website: '#',
							},
						},
					],
				},
			],
		},
		{
			id: 3,
			title: { ko: '글로벌 소싱', en: 'Global Sourcing' },
			description: {
				ko: '원산지와 다이렉트한 연결을 통해 뛰어난 생산자와 엄선된 제품을 큐레이션합니다.',
				en: 'Curating world-class producers and products, direct from origin.',
			},
			image: '/stock-images/global-sourcing.jpeg',
			shortCategories: [
				{
					title: {
						ko: '컬트 와인/ 소량생산 프리미엄 와인',
						en: 'Artisan Wines',
					},
				},
				{
					title: {
						ko: '엄선된 글로벌 셀렉션',
						en: 'Curated Provisions and Global Finds',
					},
				},
			],
			detailCategories: [
				{
					title: {
						ko: '컬트 와인/ 소량생산 프리미엄 와인',
						en: 'Artisan Wines',
					},
					items: [
						{
							ko: "Clos de L'Obac 클로스 데 로박",
							en: "Clos de L'Obac",
							description: {
								ko: "Gratallops (그라탈롭스)의 소량 생산, Terroir (테루아) 중심 Priorat (프리오라트)의 대표 컬트 와인 Clos de L'Obac은 리코렐라(슬레이트) 토양과 정교한 숙성으로 변치 않는 장기 숙성형 블렌드를 빚으며, 한정된 물량으로 전 세계 톱 소믈리에와 미쉐린 스타 레스토랑에서 인정받습니다. 무리한 생산도, 대량 소비도 없습니다.",
								en: "Small-production, terroir-driven benchmark Priorat from Gratallops: Clos de L'Obac crafts unchanging, age-worthy blends defined by llicorella slate and meticulous élevage—kept intentionally limited in volume and recognized among top sommeliers and Michelin-starred restaurants worldwide.",
							},
							links: {
								instagram: 'https://instagram.com/closdelobac',
								website: 'https://obac.es/en_US',
							},
						},
					],
				},
				{
					title: {
						ko: '엄선된 글로벌 셀렉션',
						en: 'Curated Provisions and Global Finds',
					},
					items: [],
				},
			],
		},
		{
			id: 4,
			title: { ko: '유통', en: 'Distribution' },
			description: {
				ko: '스트리밍·리테일·B2B/B2C/D2C 전세계 모든 채널로 유통을 합니다. 권리와 메타데이터부터 모든 과정 및 성과 분석까지 끊김 없이—마스터에서 매대까지.',
				en: 'End-to-end distribution for content, OSTs, and merch across streaming, retail, and B2C/D2C. Seamless from rights and metadata to delivery, logistics, and analytics—masters to shelves.',
			},
			image: '/stock-images/distribution.jpeg',
			shortCategories: [
				{
					title: { ko: '유통 서비스', en: 'Distribution Services' },
				},
			],
			detailCategories: [
				{
					title: { ko: '유통 서비스', en: 'Distribution Services' },
					items: [
						{ ko: '콘텐츠', en: 'Contents' },
						{ ko: '사운드트랙 OST', en: 'Soundtracks OST' },
						{ ko: '외부 협력 제품', en: 'External Products' },
						{ ko: 'MD / 굿즈', en: 'Merchandise/ Goods' },
						{ ko: '기타', en: 'And more.' },
					],
				},
			],
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

	const openModal = (domain: Domain) => {
		setSelectedDomain(domain);
		setIsModalOpen(true);
		document.body.style.overflow = 'hidden';
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedDomain(null);
		document.body.style.overflow = 'unset';
	};

	// Close modal on escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isModalOpen) {
				closeModal();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isModalOpen]);

	const renderDomainCard = (domain: Domain) => (
		<div
			key={domain.id}
			className='group relative bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/30 hover:shadow-2xl transition-all duration-500 h-full flex flex-col'
		>
			{/* Image with monochrome effect */}
			<div className='h-48 relative overflow-hidden flex-shrink-0'>
				<Image
					src={domain.image}
					alt={domain.title[locale]}
					fill
					className='object-cover transition-all duration-500'
					sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
					priority={domain.id <= 2}
				/>

				{/* Monochrome overlay that disappears on hover */}
				<div className='absolute inset-0 bg-gray-500/60 group-hover:bg-transparent transition-all duration-500 backdrop-grayscale group-hover:backdrop-grayscale-0'></div>
			</div>

			{/* Content */}
			<div className='p-6 flex-1 flex flex-col'>
				<h3 className='text-xl font-thin text-white mb-3 group-hover:text-[#bdb9dc] transition-colors duration-300 drop-shadow-lg'>
					{domain.title[locale]}
				</h3>

				<p className='text-sm text-white/90 leading-relaxed mb-4 drop-shadow flex-1'>
					{domain.description[locale]}
				</p>

				{/* Short categories */}
				<div className='space-y-2 mb-6'>
					{domain.shortCategories.map((category, index) => (
						<div key={index} className='flex items-center space-x-2'>
							<div className='w-1 h-1 bg-[#bdb9dc] rounded-full flex-shrink-0'></div>
							<span className='text-sm font-medium text-[#bdb9dc] drop-shadow'>
								{category.title[locale]}
							</span>
						</div>
					))}
				</div>

				{/* Learn More Button */}
				<button
					onClick={() => openModal(domain)}
					className='flex items-center space-x-2 text-[#bdb9dc] hover:text-white transition-colors duration-300 group/btn mt-auto'
				>
					<span className='text-sm font-medium drop-shadow'>{t.learnMore}</span>
					<ArrowRight
						size={16}
						className='group-hover/btn:translate-x-1 transition-transform duration-300'
					/>
				</button>
			</div>
		</div>
	);

	return (
		<>
			<section
				id='business'
				className='py-16 lg:py-24 mx-auto px-4 sm:px-6 lg:px-8'
			>
				<div ref={sectionRef}>
					<div className='text-center mb-12 lg:mb-16'>
						<h2 className='text-3xl lg:text-5xl font-thin text-white mb-6 drop-shadow-2xl'>
							{t.title}
						</h2>
					</div>

					{/* Grid Layout for Domain Cards */}
					<div className='relative'>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8'>
							{domains.map((domain) => renderDomainCard(domain))}
						</div>
					</div>
				</div>
			</section>

			{/* Modal */}
			{isModalOpen && selectedDomain && (
				<div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
					{/* Lighter Backdrop */}
					<div
						className='absolute inset-0 bg-black/40'
						onClick={closeModal}
					></div>

					{/* Modal Content - Heavy Backdrop Blur */}
					<div className='relative bg-black/20 backdrop-blur-2xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20'>
						{/* Header */}
						<div className='sticky top-0 bg-black/30 backdrop-blur-2xl border-b border-white/20 p-6 flex justify-between items-start'>
							<div>
								<h2 className='text-2xl font-thin text-white mb-2 drop-shadow-lg'>
									{selectedDomain.title[locale]}
								</h2>
								<p className='text-white/80 leading-relaxed drop-shadow'>
									{selectedDomain.description[locale]}
								</p>
							</div>
							<button
								onClick={closeModal}
								className='p-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex-shrink-0 ml-4 group'
							>
								<X
									size={24}
									className='text-white/70 group-hover:text-white transition-colors duration-200'
								/>
							</button>
						</div>

						{/* Content */}
						<div className='p-6 space-y-8'>
							{selectedDomain.detailCategories.map(
								(category, categoryIndex) => (
									<div key={categoryIndex} className='space-y-4'>
										<h3 className='text-lg font-semibold text-[#bdb9dc] drop-shadow'>
											{category.title[locale]}
										</h3>

										<div className='space-y-4'>
											{category.items.map((item, itemIndex) => (
												<div key={itemIndex} className='space-y-3'>
													<div className='flex items-start space-x-3'>
														<div className='w-2 h-2 bg-[#bdb9dc] rounded-full flex-shrink-0 mt-2 shadow-sm'></div>
														<div className='flex-1'>
															<p className='text-white font-medium drop-shadow'>
																{item[locale]}
															</p>
															{item.description && (
																<p className='text-white/80 text-sm leading-relaxed mt-2 drop-shadow'>
																	{item.description[locale]}
																</p>
															)}
															{item.links && (
																<div className='flex space-x-4 mt-3'>
																	{item.links.website && (
																		<a
																			href={item.links.website}
																			target='_blank'
																			rel='noopener noreferrer'
																			className='flex items-center space-x-1 text-[#bdb9dc] hover:text-white transition-all duration-200 hover:scale-105 group/link'
																		>
																			<Globe
																				size={16}
																				className='group-hover/link:rotate-12 transition-transform duration-200'
																			/>
																			<span className='text-sm drop-shadow'>
																				Website
																			</span>
																			<ExternalLink
																				size={12}
																				className='group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200'
																			/>
																		</a>
																	)}
																	{item.links.instagram && (
																		<a
																			href={item.links.instagram}
																			target='_blank'
																			rel='noopener noreferrer'
																			className='flex items-center space-x-1 text-[#bdb9dc] hover:text-white transition-all duration-200 hover:scale-105 group/link'
																		>
																			<Instagram
																				size={16}
																				className='group-hover/link:scale-110 transition-transform duration-200'
																			/>
																			<span className='text-sm drop-shadow'>
																				Instagram
																			</span>
																			<ExternalLink
																				size={12}
																				className='group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200'
																			/>
																		</a>
																	)}
																</div>
															)}
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
