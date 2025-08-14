'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface InfiniteCarouselProps {
	items: any[];
	speed?: number; // pixels per second
	pauseOnHover?: boolean;
	itemWidth?: number;
	itemHeight?: number;
	gap?: number;
	className?: string;
	locale?: 'en' | 'ko';
}

export default function InfiniteCarousel({
	items,
	speed = 50, // pixels per second
	pauseOnHover = true,
	itemWidth = 240,
	itemHeight = 360,
	gap = 24,
	className = '',
	locale = 'en',
}: InfiniteCarouselProps) {
	const [mounted, setMounted] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Calculate the exact width needed for seamless loop
	const itemTotalWidth = itemWidth + gap;
	const totalWidth = items.length * itemTotalWidth;

	// Animation duration based on speed (pixels per second)
	const animationDuration = totalWidth / speed;

	const renderProjectCard = (
		item: any,
		index: number,
		setIndex: number = 0
	) => (
		<div
			key={`${item.id}-${setIndex}-${index}`}
			className='group relative bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer flex-shrink-0 rounded-lg'
			style={{
				width: itemWidth,
				height: itemHeight,
				marginRight: gap,
			}}
		>
			{/* Project Image */}
			{item.imagePath && (
				<div className='relative w-full h-full'>
					<Image
						src={item.imagePath}
						alt={item.title?.[locale] || item.title || 'Project'}
						fill
						className='object-cover transition-all duration-500'
						sizes={`${itemWidth}px`}
					/>

					{/* Monochrome overlay that disappears on hover */}
					<div className='absolute inset-0 bg-gray-500/60 group-hover:bg-transparent transition-all duration-500 backdrop-grayscale group-hover:backdrop-grayscale-0'></div>
				</div>
			)}

			{/* Overlay content */}
			<div className='absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-4 text-center'>
				<div className='text-white'>
					<h3 className='text-sm font-thin mb-2 leading-tight'>
						{item.title?.[locale] || item.title || 'Project'}
					</h3>

					{item.category && (
						<p className='text-xs text-white/90 font-medium mb-2'>
							{item.category[locale] || item.category}
						</p>
					)}

					{item.description && (
						<p className='text-white/80 text-xs mb-3 leading-relaxed line-clamp-3'>
							{item.description[locale] || item.description}
						</p>
					)}

					{/* Project Details */}
					{(item.duration || item.teamSize) && (
						<div className='flex items-center justify-center space-x-3 text-xs'>
							{item.duration && (
								<div className='flex items-center space-x-1'>
									<div className='w-1.5 h-1.5 bg-[#bdb9dc] rounded-full'></div>
									<span>{item.duration}</span>
								</div>
							)}
							{item.teamSize && (
								<div className='flex items-center space-x-1'>
									<div className='w-1.5 h-1.5 bg-[#a8a4d0] rounded-full'></div>
									<span>{item.teamSize}</span>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);

	if (!mounted) {
		return (
			<div className={`overflow-hidden ${className}`}>
				<div className='flex'>
					{items
						.slice(0, 4)
						.map((item, index) => renderProjectCard(item, index))}
				</div>
			</div>
		);
	}

	return (
		<>
			<style jsx>{`
				@keyframes seamlessScroll {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-${totalWidth}px);
					}
				}

				.seamless-scroll-track {
					animation: seamlessScroll ${animationDuration}s linear infinite;
					will-change: transform;
				}

				${pauseOnHover
					? `
				.seamless-scroll-container:hover .seamless-scroll-track {
					animation-play-state: paused;
				}
				`
					: ''}

				/* Gradient overlays for smooth edges */
				.seamless-scroll-container::before,
				.seamless-scroll-container::after {
					content: '';
					position: absolute;
					top: 0;
					bottom: 0;
					width: 80px;
					z-index: 10;
					pointer-events: none;
				}

				.seamless-scroll-container::before {
					left: 0;
					background: linear-gradient(
						to right,
						rgba(248, 250, 252, 1) 0%,
						rgba(248, 250, 252, 0.8) 30%,
						rgba(248, 250, 252, 0) 100%
					);
				}

				.seamless-scroll-container::after {
					right: 0;
					background: linear-gradient(
						to left,
						rgba(248, 250, 252, 1) 0%,
						rgba(248, 250, 252, 0.8) 30%,
						rgba(248, 250, 252, 0) 100%
					);
				}
			`}</style>

			<div
				ref={containerRef}
				className={`overflow-hidden seamless-scroll-container relative ${className}`}
			>
				<div className='seamless-scroll-track flex'>
					{/* First set */}
					{items.map((item, index) => renderProjectCard(item, index, 0))}
					{/* Second set for seamless loop */}
					{items.map((item, index) => renderProjectCard(item, index, 1))}
				</div>
			</div>
		</>
	);
}
