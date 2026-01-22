// src/assets/logos/index.ts
// This file exports all logo imports for easy management

// Import all SVG files as static assets
import shinsegaeLogo from './house-of-shinsegae.png';
import mbcPlusLogo from './mbc-plus.svg';
import mbcEveryoneLogo from './mbc-everyone.svg';
import tvingLogo from './tving.svg';
import wavveLogo from './wavve.svg';
import shortimeLogo from './shortime.svg';
import pledisLogo from './pledis.svg';
import ygLogo from './yg.svg';
import inkodeLogo from './inkode.svg';
import viuLogo from './viu.svg';
import viuTvLogo from './viu-tv.svg';
import elCaprichoLogo from './el-capricho.png';
// import datVietVacLogo from './dat-viet-vac.svg';
import vieOnLogo from './vie-on.svg';
import management from './management.png';
import rainCompany from './rain-company.png';
import closDeLobac from './clos-de-lobac.svg'
import echoHk from './echo-hk.svg'
import masDenBruno from './mas-den-bruno.svg'
import dramaboxLogo from './dramabox.svg';
import reelshortLogo from './reelshort.svg';
import viglooLogo from './vigloo.svg';
import hamadaVineyardLogo from './hamada-vineyard.svg'

// Export all logos with metadata
export const clientLogos = [
	{
		name: 'Pledis',
		src: pledisLogo,
		alt: 'Pledis Entertainment Logo',
	},
	{
		name: 'YG',
		src: ygLogo,
		alt: 'YG Entertainment Logo',
	},
	{
		name: 'Inkode',
		src: inkodeLogo,
		alt: 'Inkode Logo',
	},
	{
		name: 'TVING',
		src: tvingLogo,
		alt: 'TVING Logo',
	},
	{
		name: 'Wavve',
		src: wavveLogo,
		alt: 'Wavve Logo',
	},
	{
		name: 'Shortime',
		src: shortimeLogo,
		alt: 'Shortime Logo',
	},
	{
		name: 'Viu',
		src: viuLogo,
		alt: 'Viu Logo',
	},
	{
		name: 'ViuTV',
		src: viuTvLogo,
		alt: 'ViuTV Logo',
	},
	{
		name: 'ElCapricho',
		src: elCaprichoLogo,
		alt: 'ElCapricho Logo',
	},
	{
		name: 'VieON',
		src: vieOnLogo,
		alt: 'VieON Logo',
	},
	{
		name: 'RainCompany',
		src: rainCompany,
		alt: 'RainCompany Logo',
	},
	{
		name: 'Hamada Vineyard',
		src: hamadaVineyardLogo,
		alt: 'Hamada Vineyard Logo',
	},
	// {
	// 	name: 'Echo HK',
	// 	src: echoHk,
	// 	alt: 'Echo HK Logo',
	// },
	{
		name: 'Shinsegae',
		src: shinsegaeLogo,
		alt: 'Shinsegae Logo',
	},
	{
		name: "Clos de L'obac",
		src: closDeLobac,
		alt: "Clos de L'obac Logo",
	},
	{
		name: 'Mas den Bruno',
		src: masDenBruno,
		alt: 'Mas den Bruno Logo',
	},
	{
		name: 'MBC Plus',
		src: mbcPlusLogo,
		alt: 'MBC Plus Logo',
	},
	{
		name: 'MBC Everyone',
		src: mbcEveryoneLogo,
		alt: 'MBC Everyone Logo',
	},
	{
		name: 'Management',
		src: management,
		alt: 'Management Logo',
	},
	// {
	// 	name: 'ReelShort',
	// 	src: reelshortLogo,
	// 	alt: 'ReelShort Logo',
	// },
	// {
	// 	name: 'DramaBox',
	// 	src: dramaboxLogo,
	// 	alt: 'DramaBox Logo',
	// },
	// {
	// 	name: 'Vigloo',
	// 	src: viglooLogo,
	// 	alt: 'Vigloo Logo',
	// }
] as const;

// Optional: Export individual logos if needed elsewhere
export {
	shinsegaeLogo,
	mbcPlusLogo,
	mbcEveryoneLogo,
	tvingLogo,
	wavveLogo,
	shortimeLogo,
	pledisLogo,
	ygLogo,
	inkodeLogo,
	viuLogo,
	viuTvLogo,
	elCaprichoLogo,
	vieOnLogo,
	management,
	rainCompany,
	viglooLogo,
	dramaboxLogo,
	reelshortLogo
};
