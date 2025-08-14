// src/types/svg.d.ts
// This file tells TypeScript how to handle SVG imports

declare module '*.svg' {
	const content: string;
	export default content;
}

// Alternative if you want more specific typing:
declare module '*.svg' {
	import { StaticImageData } from 'next/image';
	const content: StaticImageData;
	export default content;
}
