import FixedScene3D from '@/components/3d/Scene3D';
import ClientOnly from '@/components/ui/ClientOnly';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import BusinessAreas from '@/components/sections/BusinessAreas';
import Projects from '@/components/sections/Projects';
// import Contact from '@/components/sections/Contact'; // Removed unused import
import { Locale } from '@/lib/i18n';

// This is required for `output: export` with dynamic routes
export async function generateStaticParams() {
	const locales: Locale[] = ['en', 'ko'];
	return locales.map((locale) => ({ locale }));
}

export default async function Home({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}) {
	const { locale } = await params;

	return (
		<div className='relative'>
			{/* <ClientOnly
				fallback={
					<div className='w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800' />
				}
			>
				<FixedScene3D />
			</ClientOnly> */}
			<Hero locale={locale} />
			<About locale={locale} />
			<BusinessAreas locale={locale} />
			<Projects locale={locale} />
			{/* <Contact locale={locale} /> */}
		</div>
	);
}
