'use client';
import { useEffect, useRef, useState } from 'react';
import { Locale } from '@/lib/i18n';

interface AboutProps {
	locale: Locale;
}

export default function About({ locale }: AboutProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [isVideoInView, setIsVideoInView] = useState(false);

	// Extract video ID from YouTube URL
	const videoId = 'CRPDP6IxpnI';

	// YouTube embed URL with autoplay parameters
	const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&showinfo=0&controls=1&enablejsapi=1&origin=${
		typeof window !== 'undefined' ? window.location.origin : ''
	}`;

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-slide-up');

						// If this is the video section, trigger autoplay
						if (entry.target === sectionRef.current) {
							setIsVideoInView(true);
						}
					} else {
						// Optional: Pause video when out of view
						if (entry.target === sectionRef.current) {
							setIsVideoInView(false);
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

	// Handle iframe load and send autoplay command
	useEffect(() => {
		if (isVideoInView && iframeRef.current) {
			// Send play command to YouTube iframe
			try {
				iframeRef.current.contentWindow?.postMessage(
					'{"event":"command","func":"playVideo","args":""}',
					'*'
				);
			} catch (error) {
				console.log('YouTube autoplay command failed:', error);
			}
		}
	}, [isVideoInView]);

	return (
		<section
			id='about'
			ref={sectionRef}
			className='py-8 lg:py-16 bg-transparent relative overflow-hidden'
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* YouTube Video Container */}
				<div className='animate-on-scroll'>
					<div className='relative w-full bg-black/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl'>
						{/* Responsive iframe container */}
						<div
							className='relative w-full'
							style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
						>
							<iframe
								ref={iframeRef}
								src={embedUrl}
								title='GPVC Company Video'
								className='absolute inset-0 w-full h-full border-0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								allowFullScreen
								loading='lazy'
							/>
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
