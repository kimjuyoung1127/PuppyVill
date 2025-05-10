import { Button } from "@/components/ui/button";

export default function Admin() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
        관리자 페이지
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        퍼피빌 웹사이트 컨텐츠를 관리하는 관리자 전용 페이지입니다. 권한이 필요합니다.
      </p>
      
      <div className="bg-white p-8 rounded-lg shadow-sm border border-pink-100 flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-6">관리자 로그인이 필요합니다</p>
        <Button className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
          로그인 페이지로 이동
        </Button>
      </div>
    </div>
  );
}