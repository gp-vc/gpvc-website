import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'GPVC',
	description:
		'Global Content Media Group providing innovative solutions across various fields',
};

// Root layout - minimal setup to avoid hydration issues
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
