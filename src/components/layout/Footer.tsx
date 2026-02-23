import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface FooterProps {
    locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
    const content = {
        ko: {
            address: '서울 강남구 언주로157길 6, 3층',
            phone: '+82-1600-1228',
            email: 'info@gp-vc.com',
            copyright: '©2025 GPVC Co.,Ltd. 모든 권리 보유.',
            privacyPolicy: '개인정보처리방침',
            familySite: 'Family Site',
        },
        en: {
            address: '3F, 6, Eonju-ro 157-gil, Gangnam-gu, Seoul, Republic of Korea, 06024',
            phone: '+82-1600-1228',
            email: 'info@gp-vc.com',
            copyright: '©2025 GPVC Co.,Ltd. All rights reserved.',
            privacyPolicy: 'Privacy Policy',
            familySite: 'Family Site',
        },
    };

    const t = content[locale];

    return (
        <footer className='bg-black text-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14'>
                {/* 3분할 레이아웃 (모바일은 1열, PC는 3열) */}
				<div className='grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-12 items-start'>                    
                    {/* 1. 왼쪽: 회사 로고 */}
                    <div className='flex justify-start'>
                        <div className='w-32 h-16 relative'>
                            <Image
                                src='/branding/gpvc-text-logo-primary.svg'
                                alt='GPVC'
                                fill
                                className='object-contain drop-shadow-2xl'
                                sizes='128px'
                            />
                        </div>
                    </div>

                    {/* 2. 가운데: 회사 정보 (연락처) */}
                    <div className='space-y-3'>
                        <div className='flex items-start space-x-3'>
                            <MapPin size={16} className='text-[#bdb9dc] mt-1 flex-shrink-0' />
                            <span className='text-gray-300 text-sm leading-relaxed'>{t.address}</span>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <Phone size={16} className='text-[#bdb9dc] flex-shrink-0' />
                            <span className='text-gray-300 text-sm'>{t.phone}</span>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <Mail size={16} className='text-[#bdb9dc] flex-shrink-0' />
                            <span className='text-gray-300 text-sm'>{t.email}</span>
                        </div>
                    </div>

                    {/* 3. 오른쪽: 패밀리 사이트 & 소셜 */}
                    <div className='flex flex-col md:items-end space-y-6'>
                        {/* Family Site Link */}
                        <div className='flex flex-col md:items-start'>
                            <span className='text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-2'>{t.familySite}</span>
                            <Link 
                                href="https://www.gpvcgs.com" 
                                target="_blank" 
                                className='text-gray-300 hover:text-[#bdb9dc] text-sm font-medium flex items-center transition-all group border-b border-transparent hover:border-[#bdb9dc] pb-0.5'
                            >
                                GPVC Global Sourcing
                                <ExternalLink size={14} className="ml-1.5 opacity-40 group-hover:opacity-100 transition-all" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 하단 Divider & Copyright */}
                <div className='border-t border-gray-900 mt-12 pt-8'>
                    <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
                        <p className='text-gray-500 text-xs tracking-wide'>{t.copyright}</p>

                        <Link
                            href={`/${locale}/privacy-policy`}
                            className='text-gray-500 hover:text-white transition-colors duration-200 text-xs underline underline-offset-4 decoration-gray-700'
                        >
                            {t.privacyPolicy}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}