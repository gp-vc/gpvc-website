import { Inter } from 'next/font/google';
import '../globals.css';
import { Locale } from '@/lib/i18n';
import Header from '@/components/layout/HeaderV2';
import Footer from '@/components/layout/Footer';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const resolvedParams = await params;
	const { locale } = resolvedParams;

	return (
		<html lang={locale} className={inter.variable}>
			<head>
				<title>GPVC - Global Content Media Group</title>
				<meta
					name='description'
					content='Global Content Media Group providing innovative solutions across various fields'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</head>
			<body className={`${inter.className} antialiased`}>
				<Header locale={locale} />
				<main>{children}</main>
				<Footer locale={locale} />
			</body>
		</html>
	);
}
