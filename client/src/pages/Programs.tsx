import { Button } from "@/components/ui/button";

export default function Programs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
        퍼피빌 프로그램
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        강아지의 연령과 특성에 맞는 다양한 프로그램을 제공합니다. 전문 트레이너들이 설계한 균형 잡힌 활동으로 강아지의 신체적, 정신적 발달을 도와드립니다.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 프로그램 내용이 들어갈 자리 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-pink-100 h-64 flex items-center justify-center">
          <p className="text-gray-500">프로그램 컨텐츠 준비 중...</p>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-pink-100 h-64 flex items-center justify-center">
          <p className="text-gray-500">프로그램 컨텐츠 준비 중...</p>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-pink-100 h-64 flex items-center justify-center">
          <p className="text-gray-500">프로그램 컨텐츠 준비 중...</p>
        </div>
      </div>
    </div>
  );
}