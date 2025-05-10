import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
        이용 요금
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        퍼피빌의 다양한 서비스 이용 요금을 안내해 드립니다. 합리적인 가격으로 최고의 서비스를 제공합니다.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100 flex flex-col">
          <div className="mb-4">
            <span className="bg-pink-100 text-pink-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              기본
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">반일 이용권</h2>
          <p className="text-gray-600 mb-6">오전 또는 오후 시간대에 이용 가능한 요금제입니다.</p>
          <div className="text-3xl font-bold mb-6 text-gray-800">
            30,000<span className="text-lg font-medium text-gray-500">원/일</span>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-600">기본 케어 서비스</span>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-600">간식 1회 제공</span>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-600">기본 놀이 활동</span>
            </li>
          </ul>
          <Button className="w-full mt-auto bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
            자세히 알아보기
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-pink-400 flex flex-col relative transform hover:scale-105 transition-transform duration-300">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
            인기 요금제
          </div>
          <div className="mb-4">
            <span className="bg-pink-100 text-pink-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              추천
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">종일 이용권</h2>
          <p className="text-gray-600 mb-6">하루 종일 이용 가능한 기본 요금제입니다.</p>
          <div className="text-3xl font-bold mb-6 text-gray-800">
            50,000<span className="text-lg font-medium text-gray-500">원/일</span>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-600">종일 케어 서비스</span>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-600">간식 2회 제공</span>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-600">다양한 놀이 활동</span>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-600">기본 교육 1회</span>
            </li>
          </ul>
          <Button className="w-full mt-auto bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
            자세히 알아보기
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100 flex flex-col">
          <div className="mb-4">
            <span className="bg-pink-100 text-pink-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              프리미엄
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">월 정기권</h2>
          <p className="text-gray-600 mb-6">월 단위로 이용할 수 있는 할인 요금제입니다.</p>
          <div className="text-3xl font-bold mb-6 text-gray-800">
            800,000<span className="text-lg font-medium text-gray-500">원/월</span>
          </div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-600">월 20일 이용권</span>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-600">모든 프로그램 이용 가능</span>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-600">월 1회 미용 서비스 포함</span>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-600">케어 상태 일일 리포트</span>
            </li>
          </ul>
          <Button className="w-full mt-auto bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
            자세히 알아보기
          </Button>
        </div>
      </div>
    </div>
  );
}