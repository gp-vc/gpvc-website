import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	trailingSlash: true,
	output: 'export',
	images: {
		unoptimized: true,
	},
	// Disable server components for static export
	// experimental: {
	// 	missingSuspenseWithCSRBailout: false,
	// },
	// Handle basePath for different deployment environments
	basePath: process.env.NODE_ENV === 'production' ? '' : '',
	// Ensure static export works with dynamic routes
	distDir: 'out',
};

export default nextConfig;
