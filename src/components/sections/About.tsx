'use client';
import { useEffect, useRef, useState } from 'react';

export default function About() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Always run - mount detection
	useEffect(() => {
		setMounted(true);
	}, []);

	// Always run - video setup
	useEffect(() => {
		const video = videoRef.current;
		if (!video || !mounted) return;

		const handleCanPlay = () => {
			setIsVideoLoaded(true);
		};

		const handleLoadedData = () => {
			setIsVideoLoaded(true);
		};

		const handleError = () => {
			console.error('Video failed to load');
			setIsVideoLoaded(true);
		};

		video.addEventListener('canplay', handleCanPlay);
		video.addEventListener('loadeddata', handleLoadedData);
		video.addEventListener('error', handleError);

		// Force load the video
		video.load();

		return () => {
			video.removeEventListener('canplay', handleCanPlay);
			video.removeEventListener('loadeddata', handleLoadedData);
			video.removeEventListener('error', handleError);
		};
	}, [mounted]);

	// Always run - intersection observer
	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-slide-up');

						if (videoRef.current && isVideoLoaded) {
							videoRef.current.play().catch(console.error);
						}
					}
				});
			},
			{ threshold: 0.3 }
		);

		observer.observe(section);
		return () => observer.disconnect();
	}, [isVideoLoaded]);

	// Early return after all hooks
	if (!mounted) {
		return (
			<section
				id='about'
				className='relative min-h-screen flex items-center justify-center overflow-hidden'
			>
				<div className='absolute inset-0 bg-gradient-to-br from-[#bdb9dc] to-[#827bb8] flex items-center justify-center'>
					<div className='w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
				</div>
			</section>
		);
	}

	return (
		<section
			id='about'
			ref={sectionRef}
			className='relative min-h-screen flex items-center justify-center overflow-hidden'
		>
			{/* Video Background */}
			<div className='absolute inset-0 w-full h-full'>
				<video
					ref={videoRef}
					className='w-full h-full object-cover'
					autoPlay
					muted
					loop
					playsInline
					preload='metadata'
				>
					<source src='/stock-videos/about.webm' type='video/webm' />
				</video>

				{/* Dark overlay for text readability */}
				<div className='absolute inset-0 bg-black/40'></div>
			</div>

			{/* Loading indicator for video */}
			{!isVideoLoaded && (
				<div className='absolute inset-0 bg-gradient-to-br from-[#bdb9dc] to-[#827bb8] flex items-center justify-center z-20'>
					<div className='text-center text-white'>
						<div className='w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
						<p className='text-sm opacity-80'>Loading video...</p>
					</div>
				</div>
			)}
		</section>
	);
}
