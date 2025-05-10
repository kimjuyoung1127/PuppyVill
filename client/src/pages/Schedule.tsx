import { Button } from "@/components/ui/button";

export default function Schedule() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
        일과 & 프로그램
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        퍼피빌의 일일 일정과 월간 특별 프로그램을 확인해보세요. 체계적인 일과로 강아지들이 건강하고 즐겁게 지낼 수 있도록 돕습니다.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">일일 일과</h2>
          <div className="space-y-4">
            {/* 일과 내용이 들어갈 자리 */}
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">일과 컨텐츠 준비 중...</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">월간 프로그램</h2>
          <div className="space-y-4">
            {/* 월간 프로그램 내용이 들어갈 자리 */}
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">월간 프로그램 컨텐츠 준비 중...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}