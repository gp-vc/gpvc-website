'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface CarouselProps {
	items: any[];
	renderItem: (item: any, index: number) => React.ReactNode;
}

export default function Carousel({ items, renderItem }: CarouselProps) {
	return (
		<Swiper
			modules={[Autoplay, Pagination]}
			// spaceBetween={30}
			slidesPerView={2}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
			}}
			// pagination={{ clickable: true }}
			loop={true}
			breakpoints={{
				// 768: {
				// 	slidesPerView: 3,
				// },
				1024: {
					slidesPerView: 3,
				},
			}}
			className='w-full'
		>
			{items.map((item, index) => (
				<SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
			))}
		</Swiper>
	);
}
