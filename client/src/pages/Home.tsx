import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, Star, Calendar, Award, Users, Home as HomeIcon, Coffee } from "lucide-react";

// Hero section background with a gradient overlay
const heroStyle = {
  backgroundImage: "linear-gradient(rgba(253, 242, 236, 0.9), rgba(255, 235, 245, 0.8)), url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="py-20 md:py-28 px-4" 
        style={heroStyle}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-pink-600 to-orange-500 text-transparent bg-clip-text">
              강아지의 행복한 성장을 위한 <span className="block">최고의 애견 유치원</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              퍼피빌에서는 강아지들이 다양한 활동과 놀이를 통해 사회성과 건강을 키울 수 있습니다. 전문 선생님들의 케어로 안전하고 즐겁게 지낼 수 있어요!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/programs">
                <a>
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white px-6 py-3 rounded-md">
                    프로그램 둘러보기
                  </Button>
                </a>
              </Link>
              <Link href="/admission">
                <a>
                  <Button variant="outline" className="w-full sm:w-auto border-pink-500 text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-md">
                    상담 예약하기
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              퍼피빌의 <span className="text-pink-500">특별한 점</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              강아지의 행복과 건강한 성장을 위한 최고의 환경을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFF9F5] p-6 rounded-lg shadow-sm border border-pink-100 transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">체계적인 일과</h3>
              <p className="text-gray-600">
                강아지들의 발달 단계에 맞춘 체계적인 일과와 활동으로 건강한 습관을 형성합니다.
              </p>
            </div>

            <div className="bg-[#FFF9F5] p-6 rounded-lg shadow-sm border border-pink-100 transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">전문 교육 프로그램</h3>
              <p className="text-gray-600">
                행동 전문가가 설계한 교육 프로그램으로 강아지의 사회화와 기본 훈련을 돕습니다.
              </p>
            </div>

            <div className="bg-[#FFF9F5] p-6 rounded-lg shadow-sm border border-pink-100 transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">소규모 그룹 관리</h3>
              <p className="text-gray-600">
                강아지의 크기와 성격에 맞춘 소규모 그룹 관리로 개별 케어와 안전을 보장합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-16 bg-[#FFF2EB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              다양한 <span className="text-pink-500">프로그램</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              강아지의 연령과 성격에 맞는 다양한 프로그램을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-pink-100">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070" 
                  alt="사회화 프로그램" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-pink-500 text-sm font-medium mb-2">
                  <span className="inline-block px-2 py-1 bg-pink-100 rounded-full mr-2">유치원</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">사회화 프로그램</h3>
                <p className="text-gray-600 mb-4">
                  다른 강아지들과 놀이를 통해 사회성을 기르는 프로그램입니다.
                </p>
                <Link href="/programs">
                  <a className="flex items-center text-pink-500 hover:text-pink-600 font-medium">
                    자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-pink-100">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=1974" 
                  alt="기본 훈련 프로그램" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-pink-500 text-sm font-medium mb-2">
                  <span className="inline-block px-2 py-1 bg-pink-100 rounded-full mr-2">훈련</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">기본 훈련 프로그램</h3>
                <p className="text-gray-600 mb-4">
                  앉아, 기다려 등 기본적인 명령어 훈련으로 예절을 기릅니다.
                </p>
                <Link href="/programs">
                  <a className="flex items-center text-pink-500 hover:text-pink-600 font-medium">
                    자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-pink-100">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=2000" 
                  alt="놀이 활동 프로그램" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-pink-500 text-sm font-medium mb-2">
                  <span className="inline-block px-2 py-1 bg-pink-100 rounded-full mr-2">활동</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">놀이 활동 프로그램</h3>
                <p className="text-gray-600 mb-4">
                  다양한 장난감과 활동으로 강아지의 신체 발달을 돕습니다.
                </p>
                <Link href="/programs">
                  <a className="flex items-center text-pink-500 hover:text-pink-600 font-medium">
                    자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/programs">
              <a>
                <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50">
                  모든 프로그램 보기
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              믿고 맡기는 <span className="text-pink-500">퍼피빌</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              퍼피빌을 이용한 보호자님들의 생생한 후기
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFF9F5] rounded-lg p-6 shadow-sm border border-pink-100">
              <div className="flex items-center text-yellow-400 mb-4">
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "처음 보낼 때는 걱정이 많았는데, 매일 사진으로 아이 상태를 보내주시고 친절하게 알려주셔서 안심하고 맡길 수 있었어요. 집에 와서도 훨씬 사교적으로 변했어요!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-medium text-gray-800">김민지 님</div>
                  <div className="text-sm text-gray-500">포메라니안 '콩이' 보호자</div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF9F5] rounded-lg p-6 shadow-sm border border-pink-100">
              <div className="flex items-center text-yellow-400 mb-4">
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "퍼피빌 다니기 시작하고 산책 매너가 확실히 좋아졌어요. 다른 강아지들을 만났을 때도 예전보다 훨씬 여유있게 반응하고, 기본 명령어도 잘 따라해요!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-medium text-gray-800">이준호 님</div>
                  <div className="text-sm text-gray-500">비숑 '몽이' 보호자</div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF9F5] rounded-lg p-6 shadow-sm border border-pink-100">
              <div className="flex items-center text-yellow-400 mb-4">
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
                <Star className="fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "시설이 깨끗하고 선생님들이 정말 강아지를 사랑하는 마음이 느껴져요. 우리 아이가 매일 아침 유치원 갈 시간이 되면 스스로 준비하려고 해요. 그만큼 즐거운 곳이라는 증거겠죠?"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-medium text-gray-800">박서연 님</div>
                  <div className="text-sm text-gray-500">말티즈 '하루' 보호자</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/faq">
              <a>
                <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50">
                  모든 후기 보기
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-[#FFF2EB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              퍼피빌의 <span className="text-pink-500">서비스</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              강아지를 위한 모든 것을 한 곳에서 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-pink-100">
              <div className="mr-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <HomeIcon className="h-6 w-6 text-pink-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">애견 유치원</h3>
                <p className="text-gray-600 mb-3">
                  반려견의 성장 단계에 맞춘 맞춤형 교육과 케어 서비스를 제공합니다. 
                  사회화 훈련부터 기본 예절까지 전문가들이 반려견의 성장을 돕습니다.
                </p>
                <Link href="/programs">
                  <a className="flex items-center text-pink-500 hover:text-pink-600 font-medium">
                    자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-pink-100">
              <div className="mr-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-pink-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">애견 미용</h3>
                <p className="text-gray-600 mb-3">
                  견종별 특성에 맞는 전문 미용 서비스를 제공합니다. 
                  위생 관리부터 스타일링까지 반려견의 건강과 아름다움을 책임집니다.
                </p>
                <Link href="/grooming">
                  <a className="flex items-center text-pink-500 hover:text-pink-600 font-medium">
                    자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-pink-100">
              <div className="mr-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Coffee className="h-6 w-6 text-pink-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">애견 카페</h3>
                <p className="text-gray-600 mb-3">
                  반려견과 함께 즐길 수 있는 카페 공간을 운영합니다. 
                  강아지용 간식과 사람을 위한 음료를 함께 즐기며 특별한 시간을 보낼 수 있습니다.
                </p>
                <Link href="/cafe">
                  <a className="flex items-center text-pink-500 hover:text-pink-600 font-medium">
                    자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-pink-100">
              <div className="mr-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-pink-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">특별 프로그램</h3>
                <p className="text-gray-600 mb-3">
                  시즌별 특별 프로그램과 이벤트를 진행합니다. 
                  특별한 날을 위한 파티, 계절별 테마 활동 등 다양한 경험을 제공합니다.
                </p>
                <Link href="/schedule">
                  <a className="flex items-center text-pink-500 hover:text-pink-600 font-medium">
                    자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-orange-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            퍼피빌과 함께 행복한 반려 생활을 시작하세요
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            강아지의 즐거운 하루와 건강한 성장을 위한 첫걸음, 지금 상담 예약하세요
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/admission">
              <a>
                <Button className="w-full sm:w-auto bg-white text-pink-600 hover:bg-gray-100 px-6 py-3 rounded-md">
                  상담 예약하기
                </Button>
              </a>
            </Link>
            <Link href="/gallery">
              <a>
                <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 px-6 py-3 rounded-md">
                  갤러리 둘러보기
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}