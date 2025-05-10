import { Button } from "@/components/ui/button";

export default function Gallery() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
        퍼피빌 사진첩
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        퍼피빌에서 즐겁게 지내는 강아지들의 모습과 다양한 활동 사진을 확인해보세요.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* 갤러리 사진이 들어갈 자리 */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-[#FFF9F5] rounded-lg overflow-hidden shadow-sm border border-pink-100 aspect-square flex items-center justify-center">
            <p className="text-gray-500">사진 준비 중...</p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Button className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
          더 많은 사진 보기
        </Button>
      </div>
    </div>
  );
}