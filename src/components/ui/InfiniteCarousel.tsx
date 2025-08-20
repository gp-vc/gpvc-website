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

// Momentum scrolling configuration
const MOMENTUM_CONFIG = {
	friction: 0.95, // Deceleration factor (higher = less friction)
	minVelocity: 0.5, // Minimum velocity to continue momentum
	velocityMultiplier: 2.5, // How much to amplify the final velocity
	maxVelocity: 3000, // Maximum pixels/second
};

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
	const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0, time: 0 });
	const [isHovered, setIsHovered] = useState(false);
	const [hasItemActive, setHasItemActive] = useState(false);
	const [currentOffset, setCurrentOffset] = useState(0);
	const [hasUserInteracted, setHasUserInteracted] = useState(false);
	const [isMomentumScrolling, setIsMomentumScrolling] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<number | null>(null);
	const lastTimeRef = useRef<number>(0);
	const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const momentumAnimationRef = useRef<number | null>(null);
	const velocityTrackingRef = useRef<{
		positions: { x: number; time: number }[];
		velocity: number;
	}>({ positions: [], velocity: 0 });

	useEffect(() => {
		setMounted(true);
		lastTimeRef.current = Date.now();
	}, []);

	// Calculate the exact width needed for seamless loop
	const itemTotalWidth = itemWidth + gap;
	const totalWidth = items.length * itemTotalWidth;

	// Determine if animation should be paused
	const shouldPauseAnimation =
		isDragging ||
		isMomentumScrolling ||
		(isHovered && pauseOnHover) || // Removed hasUserInteracted check here
		(hasItemActive && hasUserInteracted);

	// Clear resume timeout
	const clearResumeTimeout = useCallback(() => {
		if (resumeTimeoutRef.current) {
			clearTimeout(resumeTimeoutRef.current);
			resumeTimeoutRef.current = null;
		}
	}, []);

	// Stop momentum animation
	const stopMomentumAnimation = useCallback(() => {
		if (momentumAnimationRef.current) {
			cancelAnimationFrame(momentumAnimationRef.current);
			momentumAnimationRef.current = null;
		}
		setIsMomentumScrolling(false);
	}, []);

	// Calculate velocity from recent positions
	const calculateVelocity = useCallback(() => {
		const positions = velocityTrackingRef.current.positions;
		if (positions.length < 2) return 0;

		// Use the last few positions to calculate velocity
		const recent = positions.slice(-3);
		const firstPos = recent[0];
		const lastPos = recent[recent.length - 1];

		const deltaX = lastPos.x - firstPos.x;
		const deltaTime = lastPos.time - firstPos.time;

		if (deltaTime === 0) return 0;

		return (deltaX / deltaTime) * 1000; // Convert to pixels per second
	}, []);

	// Momentum scrolling animation
	const animateMomentum = useCallback(
		(initialVelocity: number, startOffset: number) => {
			let velocity =
				Math.sign(initialVelocity) *
				Math.min(Math.abs(initialVelocity), MOMENTUM_CONFIG.maxVelocity);
			let currentPos = startOffset;
			let lastTime = Date.now();

			const animate = () => {
				const now = Date.now();
				const deltaTime = (now - lastTime) / 1000;
				lastTime = now;

				// Apply friction
				velocity *= MOMENTUM_CONFIG.friction;

				// Update position
				currentPos += velocity * deltaTime;

				// Normalize position to keep it within bounds for seamless loop
				if (currentPos >= totalWidth) {
					currentPos -= totalWidth;
				} else if (currentPos < 0) {
					currentPos += totalWidth;
				}

				setCurrentOffset(currentPos);

				// Continue if velocity is above threshold
				if (Math.abs(velocity) > MOMENTUM_CONFIG.minVelocity) {
					momentumAnimationRef.current = requestAnimationFrame(animate);
				} else {
					// Momentum finished, resume normal animation
					setIsMomentumScrolling(false);
					lastTimeRef.current = Date.now();
				}
			};

			setIsMomentumScrolling(true);
			momentumAnimationRef.current = requestAnimationFrame(animate);
		},
		[totalWidth]
	);

	// Track positions for velocity calculation
	const trackPosition = useCallback((x: number) => {
		const now = Date.now();
		const positions = velocityTrackingRef.current.positions;

		// Keep only recent positions (last 100ms)
		const recentPositions = positions.filter((pos) => now - pos.time < 100);
		recentPositions.push({ x, time: now });

		// Keep max 10 positions
		if (recentPositions.length > 10) {
			recentPositions.shift();
		}

		velocityTrackingRef.current.positions = recentPositions;
	}, []);

	// Set resume timeout for mobile after item interaction
	const setResumeTimeout = useCallback(() => {
		clearResumeTimeout();
		resumeTimeoutRef.current = setTimeout(() => {
			setHasItemActive(false);
			lastTimeRef.current = Date.now();
		}, 3000);
	}, [clearResumeTimeout]);

	// Main animation loop
	useEffect(() => {
		if (shouldPauseAnimation || !mounted) return;

		const animate = () => {
			const now = Date.now();
			const deltaTime = (now - lastTimeRef.current) / 1000;
			lastTimeRef.current = now;

			setCurrentOffset((prevOffset) => {
				let newOffset = prevOffset + speed * deltaTime;

				// Create seamless infinite loop
				if (newOffset >= totalWidth) {
					newOffset = newOffset - totalWidth;
				}

				return newOffset;
			});

			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [shouldPauseAnimation, mounted, speed, totalWidth]);

	// Mouse events
	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (!containerRef.current) return;

			// Stop any ongoing momentum
			stopMomentumAnimation();

			setIsDragging(true);
			setHasUserInteracted(true);
			clearResumeTimeout();

			const startTime = Date.now();
			setDragStart({
				x: e.clientX,
				scrollLeft: currentOffset,
				time: startTime,
			});

			// Initialize velocity tracking
			velocityTrackingRef.current = {
				positions: [{ x: e.clientX, time: startTime }],
				velocity: 0,
			};

			e.preventDefault();
		},
		[currentOffset, clearResumeTimeout, stopMomentumAnimation]
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging || !containerRef.current) return;

			e.preventDefault();
			const deltaX = e.clientX - dragStart.x;
			let newOffset = dragStart.scrollLeft - deltaX;

			// Handle infinite loop during drag
			if (newOffset >= totalWidth) {
				newOffset = newOffset - totalWidth;
				setDragStart((prev) => ({
					...prev,
					scrollLeft: prev.scrollLeft - totalWidth,
				}));
			} else if (newOffset < 0) {
				newOffset = newOffset + totalWidth;
				setDragStart((prev) => ({
					...prev,
					scrollLeft: prev.scrollLeft + totalWidth,
				}));
			}

			setCurrentOffset(newOffset);

			// Track position for velocity calculation
			trackPosition(e.clientX);
		},
		[isDragging, dragStart, totalWidth, trackPosition]
	);

	const handleMouseUp = useCallback(() => {
		if (isDragging) {
			// Calculate final velocity and start momentum animation
			const velocity = calculateVelocity() * MOMENTUM_CONFIG.velocityMultiplier;

			if (Math.abs(velocity) > MOMENTUM_CONFIG.minVelocity * 10) {
				// Start momentum scrolling
				animateMomentum(-velocity, currentOffset); // Negative because we want opposite direction
			} else {
				// No momentum, just resume normal animation
				lastTimeRef.current = Date.now();
			}
		}
		setIsDragging(false);
	}, [isDragging, currentOffset, calculateVelocity, animateMomentum]);

	// Touch events
	const handleTouchStart = useCallback(
		(e: React.TouchEvent) => {
			if (!containerRef.current) return;

			// Stop any ongoing momentum
			stopMomentumAnimation();

			setIsDragging(true);
			setHasUserInteracted(true);
			clearResumeTimeout();

			const touch = e.touches[0];
			const startTime = Date.now();
			setDragStart({
				x: touch.clientX,
				scrollLeft: currentOffset,
				time: startTime,
			});

			// Initialize velocity tracking
			velocityTrackingRef.current = {
				positions: [{ x: touch.clientX, time: startTime }],
				velocity: 0,
			};
		},
		[currentOffset, clearResumeTimeout, stopMomentumAnimation]
	);

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			if (!isDragging || !containerRef.current) return;

			const touch = e.touches[0];
			const deltaX = touch.clientX - dragStart.x;
			let newOffset = dragStart.scrollLeft - deltaX;

			// Handle infinite loop during drag
			if (newOffset >= totalWidth) {
				newOffset = newOffset - totalWidth;
				setDragStart((prev) => ({
					...prev,
					scrollLeft: prev.scrollLeft - totalWidth,
				}));
			} else if (newOffset < 0) {
				newOffset = newOffset + totalWidth;
				setDragStart((prev) => ({
					...prev,
					scrollLeft: prev.scrollLeft + totalWidth,
				}));
			}

			setCurrentOffset(newOffset);

			// Track position for velocity calculation
			trackPosition(touch.clientX);
		},
		[isDragging, dragStart, totalWidth, trackPosition]
	);

	const handleTouchEnd = useCallback(() => {
		if (isDragging) {
			// Calculate final velocity and start momentum animation
			const velocity = calculateVelocity() * MOMENTUM_CONFIG.velocityMultiplier;

			if (Math.abs(velocity) > MOMENTUM_CONFIG.minVelocity * 10) {
				// Start momentum scrolling
				animateMomentum(-velocity, currentOffset); // Negative because we want opposite direction
			} else {
				// No momentum, just resume normal animation
				lastTimeRef.current = Date.now();
			}
		}
		setIsDragging(false);
	}, [isDragging, currentOffset, calculateVelocity, animateMomentum]);

	// Mouse enter/leave events
	const handleMouseEnter = useCallback(() => {
		setIsHovered(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsHovered(false);
		if (
			hasUserInteracted &&
			!isDragging &&
			!hasItemActive &&
			!isMomentumScrolling
		) {
			// Resume animation when mouse leaves
			lastTimeRef.current = Date.now();
		}
	}, [hasUserInteracted, isDragging, hasItemActive, isMomentumScrolling]);

	// Item click/tap handler
	const handleItemClick = useCallback(
		(e: React.MouseEvent) => {
			// Prevent click if we just finished dragging
			if (Math.abs(velocityTrackingRef.current.velocity) > 50) {
				e.preventDefault();
				return;
			}

			// On mobile/tablet, set item as active
			if ('ontouchstart' in window) {
				setHasUserInteracted(true);
				setHasItemActive(true);
				setResumeTimeout();
			}
		},
		[setResumeTimeout]
	);

	// Global mouse/touch event listeners
	useEffect(() => {
		const handleGlobalMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;
			const deltaX = e.clientX - dragStart.x;
			let newOffset = dragStart.scrollLeft - deltaX;

			// Handle infinite loop during drag
			if (newOffset >= totalWidth) {
				newOffset = newOffset - totalWidth;
				setDragStart((prev) => ({
					...prev,
					scrollLeft: prev.scrollLeft - totalWidth,
				}));
			} else if (newOffset < 0) {
				newOffset = newOffset + totalWidth;
				setDragStart((prev) => ({
					...prev,
					scrollLeft: prev.scrollLeft + totalWidth,
				}));
			}

			setCurrentOffset(newOffset);
			trackPosition(e.clientX);
		};

		const handleGlobalMouseUp = () => {
			if (isDragging) {
				// Calculate final velocity and start momentum animation
				const velocity =
					calculateVelocity() * MOMENTUM_CONFIG.velocityMultiplier;

				if (Math.abs(velocity) > MOMENTUM_CONFIG.minVelocity * 10) {
					// Start momentum scrolling
					animateMomentum(-velocity, currentOffset);
				} else {
					// No momentum, just resume normal animation
					lastTimeRef.current = Date.now();
				}
			}
			setIsDragging(false);
		};

		const handleGlobalTouchMove = (e: TouchEvent) => {
			if (!isDragging) return;
			const touch = e.touches[0];
			const deltaX = touch.clientX - dragStart.x;
			let newOffset = dragStart.scrollLeft - deltaX;

			// Handle infinite loop during drag
			if (newOffset >= totalWidth) {
				newOffset = newOffset - totalWidth;
				setDragStart((prev) => ({
					...prev,
					scrollLeft: prev.scrollLeft - totalWidth,
				}));
			} else if (newOffset < 0) {
				newOffset = newOffset + totalWidth;
				setDragStart((prev) => ({
					...prev,
					scrollLeft: prev.scrollLeft + totalWidth,
				}));
			}

			setCurrentOffset(newOffset);
			trackPosition(touch.clientX);
		};

		const handleGlobalTouchEnd = () => {
			if (isDragging) {
				// Calculate final velocity and start momentum animation
				const velocity =
					calculateVelocity() * MOMENTUM_CONFIG.velocityMultiplier;

				if (Math.abs(velocity) > MOMENTUM_CONFIG.minVelocity * 10) {
					// Start momentum scrolling
					animateMomentum(-velocity, currentOffset);
				} else {
					// No momentum, just resume normal animation
					lastTimeRef.current = Date.now();
				}
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
	}, [
		isDragging,
		dragStart,
		totalWidth,
		currentOffset,
		calculateVelocity,
		animateMomentum,
		trackPosition,
	]);

	// Cleanup timeout and animation on unmount
	useEffect(() => {
		return () => {
			clearResumeTimeout();
			stopMomentumAnimation();
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [clearResumeTimeout, stopMomentumAnimation]);

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
				.seamless-scroll-track {
					transform: translateX(-${currentOffset}px);
					will-change: transform;
				}

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
				<div ref={trackRef} className='seamless-scroll-track flex'>
					{/* First set */}
					{items.map((item, index) => renderProjectCard(item, index, 0))}
					{/* Second set for seamless loop */}
					{items.map((item, index) => renderProjectCard(item, index, 1))}
					{/* Third set for extra buffer during fast scrolling */}
					{items.map((item, index) => renderProjectCard(item, index, 2))}
				</div>
			</div>
		</>
	);
}
