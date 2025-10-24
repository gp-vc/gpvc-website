import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import BusinessAreas from '@/components/sections/BusinessAreas';
import Projects from '@/components/sections/Projects';
// import Contact from '@/components/sections/Contact';
import { Locale } from '@/lib/i18n';
import Clients from '@/components/sections/Clients';
import ContactWrapper from '@/components/sections/ContactWrapper';

// This is required for `output: export` with dynamic routes
// export async function generateStaticParams() {
// 	const locales: Locale[] = ['en', 'ko'];
// 	return locales.map((locale) => ({ locale }));
// }

export default async function Home({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}) {
	const { locale } = await params;

	return (
		<div className='relative min-h-screen'>
			{/* Fixed Video Background for entire page */}
			<div className='fixed inset-0 w-full h-full -z-50'>
				<video
					className='w-full h-full object-cover'
					autoPlay
					muted
					loop
					playsInline
					preload='auto'
				>
					<source src='/stock-videos/purple-bg.mp4' type='video/mp4' />
					{/* Fallback gradient background */}
					<div className='absolute inset-0 bg-gradient-to-br from-[#bdb9dc] to-[#827bb8]'></div>
				</video>

				{/* Optional: Add a subtle overlay to ensure text readability */}
				<div className='absolute inset-0 bg-black/20'></div>
			</div>

			{/* All sections with transparent/glass backgrounds */}
			<div className='relative z-10'>
				<Hero locale={locale} />
				<About />
				<BusinessAreas locale={locale} />
				<Projects locale={locale} />
				<Clients locale={locale} />
				<ContactWrapper locale={locale} />
				{/* <Contact locale={locale} /> */}
			</div>
		</div>
	);
}
