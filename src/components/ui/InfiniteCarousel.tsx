'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
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
	speed = 50,
	pauseOnHover = true,
	itemWidth = 240,
	itemHeight = 360,
	gap = 24,
	className = '',
	locale = 'en',
}: InfiniteCarouselProps) {
	const [mounted, setMounted] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
	const [isHovered, setIsHovered] = useState(false);
	const [hasItemActive, setHasItemActive] = useState(false);
	const [currentOffset, setCurrentOffset] = useState(0);
	const [resumeFromOffset, setResumeFromOffset] = useState(0);
	const [hasUserInteracted, setHasUserInteracted] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const animationStartTimeRef = useRef<number>(0);
	const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setMounted(true);
		animationStartTimeRef.current = Date.now();
	}, []);

	// Calculate the exact width needed for seamless loop
	const itemTotalWidth = itemWidth + gap;
	const totalWidth = items.length * itemTotalWidth;
	const animationDuration = totalWidth / speed;

	// Determine if animation should be paused
	const shouldPauseAnimation =
		isDragging ||
		(isHovered && hasUserInteracted && pauseOnHover) ||
		(hasItemActive && hasUserInteracted);

	// Clear resume timeout
	const clearResumeTimeout = useCallback(() => {
		if (resumeTimeoutRef.current) {
			clearTimeout(resumeTimeoutRef.current);
			resumeTimeoutRef.current = null;
		}
	}, []);

	// Set resume timeout for mobile after item interaction
	const setResumeTimeout = useCallback(() => {
		clearResumeTimeout();
		resumeTimeoutRef.current = setTimeout(() => {
			setHasItemActive(false);
			// Resume animation from current position after item becomes inactive
			setResumeFromOffset(currentOffset);
			animationStartTimeRef.current = Date.now();
		}, 3000);
	}, [clearResumeTimeout, currentOffset]);

	// Calculate current animation offset and capture CSS animation position on first interaction
	useEffect(() => {
		if (shouldPauseAnimation) return;

		// If user has interacted, use manual positioning, otherwise use automatic animation
		if (hasUserInteracted) {
			const updateOffset = () => {
				const elapsed = (Date.now() - animationStartTimeRef.current) / 1000;
				const newOffset = (resumeFromOffset + elapsed * speed) % totalWidth;
				setCurrentOffset(newOffset);
			};

			const interval = setInterval(updateOffset, 16); // ~60fps
			return () => clearInterval(interval);
		} else {
			// Track CSS animation position for potential first interaction
			const updateCSSOffset = () => {
				const elapsed = (Date.now() - animationStartTimeRef.current) / 1000;
				const newOffset = (elapsed * speed) % totalWidth;
				setCurrentOffset(newOffset);
			};

			const interval = setInterval(updateCSSOffset, 16); // ~60fps
			return () => clearInterval(interval);
		}
	}, [
		shouldPauseAnimation,
		hasUserInteracted,
		totalWidth,
		speed,
		resumeFromOffset,
	]);

	// Mouse events
	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (!containerRef.current) return;

			// Capture current CSS animation position on first interaction
			if (!hasUserInteracted) {
				setResumeFromOffset(currentOffset);
			}

			setIsDragging(true);
			setHasUserInteracted(true);
			clearResumeTimeout();

			setDragStart({
				x: e.clientX,
				scrollLeft: currentOffset,
			});

			e.preventDefault();
		},
		[currentOffset, clearResumeTimeout, hasUserInteracted]
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging || !containerRef.current) return;

			e.preventDefault();
			const deltaX = e.clientX - dragStart.x;
			const newOffset = dragStart.scrollLeft - deltaX;
			const normalizedOffset =
				((newOffset % totalWidth) + totalWidth) % totalWidth;
			setCurrentOffset(normalizedOffset);
		},
		[isDragging, dragStart, totalWidth]
	);

	const handleMouseUp = useCallback(() => {
		if (isDragging) {
			setResumeFromOffset(currentOffset);
			animationStartTimeRef.current = Date.now();
		}
		setIsDragging(false);
	}, [isDragging, currentOffset]);

	// Touch events
	const handleTouchStart = useCallback(
		(e: React.TouchEvent) => {
			if (!containerRef.current) return;

			// Capture current CSS animation position on first interaction
			if (!hasUserInteracted) {
				setResumeFromOffset(currentOffset);
			}

			setIsDragging(true);
			setHasUserInteracted(true);
			clearResumeTimeout();

			const touch = e.touches[0];
			setDragStart({
				x: touch.clientX,
				scrollLeft: currentOffset,
			});
		},
		[currentOffset, clearResumeTimeout, hasUserInteracted]
	);

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			if (!isDragging || !containerRef.current) return;

			const touch = e.touches[0];
			const deltaX = touch.clientX - dragStart.x;
			const newOffset = dragStart.scrollLeft - deltaX;
			const normalizedOffset =
				((newOffset % totalWidth) + totalWidth) % totalWidth;
			setCurrentOffset(normalizedOffset);
		},
		[isDragging, dragStart, totalWidth]
	);

	const handleTouchEnd = useCallback(() => {
		if (isDragging) {
			setResumeFromOffset(currentOffset);
			animationStartTimeRef.current = Date.now();
		}
		setIsDragging(false);
	}, [isDragging, currentOffset]);

	// Mouse enter/leave events
	const handleMouseEnter = useCallback(() => {
		setIsHovered(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsHovered(false);
		if (hasUserInteracted && !isDragging && !hasItemActive) {
			// Resume animation from current position when mouse leaves
			setResumeFromOffset(currentOffset);
			animationStartTimeRef.current = Date.now();
		}
	}, [hasUserInteracted, isDragging, currentOffset, hasItemActive]);

	// Item click/tap handler
	const handleItemClick = useCallback(
		(e: React.MouseEvent) => {
			// On mobile/tablet, set item as active
			if ('ontouchstart' in window) {
				// Capture current animation position on first interaction
				if (!hasUserInteracted) {
					setResumeFromOffset(currentOffset);
					setHasUserInteracted(true);
					animationStartTimeRef.current = Date.now();
				}

				setHasItemActive(true);
				setResumeTimeout();
			}
		},
		[setResumeTimeout, hasUserInteracted, currentOffset]
	);

	// Global mouse/touch event listeners
	useEffect(() => {
		const handleGlobalMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;
			const deltaX = e.clientX - dragStart.x;
			const newOffset = dragStart.scrollLeft - deltaX;
			const normalizedOffset =
				((newOffset % totalWidth) + totalWidth) % totalWidth;
			setCurrentOffset(normalizedOffset);
		};

		const handleGlobalMouseUp = () => {
			if (isDragging) {
				setResumeFromOffset(currentOffset);
				animationStartTimeRef.current = Date.now();
			}
			setIsDragging(false);
		};

		const handleGlobalTouchMove = (e: TouchEvent) => {
			if (!isDragging) return;
			const touch = e.touches[0];
			const deltaX = touch.clientX - dragStart.x;
			const newOffset = dragStart.scrollLeft - deltaX;
			const normalizedOffset =
				((newOffset % totalWidth) + totalWidth) % totalWidth;
			setCurrentOffset(normalizedOffset);
		};

		const handleGlobalTouchEnd = () => {
			if (isDragging) {
				setResumeFromOffset(currentOffset);
				animationStartTimeRef.current = Date.now();
			}
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener('mousemove', handleGlobalMouseMove);
			document.addEventListener('mouseup', handleGlobalMouseUp);
			document.addEventListener('touchmove', handleGlobalTouchMove);
			document.addEventListener('touchend', handleGlobalTouchEnd);
		}

		return () => {
			document.removeEventListener('mousemove', handleGlobalMouseMove);
			document.removeEventListener('mouseup', handleGlobalMouseUp);
			document.removeEventListener('touchmove', handleGlobalTouchMove);
			document.removeEventListener('touchend', handleGlobalTouchEnd);
		};
	}, [isDragging, dragStart, totalWidth, currentOffset]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			clearResumeTimeout();
		};
	}, [clearResumeTimeout]);

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
			onDragStart={(e) => e.preventDefault()}
			onClick={handleItemClick}
		>
			{/* Project Image */}
			{item.imagePath && (
				<div className='relative w-full h-full'>
					<Image
						src={item.imagePath}
						alt={item.title?.[locale] || item.title || 'Project'}
						fill
						className='object-cover transition-all duration-500 select-none'
						sizes={`${itemWidth}px`}
						draggable={false}
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
					${hasUserInteracted
						? `transform: translateX(-${currentOffset}px);`
						: `animation: seamlessScroll ${animationDuration}s linear infinite;`}
					will-change: transform;
				}

				.seamless-scroll-track.paused {
					animation-play-state: paused;
				}

				${pauseOnHover && !hasUserInteracted
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

				/* Custom cursor styles */
				.seamless-scroll-container {
					cursor: grab;
				}

				.seamless-scroll-container.dragging {
					cursor: grabbing;
				}

				/* Disable text selection during drag */
				.seamless-scroll-container.dragging * {
					user-select: none;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
				}
			`}</style>

			<div
				ref={containerRef}
				className={`overflow-hidden seamless-scroll-container relative ${className} ${
					isDragging ? 'dragging' : ''
				}`}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				style={{ touchAction: 'pan-y pinch-zoom' }}
			>
				<div
					ref={trackRef}
					className={`seamless-scroll-track flex ${
						shouldPauseAnimation ? 'paused' : ''
					}`}
				>
					{/* First set */}
					{items.map((item, index) => renderProjectCard(item, index, 0))}
					{/* Second set for seamless loop */}
					{items.map((item, index) => renderProjectCard(item, index, 1))}
				</div>
			</div>
		</>
	);
}
