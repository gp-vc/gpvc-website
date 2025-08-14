import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800'>
			<div className='text-center'>
				<h1 className='text-6xl font-thin text-white mb-4'>404</h1>
				<h2 className='text-2xl font-semibold text-[#bdb9dc] mb-6'>
					페이지를 찾을 수 없습니다
				</h2>
				<p className='text-gray-300 mb-8'>
					요청하신 페이지가 존재하지 않습니다.
				</p>
				<div className='flex space-x-4 justify-center'>
					<Link
						href='/ko'
						className='bg-[#bdb9dc] hover:bg-[#a8a4d0] text-white px-6 py-3 rounded-lg transition-colors duration-200'
					>
						홈으로 돌아가기
					</Link>
					<Link
						href='/en'
						className='border border-[#bdb9dc] text-[#bdb9dc] hover:bg-[#bdb9dc] hover:text-white px-6 py-3 rounded-lg transition-colors duration-200'
					>
						Go to English
					</Link>
				</div>
			</div>
		</div>
	);
}
