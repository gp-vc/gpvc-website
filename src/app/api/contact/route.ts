import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }
});

async function verifyRecaptcha(token: string) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        throw new Error("RECAPTCHA_SECRET_KEY 환경 변수가 설정되지 않았습니다.");
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const response = await fetch(verificationUrl, {
        method: 'POST',
    });

    return response.json();
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, message, recaptchaToken } = body;

        if (!firstName || !lastName || !email || !message || !recaptchaToken ) {
            return NextResponse.json({ message: '필수 필드가 누락되었습니다.' }, { status: 400 });
        }

        const recaptchaResult = await verifyRecaptcha(recaptchaToken);

        if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
            console.warn(`reCAPTCHA 검증 실패 (점수: ${recaptchaResult.score}). 요청 차단.`);
            return NextResponse.json({ message: '보안 검증에 실패했습니다. (봇 의심)' }, { status: 403 }); 
        }

        const mailOptions = {
            from: process.env.SMTP_USER, // 보내는 사람 (SMTP 계정과 일치)
            to: process.env.COMPANY_RECEIVER_EMAIL, // 받는 사람 (info@gp-vc.com)
            replyTo: email, // 회신 주소는 고객 이메일로 설정
            subject: `[홈페이지 문의] ${lastName}${firstName} 님으로부터`,
            html: `
                <p><strong>보낸 사람:</strong> ${lastName}${firstName}</p>
                <p><strong>이메일:</strong> ${email}</p>
                <hr>
                <p><strong>메시지:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: '문의가 성공적으로 전송되었습니다.' }, { status: 200 });
    } catch (error) {
        console.error('이메일 전송 오류:', error);
        return NextResponse.json({ message: '이메일 전송에 실패했습니다. (서버 오류)' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Contact API is working' }, { status: 200 });
};