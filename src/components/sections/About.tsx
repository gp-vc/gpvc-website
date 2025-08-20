'use client';
import { useEffect, useRef, useState } from 'react';
import { Locale } from '@/lib/i18n';

interface AboutProps {
	locale: Locale;
}

export default function About({ locale }: AboutProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isVideoInView, setIsVideoInView] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-slide-up');

						// If this is the video section, trigger autoplay
						if (entry.target === sectionRef.current) {
							setIsVideoInView(true);
							// Start playing the video when it comes into view
							if (videoRef.current) {
								videoRef.current.play().catch((error) => {
									console.log('Video autoplay failed:', error);
								});
							}
						}
					} else {
						// Pause video when out of view
						if (entry.target === sectionRef.current) {
							setIsVideoInView(false);
							if (videoRef.current) {
								videoRef.current.pause();
							}
						}
					}
				});
			},
			{
				threshold: 0.3, // Video needs to be 30% visible to trigger
				rootMargin: '-10% 0px -10% 0px', // Add some margin for better UX
			}
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section
			id='about'
			ref={sectionRef}
			className='py-8 lg:py-16 bg-transparent relative overflow-hidden'
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Local Video Container */}
				<div className='animate-on-scroll'>
					<div className='relative w-full bg-black/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl'>
						{/* Responsive video container */}
						<div
							className='relative w-full'
							style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
						>
							<video
								ref={videoRef}
								className='absolute inset-0 w-full h-full border-0 object-cover'
								controls
								muted
								loop
								playsInline
								preload='metadata'
								poster='/stock-images/video-poster.jpg' // Optional: add a poster image
							>
								<source src='/stock-videos/about.mp4' type='video/mp4' />
								Your browser does not support the video tag.
							</video>
						</div>

						{/* Optional overlay for branding/loading state */}
						<div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300'>
							<div className='absolute bottom-4 left-4 right-4 flex justify-between items-end'>
								<div className='text-white/90 text-sm font-medium drop-shadow-lg'>
									GPVC Company Video
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}