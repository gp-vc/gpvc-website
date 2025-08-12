'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface CarouselProps {
	items: any[];
	renderItem: (item: any, index: number) => React.ReactNode;
	autoplaySpeed?: number;
	showPagination?: boolean;
	effectType?: 'slide' | 'coverflow';
	spaceBetween?: number;
	customBreakpoints?: Record<
		number,
		{ slidesPerView: number; spaceBetween: number }
	>;
}

export default function Carousel({
	items,
	renderItem,
	autoplaySpeed = 3000,
	showPagination = false,
	effectType = 'slide',
	spaceBetween = 30,
	customBreakpoints,
}: CarouselProps) {
	const defaultBreakpoints = {
		640: {
			slidesPerView: effectType === 'coverflow' ? 1.5 : 2,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: effectType === 'coverflow' ? 2 : 2.5,
			spaceBetween: 25,
		},
		1024: {
			slidesPerView: effectType === 'coverflow' ? 2.5 : 3,
			spaceBetween: spaceBetween,
		},
		1280: {
			slidesPerView: effectType === 'coverflow' ? 3 : 3.5,
			spaceBetween: spaceBetween,
		},
	};

	const swiperConfig = {
		modules: [Autoplay, Pagination, EffectCoverflow],
		spaceBetween: spaceBetween,
		slidesPerView: 1,
		autoplay: {
			delay: autoplaySpeed,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		pagination: showPagination
			? {
					clickable: true,
					dynamicBullets: true,
					dynamicMainBullets: 3,
			  }
			: false,
		loop: true,
		speed: 800,
		centeredSlides: effectType === 'coverflow',
		breakpoints: customBreakpoints || defaultBreakpoints,
		// Add coverflow effect if specified
		...(effectType === 'coverflow' && {
			effect: 'coverflow',
			coverflowEffect: {
				rotate: 20,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true,
			},
		}),
		className: `w-full ${effectType === 'coverflow' ? 'py-8' : ''}`,
	};

	return (
		<div className='relative'>
			<Swiper {...swiperConfig}>
				{items.map((item, index) => (
					<SwiperSlide key={`${item.id || index}-${index}`} className='h-auto'>
						<div className='h-full'>{renderItem(item, index)}</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Custom pagination styling */}
			{showPagination && (
				<style jsx global>{`
					.swiper-pagination-bullet {
						background: #bdb9dc;
						opacity: 0.3;
						transition: all 0.3s ease;
					}
					.swiper-pagination-bullet-active {
						background: #bdb9dc;
						opacity: 1;
						transform: scale(1.2);
					}
					.swiper-pagination {
						bottom: -40px !important;
					}
				`}</style>
			)}
		</div>
	);
}
