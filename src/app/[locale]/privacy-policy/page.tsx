import PrivacyPolicy from '@/components/sections/PrivacyPolicy';
import { Locale } from '@/lib/i18n';

// This is required for `output: export` with dynamic routes
// export async function generateStaticParams() {
// 	const locales: Locale[] = ['en', 'ko'];
// 	return locales.map((locale) => ({ locale }));
// }

export default async function PrivacyPolicyPage({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}) {
	const { locale } = await params;

	return <PrivacyPolicy locale={locale} />;
}
