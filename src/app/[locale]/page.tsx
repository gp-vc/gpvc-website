import Scene3D from '@/components/3d/Scene3D';
// import Hero from '@/components/sections/Hero';
// import About from '@/components/sections/About';
import BusinessAreas from '@/components/sections/BusinessAreas';
import Projects from '@/components/sections/Projects';
// import Contact from '@/components/sections/Contact';
import { Locale } from '@/lib/i18n';

// This is required for `output: export` with dynamic routes
export async function generateStaticParams() {
  // If you know your supported locales, list them here
  const locales: Locale[] = ['en', 'ko']; 
  return locales.map((locale) => ({ locale }));
}

export default function Home({
	params: { locale },
}: {
	params: { locale: Locale };
}) {
	return (
		<div className='relative'>
			<Scene3D />
			{/* <Hero locale={locale} />
			<About locale={locale} /> */}
			<BusinessAreas locale={locale} />
			{/* <Projects locale={locale} /> */}
			{/* <Contact locale={locale} /> */}
		</div>
	);
}
