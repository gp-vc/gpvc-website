'use client';
import { useEffect, useRef, useState } from 'react';
import { Locale } from '@/lib/i18n';

interface AboutProps {
	locale: Locale;
}

export default function About({ locale }: AboutProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	return (
		<section
			id='about'
			ref={sectionRef}
			className='py-8 lg:py-16 bg-transparent relative overflow-hidden'
		>
			
		</section>
	);
}
