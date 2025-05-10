import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  ownerName: z.string().min(2, {
    message: "이름을 입력해주세요.",
  }),
  email: z.string().email({
    message: "유효한 이메일 주소를 입력해주세요.",
  }),
  phone: z.string().min(10, {
    message: "연락처를 입력해주세요.",
  }),
  dogName: z.string().min(1, {
    message: "반려견 이름을 입력해주세요.",
  }),
  requestType: z.string({
    required_error: "문의 유형을 선택해주세요.",
  }),
  message: z.string().min(10, {
    message: "문의 내용을 10자 이상 입력해주세요.",
  }),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

export default function Admission() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
      dogName: "",
      requestType: "",
      message: "",
      preferredDate: "",
      preferredTime: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // 여기에서 실제 API 요청 처리
    console.log(values);
    
    // 제출 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "상담 신청이 완료되었습니다",
        description: "빠른 시일 내에 담당자가 연락드리겠습니다.",
      });
      form.reset();
    }, 1500);
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
        입학 및 상담 신청
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        퍼피빌에 관심을 가져주셔서 감사합니다. 입학 상담이나 기타 문의사항이 있으시면 아래 양식을 작성해 주세요. 빠른 시일 내에 답변 드리겠습니다.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
        <div className="md:col-span-2 bg-[#FFF9F5] p-6 rounded-lg border border-pink-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">입학 안내</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">입학 절차</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-2 pl-2">
                <li>상담 신청서 작성 및 제출</li>
                <li>전화 또는 대면 상담 진행</li>
                <li>견주와 강아지 성향 파악</li>
                <li>적합한 프로그램 추천</li>
                <li>체험일 예약 및 방문</li>
                <li>최종 등록 및 입학</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">구비 서류</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 pl-2">
                <li>예방접종 증명서 (종합백신, 코로나, 켄넬코프)</li>
                <li>건강검진 증명서 (선택사항)</li>
                <li>반려견 등록증</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">문의 연락처</h3>
              <p className="text-gray-600">
                전화: 02-123-4567<br />
                이메일: contact@puppyville.com<br />
                카카오톡: @puppyville
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">운영 시간</h3>
              <p className="text-gray-600">
                평일: 09:00 - 18:00<br />
                토요일: 10:00 - 17:00<br />
                일요일 및 공휴일: 휴무
              </p>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-pink-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">상담 신청</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>보호자 이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dogName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>반려견 이름</FormLabel>
                      <FormControl>
                        <Input placeholder="몽이" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input placeholder="example@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input placeholder="010-1234-5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>문의 유형</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="문의 유형을 선택해주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="입학상담">입학 상담</SelectItem>
                        <SelectItem value="프로그램문의">프로그램 문의</SelectItem>
                        <SelectItem value="요금문의">요금 문의</SelectItem>
                        <SelectItem value="시설견학">시설 견학</SelectItem>
                        <SelectItem value="기타문의">기타 문의</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>희망 상담일 (선택)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>희망 시간 (선택)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="시간대를 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="오전 (9시-12시)">오전 (9시-12시)</SelectItem>
                          <SelectItem value="오후 (12시-15시)">오후 (12시-15시)</SelectItem>
                          <SelectItem value="오후 (15시-18시)">오후 (15시-18시)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>문의 내용</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="문의하실 내용을 자세히 적어주세요."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "제출 중..." : "상담 신청하기"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}