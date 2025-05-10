import { Button } from "@/components/ui/button";

export default function Cafe() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
        퍼피빌 애견 카페
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        반려견과 함께 즐거운 시간을 보낼 수 있는 퍼피빌 애견 카페입니다. 특별한 강아지 간식과 사람을 위한 맛있는 음료, 디저트를 제공합니다.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="h-96 bg-[#FFF9F5] rounded-lg flex items-center justify-center">
          <p className="text-gray-500">카페 이미지 준비 중...</p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">퍼피빌 카페 소개</h2>
          <p className="text-gray-600 mb-6">
            퍼피빌 카페는 반려견과 보호자가 함께 편안하게 시간을 보낼 수 있는 공간입니다. 
            넓은 실내 공간과 야외 테라스, 강아지 놀이 공간을 갖추고 있어 사계절 내내 
            즐거운 시간을 보내실 수 있습니다.
          </p>
          <p className="text-gray-600 mb-6">
            모든 음식과 음료는 신선한 재료로 매일 준비되며, 강아지 간식은 영양사의 
            자문을 받아 건강하고 안전하게 제조됩니다. 카페 이용 시 반려견의 
            행동 관리에 주의해 주시고, 다른 손님들을 배려해 주세요.
          </p>
          
          <div className="bg-pink-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">영업 시간</h3>
            <ul className="text-gray-600 space-y-1">
              <li>평일: 10:00 - 20:00</li>
              <li>주말 및 공휴일: 10:00 - 21:00</li>
              <li>정기 휴무: 매월 첫째 월요일</li>
            </ul>
          </div>
          
          <Button className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
            메뉴 둘러보기
          </Button>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">인기 메뉴</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-pink-100">
            <div className="h-48 bg-[#FFF9F5] flex items-center justify-center">
              <p className="text-gray-500">메뉴 이미지 준비 중...</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-800">퍼피 케이크</h3>
                <span className="text-pink-600 font-medium">12,000원</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">반려견을 위한 특별한 생일 케이크</p>
              <div className="flex items-center">
                <span className="text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-full">인기</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-pink-100">
            <div className="h-48 bg-[#FFF9F5] flex items-center justify-center">
              <p className="text-gray-500">메뉴 이미지 준비 중...</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-800">펫 라떼</h3>
                <span className="text-pink-600 font-medium">7,000원</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">반려견과 함께 즐기는 특별한 라떼</p>
              <div className="flex items-center">
                <span className="text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-full">신메뉴</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-pink-100">
            <div className="h-48 bg-[#FFF9F5] flex items-center justify-center">
              <p className="text-gray-500">메뉴 이미지 준비 중...</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-800">멍치킨 플레이트</h3>
                <span className="text-pink-600 font-medium">9,000원</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">영양만점 강아지 수제 간식 세트</p>
              <div className="flex items-center">
                <span className="text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-full">건강식</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-pink-100">
            <div className="h-48 bg-[#FFF9F5] flex items-center justify-center">
              <p className="text-gray-500">메뉴 이미지 준비 중...</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-800">아이스크림 세트</h3>
                <span className="text-pink-600 font-medium">10,000원</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">반려견과 보호자가 함께 즐기는 아이스크림</p>
              <div className="flex items-center">
                <span className="text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-full">추천</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center bg-[#FFF9F5] p-8 rounded-lg border border-pink-100 mb-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">단체 예약 및 파티 문의</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          반려견 생일 파티, 소모임, 강아지 친구들과의 모임 등 특별한 날에 
          퍼피빌 카페를 단체로 예약하실 수 있습니다. 맞춤형 파티 플랜과 
          케이터링 서비스도 제공해 드립니다.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
            파티 예약하기
          </Button>
          <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50">
            전화 문의: 02-123-4567
          </Button>
        </div>
      </div>
    </div>
  );
}