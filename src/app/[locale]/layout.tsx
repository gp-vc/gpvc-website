import { Inter } from 'next/font/google';
import '../globals.css';
import { Locale } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: Locale };
}) {
	return (
		<html lang={locale} className={inter.variable}>
			<body className={`${inter.className} antialiased`}>
				<Header locale={locale} />
				<main>{children}</main>
				<Footer locale={locale} />
			</body>
		</html>
	);
}
