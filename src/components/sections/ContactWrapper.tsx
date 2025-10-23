'use client';

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Contact from "./Contact";

type Locale = 'ko' | 'en';

interface ContactProps {
    locale: Locale;
}

export default function ContactWrapper({ locale }: ContactProps) {
    const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    if (!reCaptchaKey) {
        console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY가 설정되지 않아 reCAPTCHA가 비활성화됩니다.");
    }

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={reCaptchaKey || "dummy-key"}
            scriptProps={{ async: true, defer: true }}
        >
            <Contact locale={locale} />
        </GoogleReCaptchaProvider>
    )
}