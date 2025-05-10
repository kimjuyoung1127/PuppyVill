import { Button } from "@/components/ui/button";

export default function Grooming() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
        애견 미용 서비스
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        전문 미용사가 제공하는 맞춤형 애견 미용 서비스를 소개합니다. 강아지의 특성과 견종에 맞는 최적의 미용 서비스로 건강하고 아름다운 모습을 유지하세요.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">기본 미용 서비스</h2>
          <ul className="space-y-4 mb-8">
            <li className="flex border-b border-gray-100 pb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">목욕 & 브러싱</h3>
                <p className="text-gray-600 text-sm">전문 샴푸를 사용한 목욕과 브러싱 서비스</p>
              </div>
              <div className="font-medium text-gray-700">30,000원~</div>
            </li>
            <li className="flex border-b border-gray-100 pb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">부분 미용</h3>
                <p className="text-gray-600 text-sm">발바닥, 항문, 위생, 귀청소 등 부분 미용</p>
              </div>
              <div className="font-medium text-gray-700">20,000원~</div>
            </li>
            <li className="flex border-b border-gray-100 pb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">전체 클리핑</h3>
                <p className="text-gray-600 text-sm">전체 모발 길이 조절 및 정리</p>
              </div>
              <div className="font-medium text-gray-700">40,000원~</div>
            </li>
            <li className="flex">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">풀코스 미용</h3>
                <p className="text-gray-600 text-sm">목욕, 클리핑, 스타일링이 포함된 전체 미용</p>
              </div>
              <div className="font-medium text-gray-700">60,000원~</div>
            </li>
          </ul>
          <p className="text-sm text-gray-500 italic mb-6">
            * 가격은 견종, 크기, 모발 상태에 따라 달라질 수 있습니다
          </p>
          <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
            예약하기
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">스페셜 미용 서비스</h2>
          <ul className="space-y-4 mb-8">
            <li className="flex border-b border-gray-100 pb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">스파 트리트먼트</h3>
                <p className="text-gray-600 text-sm">피부 진정 및 영양 공급을 위한 스페셜 트리트먼트</p>
              </div>
              <div className="font-medium text-gray-700">40,000원~</div>
            </li>
            <li className="flex border-b border-gray-100 pb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">컬러 트리트먼트</h3>
                <p className="text-gray-600 text-sm">안전한 성분으로 부분 염색 및 컬러링</p>
              </div>
              <div className="font-medium text-gray-700">50,000원~</div>
            </li>
            <li className="flex border-b border-gray-100 pb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">스타일 커팅</h3>
                <p className="text-gray-600 text-sm">견종별 특성에 맞는 전문 스타일 커팅</p>
              </div>
              <div className="font-medium text-gray-700">70,000원~</div>
            </li>
            <li className="flex">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">디톡스 패키지</h3>
                <p className="text-gray-600 text-sm">각질 제거, 피부 정화, 모질 개선을 위한 풀 패키지</p>
              </div>
              <div className="font-medium text-gray-700">80,000원~</div>
            </li>
          </ul>
          <p className="text-sm text-gray-500 italic mb-6">
            * 스페셜 서비스는 사전 예약이 필요합니다
          </p>
          <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
            상담 예약하기
          </Button>
        </div>
      </div>
      
      <div className="text-center bg-[#FFF9F5] p-8 rounded-lg border border-pink-100 mb-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">미용 서비스 예약 안내</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          미용 서비스는 예약제로 운영됩니다. 원하시는 날짜와 시간에 맞춰 사전에 예약해 주세요.
          퍼피빌 회원은 특별 할인 혜택을 받으실 수 있습니다.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
            온라인 예약하기
          </Button>
          <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50">
            전화 예약: 02-123-4567
          </Button>
        </div>
      </div>
    </div>
  );
}