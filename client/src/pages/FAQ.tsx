import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Star } from "lucide-react";

const faqItems = [
  {
    category: "입학",
    items: [
      {
        question: "입학 절차는 어떻게 되나요?",
        answer: "상담 신청 후 상담을 통해 강아지와 견주의 성향을 파악하고, 체험일을 거쳐 최종 등록하는 방식으로 진행됩니다. 상담은 직접 방문하시거나 전화/화상으로도 가능합니다."
      },
      {
        question: "어떤 서류가 필요한가요?",
        answer: "반려견 등록증과 예방접종 증명서(종합백신, 코로나, 켄넬코프 등)가 필요합니다. 건강검진 증명서는 선택 사항이지만, 건강에 특이사항이 있는 경우 제출해 주시면 더 나은 케어를 제공해 드릴 수 있습니다."
      },
      {
        question: "최소 나이 제한이 있나요?",
        answer: "기본적으로 3개월 이상, 기초 예방접종이 완료된 강아지부터 입학 가능합니다. 퍼피 클래스는 3-7개월, 주니어 클래스는 8개월-1년, 성견 클래스는 1년 이상으로 나누어 진행됩니다."
      },
      {
        question: "문제 행동이 있는 강아지도 입학 가능한가요?",
        answer: "상담을 통해 행동 특성을 파악한 후, 적합한 프로그램을 안내해 드립니다. 공격성이 심한 경우 별도의 행동 교정 프로그램을 먼저 진행한 후 입학을 권장하고 있습니다."
      }
    ]
  },
  {
    category: "운영",
    items: [
      {
        question: "운영 시간은 어떻게 되나요?",
        answer: "평일은 오전 9시부터 오후 6시까지, 토요일은 오전 10시부터 오후 5시까지 운영됩니다. 일요일과 공휴일은 휴무입니다."
      },
      {
        question: "중간에 데려올 수 있나요?",
        answer: "네, 가능합니다. 다만 수업 진행 시간(오전 10시-12시, 오후 2시-4시)을 피해 방문해 주시면 감사하겠습니다. 방문 전 미리 연락주시면 강아지를 준비해 드립니다."
      },
      {
        question: "급식은 어떻게 하나요?",
        answer: "기본적으로 간식은 제공되나, 식사는 견주분께서 준비해 주셔야 합니다. 알러지나 특별한 식이 요법이 있는 경우 미리 알려주시기 바랍니다."
      },
      {
        question: "긴급 상황 발생 시 대응은 어떻게 하나요?",
        answer: "모든 직원이 반려동물 응급처치 교육을 이수했으며, 협력 동물병원과 24시간 연계되어 있습니다. 긴급 상황 발생 시 즉시 보호자께 연락 드리고 필요한 조치를 취합니다."
      }
    ]
  },
  {
    category: "프로그램",
    items: [
      {
        question: "어떤 프로그램들이 있나요?",
        answer: "기본 유치원 프로그램, 사회화 특화 프로그램, 기본 훈련 프로그램, 문제 행동 교정 프로그램 등 다양한 프로그램을 운영하고 있습니다. 상담을 통해 강아지에게 가장 적합한 프로그램을 추천해 드립니다."
      },
      {
        question: "특별 활동도 있나요?",
        answer: "매월 시즌별 특별 활동과 이벤트를 진행합니다. 수영, 어질리티, 노즈워크 등의 특별 활동과 생일 파티, 시즌 파티 등 다양한 이벤트가 준비되어 있습니다."
      },
      {
        question: "하루 일과는 어떻게 되나요?",
        answer: "오전 자유 놀이, 오전 수업(사회화/기본 훈련), 점심 및 휴식, 오후 수업(감각 활동/특별 활동), 오후 자유 놀이로 구성됩니다. 연령과 성향에 따라 활동 강도와 내용이 조절됩니다."
      },
      {
        question: "프로그램 진행 상황을 확인할 수 있나요?",
        answer: "네, 매일 활동 사진과 간단한 리포트를 전송해 드립니다. 또한 월 1회 상세 리포트를 통해 강아지의 성장과 발전 상황을 안내해 드립니다."
      }
    ]
  },
  {
    category: "비용",
    items: [
      {
        question: "이용 요금은 어떻게 되나요?",
        answer: "기본적으로 1일권, 10일권, 20일권, 월 정기권 등 다양한 요금제가 있습니다. 자세한 요금은 '이용 요금' 페이지에서 확인하실 수 있으며, 프로그램에 따라 추가 비용이 발생할 수 있습니다."
      },
      {
        question: "환불 정책은 어떻게 되나요?",
        answer: "이용권 시작 7일 전 취소 시 100% 환불, 3일 전 취소 시 70% 환불, 당일 취소 시 환불이 불가합니다. 장기 이용권의 경우 이용 일수에 따라 차등 환불됩니다."
      },
      {
        question: "할인 혜택이 있나요?",
        answer: "다견 가정(2마리 이상), 장기 등록(3개월 이상), 소개 프로그램 등 다양한 할인 혜택을 제공하고 있습니다. 상담 시 자세히 안내해 드립니다."
      },
      {
        question: "추가 비용이 발생하는 경우는 언제인가요?",
        answer: "특별 활동 참여, 픽업 서비스 이용, 미용 서비스 이용 등의 경우 추가 비용이 발생할 수 있습니다. 모든 추가 비용은 사전에 안내해 드리며, 동의 없이 청구되지 않습니다."
      }
    ]
  }
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("입학");

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
        자주 묻는 질문 & 후기
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        퍼피빌에 대한 궁금증을 해결해 드립니다. 원하시는 정보를 찾지 못하셨다면 언제든지 문의해 주세요.
      </p>
      
      {/* FAQ 섹션 */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">자주 묻는 질문</h2>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {faqItems.map((category) => (
              <TabsTrigger 
                key={category.category} 
                value={category.category}
                className="px-4 py-2"
              >
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {faqItems.map((category) => (
            <TabsContent key={category.category} value={category.category} className="mt-0">
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-pink-600">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* 후기 섹션 */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">고객 후기</h2>
          <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50">
            후기 작성하기
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* 후기 카드들 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100">
            <div className="flex items-center text-yellow-400 mb-4">
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
            </div>
            <p className="text-gray-600 mb-4">
              "퍼피빌에 다니기 시작한 후 우리 강아지의 사회성이 놀랍게 좋아졌어요. 다른 강아지들과 놀이를 통해 자신감도 생기고, 기본 훈련도 잘 따라하게 되었습니다. 선생님들이 정말 친절하고 전문적이세요!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-pink-200 rounded-full mr-4"></div>
              <div>
                <div className="font-medium text-gray-800">김민지 님</div>
                <div className="text-sm text-gray-500">포메라니안 '콩이' 보호자</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100">
            <div className="flex items-center text-yellow-400 mb-4">
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
            </div>
            <p className="text-gray-600 mb-4">
              "매일 보내주시는 사진과 활동 내용이 너무 좋아요. 직장에 있는 동안 우리 아이가 즐겁게 지내는 모습을 볼 수 있어 안심이 됩니다. 다양한 활동과 케어 서비스에 매우 만족하고 있습니다!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-pink-200 rounded-full mr-4"></div>
              <div>
                <div className="font-medium text-gray-800">이준호 님</div>
                <div className="text-sm text-gray-500">비숑 '몽이' 보호자</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100">
            <div className="flex items-center text-yellow-400 mb-4">
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
            </div>
            <p className="text-gray-600 mb-4">
              "시설이 깨끗하고 넓어서 좋아요. 우리 아이가 퍼피빌에 가는 날이면 현관에서 기다릴 정도로 좋아합니다. 특히 월별 특별 프로그램이 다양해서 지루하지 않게 새로운 경험을 할 수 있어요!"
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
        
        <div className="text-center">
          <Button className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
            더 많은 후기 보기
          </Button>
        </div>
      </div>
    </div>
  );
}