// src/app/[locale]/layout.tsx
import localFont from 'next/font/local';
import '../globals.css';
import { Locale } from '@/lib/i18n';
import Header from '@/components/layout/HeaderV2';
import Footer from '@/components/layout/Footer';

// Define the custom Noto Sans KR variable font
const notoSansKR = localFont({
	src: '../fonts/notosanskr-vf.ttf',
	variable: '--font-noto-sans-kr',
	display: 'swap',
	// Optional: Define weight range for variable font
	weight: '100 900',
	// Optional: Define style if the font supports italic
	style: 'normal',
	// Optional: Preload the font for better performance
	preload: true,
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
		<html lang={locale} className={notoSansKR.variable}>
			<head>
				<title>GPVC - Global Content Media Group</title>
				<meta
					name='description'
					content='Global Content Media Group providing innovative solutions across various fields'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name="naver-site-verification" content="306ed7453d7ce2744afbfc06876533c7afc82c45" />
				<meta name="google-site-verification" content="hj-IFgwGxsjRrm_7Yiscrmv1iVqnj-8VksqDnOCnKMc" />
			</head>
			<body className={`${notoSansKR.className} antialiased`}>
				<Header locale={locale} />
				<main>{children}</main>
				<Footer locale={locale} />
			</body>
		</html>
	);
}
