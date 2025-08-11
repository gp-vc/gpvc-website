import { Inter } from 'next/font/google';
import '../globals.css';
import { Locale } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: Locale };
}) {
	return (
		<html lang={locale}>
			<body className={inter.className}>
				<Header locale={locale} />
				<main>{children}</main>
				<Footer locale={locale} />
			</body>
		</html>
	);
}
