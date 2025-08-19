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
			className='group relative bg-white/10 backdrop-blur-md shadow-lg overflow-hidden hover:bg-white/20 hover:shadow-2xl transition-all duration-500 cursor-pointer flex-shrink-0 rounded-lg'
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
				<div className='text-white space-y-2'>
					<h3 className='text-sm font-thin mb-2 leading-tight drop-shadow-lg'>
						{item.title?.[locale] || item.title || 'Project'}
					</h3>

					{item.year && (
						<p className='text-xs text-[#bdb9dc] font-medium drop-shadow'>
							{item.year[locale] || item.year}
						</p>
					)}

					{item.category && (
						<p className='text-xs text-white/90 font-medium drop-shadow'>
							{item.category[locale] || item.category}
						</p>
					)}

					{item.platforms && (
						<p className='text-white/80 text-xs leading-relaxed drop-shadow px-2'>
							{item.platforms[locale] || item.platforms}
						</p>
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

				/* Gradient overlays for smooth edges - updated for transparent background */
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
						rgba(0, 0, 0, 0.3) 0%,
						rgba(0, 0, 0, 0.1) 30%,
						rgba(0, 0, 0, 0) 100%
					);
				}

				.seamless-scroll-container::after {
					right: 0;
					background: linear-gradient(
						to left,
						rgba(0, 0, 0, 0.3) 0%,
						rgba(0, 0, 0, 0.1) 30%,
						rgba(0, 0, 0, 0) 100%
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
