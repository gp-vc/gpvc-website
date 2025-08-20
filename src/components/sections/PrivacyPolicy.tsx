import { Locale } from '@/lib/i18n';

interface PrivacyPolicyProps {
	locale: Locale;
}

export default function PrivacyPolicy({ locale }: PrivacyPolicyProps) {
	const content = {
		ko: {
			title: '개인정보처리방침',
			backToHome: '홈으로 돌아가기',
			content: `
제1조(목적) 주식회사 지피브이씨(이하 '회사' 라고 함)는 회사가 제공하고자 하는 서비스(이하 '회사 서비스')를 이용하는 개인(이하 '이용자' 또는 '개인')의 정보를 보호하기 위해, 개인정보보호법, 정보통신망 이용 촉진 및 정보보호 등에 관한 법률(이하 '정보통신망법')등 관련 법령을 준수하고, 서비스 이용자의 개인 정보 보호 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침(이하 '본 방침')을 수립합니다.

제2조(개인정보 처리의 원칙) 개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며, 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게 제공될 수 있습니다. 단, 법령의 규정 등에 의해 적법하게 강제되는 경우 회사는 수집한 개인정보를 사전에 개인의 동의 없이 제3자에게 제공할 수도 있습니다.

제3조(본 방침의 공개) 1. 회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사 홈페이지 첫 화면 또는 첫 화면과의 연결화면을 통해 본 방침을 공개하고 있습니다. 2. 회사는 제 1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상 등을 활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록 합니다.

제4조(본 방침의 변경) 1. 본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사 서비스 정책이나 내용의 변경에 따라 개정될 수 있습니다. 2. 회사는 제1항에 따라 본 방침을 개정하는 경우 다음 각 호 하나 이상의 방법으로 공지합니다. 가. 회사가 운영하는 인터넷 홈페이지의 첫 화면의 공지사항란 또는 별도의 창을 통하여 공지하는 방법 나. 서면, 모사전송, 전자우편 또는 이와 비슷한 방법으로 이용자에게 공지하는 방법 3. 회사는 제2항의 공지는 본 방침 개정의 시행일로부터 최소 7일 이전에 공지합니다. 다만, 이용자의 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 공지합니다.

제5조(회사 서비스 제공을 위한 정보) 회사는 이용자에게 회사의 서비스를 제공하기 위하여 다음과 같은 정보를 수집합니다. 1. 필수 수집 정보: 아이디, 이메일 주소, 이름 및 연락처

제6조(개인정보 수집 방법) 회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다. 1. 이용자가 회사 서비스가 제공되는 홈페이지에 자신의 개인정보를 입력하는 방식 2. 이용자가 회사가 발송한 링크를 수신 받아 개인정보를 입력하는 방식

제7조(개인정보의 이용) 회사는 개인정보를 다음 각 호의 경우에 이용합니다. 1. 이용문의에 대한 회신, 이용자에 대한 서비스 개선을 위한 경우 2. 회사의 서비스를 제공하기 위한 경우 3. 법령 및 회사 약관을 위반하는 회원에 대한 이용 제재, 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재를 위한 경우.

제8조(개인정보의 보유 및 이용 기간) 1. 회사는 이용자의 개인정보에 대해 개인정보의 수집, 이용 목적 달성을 위한 기간동안 개인정보를 보유 및 이용합니다. 2. 전항에도 불구하고 회사는 내부 방침에 의해 서비스 부정이용기록은 부정 가입 및 이용방지를 위하여 회원 탈퇴 시점으로부터 최대 3년간 보관합니다.

제9조(법령에 따른 개인정보의 보유 및 이용기간) 회사는 관계법령에 따라 다음과 같이 개인정보를 보유 및 이용합니다. 1. 통신비밀보호법에 따른 보유 정보 및 보유 기간 가. 웹사이트 로그 기록자료: 5년

제10조(개인정보 파기원칙) 회사는 원칙적으로 이용자의 개인정보 처리 목적의 달성, 보유 및 이용기간의 경과 등 개인정보가 필요하지 않을 경우에는 해당 정보를 지체 없이 파기합니다.

제11조(개인정보파기절차) 회사는 파기 사유가 발생한 개인정보를 개인정보보호 책임자의 승인절차를 거쳐 파기합니다.

제12조(개인정보파기방법) 회사는 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제 및 파기합니다.

제13조(개인정보 조회 및 수집동의 철회) 1. 이용자 및 법정 대리인은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 개인정보 수집 동의 철회를 요청할 수 있습니다. 2. 이용자 및 법정대리인은 자신의 가입정보 수집 등에 대한 동의를 철회하기 위해서는 개인정보보호책임자 또는 담당자에게 서면, 전화 또는 전자우편을 통해 연락하시면 회사는 지체 없이 조치하겠습니다.

제14조(개인정보 정보 변경 등) 1. 이용자는 회사에게 제13조의 방법을 통해 개인정보의 오류에 대한 정정을 요청할 수 있습니다. 2. 회사는 전항의 경우에 개인정보의 정정을 완료하기 전까지 개인정보를 이용 또는 제공하지 않으며 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정처리결과를 제3자에게 지체없이 통지하여 정정이 이루어지도록 하겠습니다.

제15조(이용자의 의무) 1. 이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 이용자의 부정확한 정보 입력으로 발생하는 문제의 책임은 이용자 자신에게 있습니다.

제16조(회사의 개인정보 관리) 회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 훼손 등이 되지 아니하도록 안정성을 확보하기 위한 기술적, 관리적 보호대책을 강구하고 있습니다.

제17조(해킹 등에 대비한 대책) 1. 회사는 해킹, 컴퓨터바이러스 등 정보통신망 침입에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다. 2. 회사는 개인정보를 암호화 통신 등을 통하여 네트워크상에서 개인 정보를 안전하게 전송할 수 있도록 하고 있습니다.

제18조(개인정보 처리 최소화) 회사는 개인정보 관련 처리 담당자를 최소한으로 제한하고 있습니다.

제19조(개인정보 유출 등에 대한 조치) 회사는 개인정보의 분실, 도난, 유출(이하 "유출 등"이라 한다) 사실을 안 때에는 지체 없이 다음 각 호의 모든 사항을 이용자에게 알리고 방송통신위원회 또는 한국인터넷진흥원에 신고합니다. 1. 유출 등이 된 개인정보 항목 2. 유출 등이 발생한 시점 3. 이용자가 취할 수 있는 조치 4. 정보통신서비스 제공자 등의 대응 조치 5. 이용자가 상담 등을 접수할 수 있는 부서 및 연락처

제20조(개인정보 유출 등에 대한 조치의 예외) 회사는 전조에도 불구하고 이용자의 연락처를 알 수 없는 등 정당한 사유가 있는 경우에는 회사의 홈페이지에 30일 이상 게시하는 방법으로 전조의 통지를 갈음하는 조치를 취할 수 있습니다.

제21조(회사의 개인정보 보호 책임자 지정) 1. 회사는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호 책임자를 지정하고 있습니다. 가. 개인정보 보호 책임자 1) 성명: 이기욱 2) 직책: 과장 3) 전화번호: 010-5007-8385 4) 이메일: info@gp-vc.com 2. 회사는 개인정보의 보호를 위해 개인정보처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견될 경우 즉시 해결하고 바로잡을 수 있도록 최선을 다하고 있습니다. 3. 정보주체는 개인정보보호법 제35조에 따른 개인정보의 열람 청구를 담당 부서에 청구할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.
			`,
		},
		en: {
			title: 'Privacy Policy',
			backToHome: 'Back to Home',
			content: `
Article 1 (Purpose) GPVC Co., Ltd. (hereinafter referred to as "Company") establishes this Privacy Policy (hereinafter referred to as "Policy") to protect the information of individuals (hereinafter referred to as "Users" or "Individuals") using services provided by the Company (hereinafter referred to as "Company Services"), comply with relevant laws such as the Personal Information Protection Act and the Act on Promotion of Information and Communications Network Utilization and Information Protection (hereinafter referred to as "Information and Communications Network Act"), and to promptly and smoothly handle grievances related to personal information protection of service users.

Article 2 (Principles of Personal Information Processing) In accordance with personal information-related laws and this Policy, the Company may collect users' personal information, and collected personal information may be provided to third parties only with individual consent. However, the Company may provide collected personal information to third parties without prior individual consent when legally compelled by laws and regulations.

Article 3 (Disclosure of This Policy) 1. The Company discloses this Policy through the homepage main screen or screens linked to the main screen so that users can easily check this Policy at any time. 2. When the Company discloses this Policy according to Paragraph 1, it uses font size, color, etc. to enable users to easily check this Policy.

Article 4 (Changes to This Policy) 1. This Policy may be revised according to changes in personal information-related laws, guidelines, notices, or government or Company service policies or contents. 2. When the Company revises this Policy according to Paragraph 1, it notifies by one or more of the following methods: a. Notice through the notice section of the main screen of the internet homepage operated by the Company or through a separate window b. Notice to users by written document, facsimile transmission, electronic mail, or similar methods 3. The Company provides notice at least 7 days before the effective date of the Policy revision. However, in case of important changes to user rights, notice is provided at least 30 days in advance.

Article 5 (Information for Providing Company Services) The Company collects the following information to provide services to users: 1. Required collection information: ID, email address, name, and contact information

Article 6 (Personal Information Collection Methods) The Company collects users' personal information through the following methods: 1. Users entering their personal information on the homepage where Company services are provided 2. Users receiving links sent by the Company and entering personal information

Article 7 (Use of Personal Information) The Company uses personal information in the following cases: 1. For responding to usage inquiries and improving services for users 2. For providing Company services 3. For usage sanctions against members violating laws and Company terms, and for preventing and sanctioning acts that interfere with smooth service operation

Article 8 (Retention and Use Period of Personal Information) 1. The Company retains and uses users' personal information during the period necessary to achieve the purpose of personal information collection and use. 2. Notwithstanding the preceding paragraph, the Company retains service misuse records for up to 3 years from the time of member withdrawal to prevent fraudulent registration and use according to internal policies.

Article 9 (Retention and Use Period of Personal Information According to Laws) The Company retains and uses personal information according to relevant laws as follows: 1. Information retained and retention period according to the Protection of Communications Secrets Act a. Website log record data: 5 years

Article 10 (Personal Information Destruction Principles) In principle, the Company destroys relevant information without delay when personal information is no longer needed, such as when the purpose of personal information processing is achieved or the retention and use period has elapsed.

Article 11 (Personal Information Destruction Procedures) The Company destroys personal information for which destruction reasons have occurred through approval procedures by the personal information protection manager.

Article 12 (Personal Information Destruction Methods) The Company deletes and destroys personal information stored in electronic file format using technical methods that cannot reproduce records.

Article 13 (Personal Information Inquiry and Withdrawal of Collection Consent) 1. Users and legal representatives may inquire about or modify their registered personal information at any time and may request withdrawal of personal information collection consent. 2. To withdraw consent for collection of their registration information, users and legal representatives may contact the personal information protection manager or staff member by written document, telephone, or electronic mail, and the Company will take action without delay.

Article 14 (Changes to Personal Information, etc.) 1. Users may request correction of errors in personal information from the Company through the methods in Article 13. 2. In the case of the preceding paragraph, the Company does not use or provide personal information until correction of personal information is completed, and if incorrect personal information has already been provided to third parties, the Company will promptly notify third parties of correction results to ensure correction is made.

Article 15 (User Obligations) 1. Users must maintain their personal information in the latest state, and users are responsible for problems arising from inaccurate information input.

Article 16 (Company's Personal Information Management) The Company implements technical and managerial protection measures to ensure stability so that users' personal information is not lost, stolen, leaked, altered, or damaged when processing personal information.

Article 17 (Measures Against Hacking, etc.) 1. The Company makes every effort to prevent users' personal information from being leaked or damaged by information and communications network intrusion such as hacking and computer viruses. 2. The Company enables secure transmission of personal information over networks through encrypted communication.

Article 18 (Minimization of Personal Information Processing) The Company restricts personal information processing staff to the minimum.

Article 19 (Measures for Personal Information Leakage, etc.) When the Company becomes aware of loss, theft, or leakage (hereinafter "leakage, etc.") of personal information, it immediately notifies users of all of the following matters and reports to the Korea Communications Commission or Korea Internet & Security Agency: 1. Personal information items that were leaked, etc. 2. Time when leakage, etc. occurred 3. Measures users can take 4. Response measures by information and communications service providers, etc. 5. Department and contact information where users can receive consultation, etc.

Article 20 (Exceptions to Measures for Personal Information Leakage, etc.) Notwithstanding the preceding article, when there are legitimate reasons such as inability to know users' contact information, the Company may take measures to substitute the notification in the preceding article by posting on the Company's homepage for 30 days or more.

Article 21 (Designation of Company's Personal Information Protection Manager) 1. The Company designates relevant departments and personal information protection managers as follows to protect users' personal information and handle complaints related to personal information: a. Personal Information Protection Manager 1) Name: Lee Ki-wook 2) Position: Manager 3) Phone number: 010-5007-8385 4) Email: info@gp-vc.com 2. The Company makes every effort to check implementation of the personal information processing policy and staff compliance for personal information protection, and to immediately resolve and correct problems when discovered. 3. Data subjects may request personal information access according to Article 35 of the Personal Information Protection Act to the relevant department. The Company will strive to ensure that data subjects' personal information access requests are processed promptly.
			`,
		},
	};

	const t = content[locale];

	// Split content into paragraphs and format them
	const formatContent = (content: string) => {
		return content
			.trim()
			.split('\n\n')
			.map((paragraph, index) => {
				const trimmedParagraph = paragraph.trim();

				// Check if paragraph starts with article number pattern
				const koreanPattern = /^(제\d+조\([^)]+\))/;
				const englishPattern = /^(Article \d+ \([^)]+\))/;

				const match =
					trimmedParagraph.match(koreanPattern) ||
					trimmedParagraph.match(englishPattern);

				if (match) {
					const boldPart = match[1];
					const restOfText = trimmedParagraph.substring(boldPart.length);

					return (
						<p key={index} className='mb-6 leading-relaxed text-gray-800'>
							<strong>{boldPart}</strong>
							{restOfText}
						</p>
					);
				}

				return (
					<p key={index} className='mb-6 leading-relaxed text-gray-800'>
						{trimmedParagraph}
					</p>
				);
			});
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
			{/* Header section with background */}
			<div className='bg-gradient-to-r from-[#bdb9dc] to-[#a8a4d0] text-white pt-24 lg:pt-32 pb-4 lg:pb-6'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h1 className='text-4xl lg:text-5xl font-thin mb-8 lg:mb-10'>
						{t.title}
					</h1>
					<a
						href={`/${locale}`}
						className='inline-flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-200 text-sm border border-white/30 rounded-full px-4 py-2 hover:border-white/60'
					>
						<svg
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='m12 19-7-7 7-7' />
							<path d='M19 12H5' />
						</svg>
						<span>{t.backToHome}</span>
					</a>
				</div>
			</div>

			{/* Content section */}
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='bg-white rounded-2xl shadow-lg p-8 lg:p-12'>
					<div className='prose prose-lg max-w-none'>
						{formatContent(t.content)}
					</div>
				</div>
			</div>
		</div>
	);
}
