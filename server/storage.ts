import {
  users, type User, type InsertUser,
  announcements, type Announcement, type InsertAnnouncement,
  programs, type Program, type InsertProgram,
  scheduleItems, type ScheduleItem, type InsertScheduleItem,
  monthlyPrograms, type MonthlyProgram, type InsertMonthlyProgram,
  galleryImages, type GalleryImage, type InsertGalleryImage,
  priceItems, type PriceItem, type InsertPriceItem,
  groomingServices, type GroomingService, type InsertGroomingService,
  cafeItems, type CafeItem, type InsertCafeItem,
  admissionRequests, type AdmissionRequest, type InsertAdmissionRequest,
  faqItems, type FaqItem, type InsertFaqItem,
  reviews, type Review, type InsertReview,
  siteSettings, type SiteSetting, type InsertSiteSetting
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;

  // Announcement operations
  getAnnouncement(id: number): Promise<Announcement | undefined>;
  getActiveAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: number, announcement: Partial<Announcement>): Promise<Announcement | undefined>;
  deleteAnnouncement(id: number): Promise<boolean>;

  // Program operations
  getProgram(id: number): Promise<Program | undefined>;
  getAllPrograms(): Promise<Program[]>;
  getProgramsByCategory(category: string): Promise<Program[]>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: number, program: Partial<Program>): Promise<Program | undefined>;
  deleteProgram(id: number): Promise<boolean>;

  // Schedule operations
  getScheduleItem(id: number): Promise<ScheduleItem | undefined>;
  getAllScheduleItems(): Promise<ScheduleItem[]>;
  createScheduleItem(scheduleItem: InsertScheduleItem): Promise<ScheduleItem>;
  updateScheduleItem(id: number, scheduleItem: Partial<ScheduleItem>): Promise<ScheduleItem | undefined>;
  deleteScheduleItem(id: number): Promise<boolean>;

  // Monthly Program operations
  getMonthlyProgram(id: number): Promise<MonthlyProgram | undefined>;
  getMonthlyProgramsByMonth(year: number, month: number): Promise<MonthlyProgram[]>;
  createMonthlyProgram(monthlyProgram: InsertMonthlyProgram): Promise<MonthlyProgram>;
  updateMonthlyProgram(id: number, monthlyProgram: Partial<MonthlyProgram>): Promise<MonthlyProgram | undefined>;
  deleteMonthlyProgram(id: number): Promise<boolean>;

  // Gallery operations
  getGalleryImage(id: number): Promise<GalleryImage | undefined>;
  getAllGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImagesByCategory(category: string): Promise<GalleryImage[]>;
  createGalleryImage(galleryImage: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: number, galleryImage: Partial<GalleryImage>): Promise<GalleryImage | undefined>;
  deleteGalleryImage(id: number): Promise<boolean>;

  // Price operations
  getPriceItem(id: number): Promise<PriceItem | undefined>;
  getAllPriceItems(): Promise<PriceItem[]>;
  getPriceItemsByCategory(category: string): Promise<PriceItem[]>;
  createPriceItem(priceItem: InsertPriceItem): Promise<PriceItem>;
  updatePriceItem(id: number, priceItem: Partial<PriceItem>): Promise<PriceItem | undefined>;
  deletePriceItem(id: number): Promise<boolean>;

  // Grooming operations
  getGroomingService(id: number): Promise<GroomingService | undefined>;
  getAllGroomingServices(): Promise<GroomingService[]>;
  createGroomingService(groomingService: InsertGroomingService): Promise<GroomingService>;
  updateGroomingService(id: number, groomingService: Partial<GroomingService>): Promise<GroomingService | undefined>;
  deleteGroomingService(id: number): Promise<boolean>;

  // Cafe operations
  getCafeItem(id: number): Promise<CafeItem | undefined>;
  getAllCafeItems(): Promise<CafeItem[]>;
  getCafeItemsByCategory(category: string): Promise<CafeItem[]>;
  createCafeItem(cafeItem: InsertCafeItem): Promise<CafeItem>;
  updateCafeItem(id: number, cafeItem: Partial<CafeItem>): Promise<CafeItem | undefined>;
  deleteCafeItem(id: number): Promise<boolean>;

  // Admission operations
  getAdmissionRequest(id: number): Promise<AdmissionRequest | undefined>;
  getAllAdmissionRequests(): Promise<AdmissionRequest[]>;
  getAdmissionRequestsByStatus(status: string): Promise<AdmissionRequest[]>;
  createAdmissionRequest(admissionRequest: InsertAdmissionRequest): Promise<AdmissionRequest>;
  updateAdmissionRequest(id: number, admissionRequest: Partial<AdmissionRequest>): Promise<AdmissionRequest | undefined>;
  deleteAdmissionRequest(id: number): Promise<boolean>;

  // FAQ operations
  getFaqItem(id: number): Promise<FaqItem | undefined>;
  getAllFaqItems(): Promise<FaqItem[]>;
  getFaqItemsByCategory(category: string): Promise<FaqItem[]>;
  createFaqItem(faqItem: InsertFaqItem): Promise<FaqItem>;
  updateFaqItem(id: number, faqItem: Partial<FaqItem>): Promise<FaqItem | undefined>;
  deleteFaqItem(id: number): Promise<boolean>;

  // Review operations
  getReview(id: number): Promise<Review | undefined>;
  getAllReviews(): Promise<Review[]>;
  getVerifiedReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, review: Partial<Review>): Promise<Review | undefined>;
  deleteReview(id: number): Promise<boolean>;

  // Site settings operations
  getSiteSettings(): Promise<SiteSetting | undefined>;
  createSiteSettings(siteSettings: InsertSiteSetting): Promise<SiteSetting>;
  updateSiteSettings(id: number, siteSettings: Partial<SiteSetting>): Promise<SiteSetting | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private announcements: Map<number, Announcement>;
  private programs: Map<number, Program>;
  private scheduleItems: Map<number, ScheduleItem>;
  private monthlyPrograms: Map<number, MonthlyProgram>;
  private galleryImages: Map<number, GalleryImage>;
  private priceItems: Map<number, PriceItem>;
  private groomingServices: Map<number, GroomingService>;
  private cafeItems: Map<number, CafeItem>;
  private admissionRequests: Map<number, AdmissionRequest>;
  private faqItems: Map<number, FaqItem>;
  private reviews: Map<number, Review>;
  private siteSettings: Map<number, SiteSetting>;

  private currentUserId: number;
  private currentAnnouncementId: number;
  private currentProgramId: number;
  private currentScheduleItemId: number;
  private currentMonthlyProgramId: number;
  private currentGalleryImageId: number;
  private currentPriceItemId: number;
  private currentGroomingServiceId: number;
  private currentCafeItemId: number;
  private currentAdmissionRequestId: number;
  private currentFaqItemId: number;
  private currentReviewId: number;
  private currentSiteSettingsId: number;

  constructor() {
    this.users = new Map();
    this.announcements = new Map();
    this.programs = new Map();
    this.scheduleItems = new Map();
    this.monthlyPrograms = new Map();
    this.galleryImages = new Map();
    this.priceItems = new Map();
    this.groomingServices = new Map();
    this.cafeItems = new Map();
    this.admissionRequests = new Map();
    this.faqItems = new Map();
    this.reviews = new Map();
    this.siteSettings = new Map();

    this.currentUserId = 1;
    this.currentAnnouncementId = 1;
    this.currentProgramId = 1;
    this.currentScheduleItemId = 1;
    this.currentMonthlyProgramId = 1;
    this.currentGalleryImageId = 1;
    this.currentPriceItemId = 1;
    this.currentGroomingServiceId = 1;
    this.currentCafeItemId = 1;
    this.currentAdmissionRequestId = 1;
    this.currentFaqItemId = 1;
    this.currentReviewId = 1;
    this.currentSiteSettingsId = 1;

    // Seed with a default admin user
    this.createUser({
      username: "admin",
      password: "admin123",
      name: "관리자",
      email: "admin@puppyville.com",
      role: "admin"
    });

    // Initialize site settings
    this.createSiteSettings({
      siteName: "퍼피빌",
      logoUrl: "/images/logo.svg",
      phone: "02-123-4567",
      email: "contact@puppyville.com",
      address: "서울특별시 강남구 강아지로 123",
      businessHours: {
        weekdays: "오전 9시 - 오후 6시",
        weekend: "오전 10시 - 오후 5시",
        holidays: "휴무"
      },
      socialLinks: {
        instagram: "https://instagram.com/puppyville",
        facebook: "https://facebook.com/puppyville",
        kakaotalk: "https://pf.kakao.com/puppyville"
      },
      metaTitle: "퍼피빌 - 강아지 유치원",
      metaDescription: "강아지의 교육과 사회화를 위한 최고의 유치원, 퍼피빌입니다. 교육, 피트니스, 미용 등 다양한 서비스를 제공합니다."
    });

    // Seed with sample data for demonstration
    this.seedSampleData();
  }

  private seedSampleData(): void {
    // Add some sample announcements
    this.createAnnouncement({
      title: "퍼피빌 신규 회원 할인 이벤트",
      content: "신규 회원 등록 시 첫 달 10% 할인 혜택을 드립니다! 지금 바로 상담 예약하세요.",
      isActive: true,
      startDate: new Date("2025-05-01"),
      endDate: new Date("2025-05-31"),
      buttonText: "상담 예약하기",
      buttonLink: "#admission"
    });

    this.createAnnouncement({
      title: "5월 특별 프로그램: 물놀이 특강",
      content: "여름을 앞두고 강아지 물놀이 적응 특별 프로그램을 진행합니다. 수영에 대한 두려움을 없애고 안전하게 물놀이를 즐기는 법을 배워요!",
      isActive: true,
      startDate: new Date("2025-05-10"),
      endDate: new Date("2025-05-25"),
      buttonText: "자세히 보기",
      buttonLink: "#programs"
    });

    // Add sample programs
    this.createProgram({
      title: "기다려 훈련",
      category: "education",
      description: "가장 기본적이면서도 중요한 '기다려' 명령을 학습하는 프로그램입니다. 다양한 상황에서 주인의 지시를 기다릴 수 있도록 훈련합니다.",
      benefits: ["자기 통제력 향상", "안전사고 예방", "주인과의 신뢰 관계 구축"],
      emoji: "⏱️",
      imageUrl: "/images/programs/wait-training.jpg",
      order: 1
    });

    this.createProgram({
      title: "타겟 매트 트레이닝",
      category: "education",
      description: "강아지가 특정 매트나 지정된 장소에 머무르도록 훈련하는 프로그램입니다. 방문객이 오거나 외출 시에도 안정적으로 자리를 지킬 수 있게 됩니다.",
      benefits: ["집중력 향상", "불안감 감소", "가정 내 규칙 확립"],
      emoji: "🎯",
      imageUrl: "/images/programs/target-mat.jpg",
      order: 2
    });

    this.createProgram({
      title: "까발레티 운동",
      category: "fitness",
      description: "낮은 장애물을 뛰어넘거나 걸어가는 운동으로, 강아지의 운동 능력과 신체 인지 능력을 발달시키는 데 도움이 됩니다.",
      benefits: ["관절 건강 증진", "신체 균형감 향상", "근육 발달"],
      emoji: "🏃",
      imageUrl: "/images/programs/cavaletti.jpg",
      order: 3
    });

    // Add daily schedule
    this.createScheduleItem({
      timeSlot: "09:00 - 09:30",
      activity: "등원 및 자유놀이",
      description: "친구들과 인사하고 자유롭게 놀이 시간을 가집니다.",
      icon: "🚪",
      order: 1
    });

    this.createScheduleItem({
      timeSlot: "09:30 - 10:30",
      activity: "아침 산책",
      description: "강아지들의 스트레스 해소와 배변 활동을 돕는 가벼운 산책 시간입니다.",
      icon: "🐾",
      order: 2
    });

    this.createScheduleItem({
      timeSlot: "10:30 - 11:30",
      activity: "오전 교육 프로그램",
      description: "강아지의 집중력이 높은 오전 시간대에 훈련 및 교육 프로그램을 진행합니다.",
      icon: "📚",
      order: 3
    });

    this.createScheduleItem({
      timeSlot: "11:30 - 12:30",
      activity: "점심식사 및 휴식",
      description: "균형 잡힌 식사와 소화를 위한 휴식 시간입니다.",
      icon: "🍽️",
      order: 4
    });

    this.createScheduleItem({
      timeSlot: "12:30 - 14:00",
      activity: "낮잠 시간",
      description: "개별 공간에서 편안하게 휴식을 취합니다.",
      icon: "😴",
      order: 5
    });

    this.createScheduleItem({
      timeSlot: "14:00 - 15:00",
      activity: "피트니스 프로그램",
      description: "강아지의 신체 건강을 위한 다양한 운동 프로그램을 진행합니다.",
      icon: "💪",
      order: 6
    });

    this.createScheduleItem({
      timeSlot: "15:00 - 16:00",
      activity: "사회화 놀이 시간",
      description: "다른 강아지들과 적절한 방식으로 놀이하며 사회성을 기릅니다.",
      icon: "👥",
      order: 7
    });

    this.createScheduleItem({
      timeSlot: "16:00 - 17:00",
      activity: "오후 간식 및 휴식",
      description: "가벼운 간식과 휴식 시간입니다.",
      icon: "🍪",
      order: 8
    });

    this.createScheduleItem({
      timeSlot: "17:00 - 18:00",
      activity: "하원 준비 및 귀가",
      description: "하루 활동을 정리하고 보호자 맞이할 준비를 합니다.",
      icon: "👋",
      order: 9
    });

    // Add monthly programs
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    this.createMonthlyProgram({
      title: "노즈워크 특강",
      date: new Date(currentYear, currentMonth, 12),
      description: "강아지의 뛰어난 후각을 활용한 놀이와 훈련을 배웁니다.",
      imageUrl: "/images/monthly/nosework.jpg"
    });
    
    this.createMonthlyProgram({
      title: "애견 수영장 개장",
      date: new Date(currentYear, currentMonth, 15),
      description: "올해 첫 수영장 개장! 물놀이를 좋아하는 강아지들에게 시원한 경험을 선사합니다.",
      imageUrl: "/images/monthly/pool.jpg"
    });
    
    this.createMonthlyProgram({
      title: "퍼피빌 생일파티",
      date: new Date(currentYear, currentMonth, 20),
      description: "이 달에 생일을 맞이하는 강아지 친구들을 위한 특별한 생일 파티를 개최합니다.",
      imageUrl: "/images/monthly/birthday.jpg"
    });

    // Add gallery images
    this.createGalleryImage({
      title: "기다려 훈련 중인 콩이",
      description: "인내심을 기르는 중인 콩이의 진지한 모습",
      imageUrl: "/images/gallery/training1.jpg",
      category: "education",
      tags: ["training", "puppy"],
      dateAdded: new Date(currentYear, currentMonth, 5)
    });
    
    this.createGalleryImage({
      title: "봄 소풍",
      description: "벚꽃이 아름다운 공원에서의 봄소풍 단체사진",
      imageUrl: "/images/gallery/spring_picnic.jpg",
      category: "events",
      tags: ["picnic", "spring", "group"],
      dateAdded: new Date(currentYear, currentMonth, 8)
    });
    
    this.createGalleryImage({
      title: "까발레티 운동 중인 몽이",
      description: "장애물 훈련을 통해 균형감각을 키우는 몽이",
      imageUrl: "/images/gallery/fitness1.jpg",
      category: "fitness",
      tags: ["exercise", "training"],
      dateAdded: new Date(currentYear, currentMonth - 1, 28)
    });

    // Add price items
    this.createPriceItem({
      service: "데이케어 (반일)",
      category: "daycare",
      description: "오전 9시부터 오후 2시까지의 반나절 돌봄 서비스",
      price: "30,000원",
      duration: "5시간",
      notes: "간식 포함, 식사 별도",
      isPopular: false,
      order: 1
    });
    
    this.createPriceItem({
      service: "데이케어 (종일)",
      category: "daycare",
      description: "오전 9시부터 오후 6시까지의 종일 돌봄 서비스",
      price: "45,000원",
      duration: "9시간",
      notes: "간식 및 점심 식사 포함",
      isPopular: true,
      order: 2
    });
    
    this.createPriceItem({
      service: "1:1 피트니스",
      category: "fitness",
      description: "전문 트레이너와 함께하는 맞춤형 운동 프로그램",
      price: "50,000원",
      duration: "50분",
      notes: "예약 필수",
      isPopular: true,
      order: 3
    });
    
    this.createPriceItem({
      service: "호텔링 (1박)",
      category: "hotel",
      description: "24시간 전문 케어와 함께하는 호텔링 서비스",
      price: "60,000원",
      duration: "24시간",
      notes: "모든 식사 및 간식 포함",
      isPopular: false,
      order: 4
    });

    // Add grooming services
    this.createGroomingService({
      title: "전체 미용",
      description: "목욕, 드라이, 전체 커트, 발톱 정리, 귀 청소, 항문낭 등 모든 미용 서비스가 포함된 풀 패키지입니다.",
      beforeImageUrl: "/images/grooming/before_full.jpg",
      afterImageUrl: "/images/grooming/after_full.jpg",
      price: "60,000원~",
      duration: "약 2시간",
      order: 1
    });
    
    this.createGroomingService({
      title: "부분 미용",
      description: "얼굴, 발, 엉덩이 등 특정 부위만 집중적으로 케어하는 서비스입니다.",
      beforeImageUrl: "/images/grooming/before_partial.jpg",
      afterImageUrl: "/images/grooming/after_partial.jpg",
      price: "30,000원~",
      duration: "약 1시간",
      order: 2
    });
    
    this.createGroomingService({
      title: "스파 트리트먼트",
      description: "특별한 아로마 테라피 샴푸와 트리트먼트로 피부와 모질을 개선하는 프리미엄 스파 서비스입니다.",
      beforeImageUrl: "/images/grooming/before_spa.jpg",
      afterImageUrl: "/images/grooming/after_spa.jpg",
      price: "50,000원~",
      duration: "약 1시간 30분",
      order: 3
    });

    // Add cafe items
    this.createCafeItem({
      name: "퍼피 라떼",
      description: "강아지를 위한 우유 거품이 올라간 특별한 음료 (사람도 음용 가능)",
      price: "6,000원",
      category: "drinks",
      imageUrl: "/images/cafe/puppy_latte.jpg",
      isPopular: true,
      order: 1
    });
    
    this.createCafeItem({
      name: "멍멍 쿠키",
      description: "천연 재료로 만든 강아지 모양 쿠키",
      price: "4,500원",
      category: "desserts",
      imageUrl: "/images/cafe/dog_cookies.jpg",
      isPopular: true,
      order: 2
    });
    
    this.createCafeItem({
      name: "과일 요거트 파르페",
      description: "신선한 계절 과일과 요거트의 조합",
      price: "8,000원",
      category: "desserts",
      imageUrl: "/images/cafe/fruit_parfait.jpg",
      isPopular: false,
      order: 3
    });

    // Add FAQ items
    this.createFaqItem({
      question: "퍼피빌은 어떤 크기의 강아지들이 이용할 수 있나요?",
      answer: "퍼피빌은 모든 크기의 강아지들을 환영합니다. 소형견부터 대형견까지 크기에 맞는 활동 공간과 프로그램을 제공하고 있으며, 필요에 따라 크기별로 그룹을 나누어 진행하는 활동도 있습니다.",
      category: "general",
      order: 1
    });
    
    this.createFaqItem({
      question: "강아지가 백신 접종을 완료하지 않았어도 데이케어 이용이 가능한가요?",
      answer: "안전한 환경을 위해 모든 강아지는 기본 백신(DHPPL, 코로나, 켄넬코프)을 완료한 상태여야 합니다. 또한 최소 1년에 한 번 광견병 백신 접종 증명이 필요합니다. 백신 기록은 첫 방문 시 제시해 주셔야 합니다.",
      category: "health",
      order: 2
    });
    
    this.createFaqItem({
      question: "어떤 사료를 제공하나요? 직접 가져올 수 있나요?",
      answer: "퍼피빌에서는 프리미엄 사료를 기본으로 제공하고 있으나, 강아지의 특별한 식이 요구사항이 있다면 직접 사료를 준비해 오셔도 됩니다. 알레르기나 특별한 식이 제한이 있는 경우 미리 알려주시면 최대한 배려하겠습니다.",
      category: "food",
      order: 3
    });

    // Add reviews
    this.createReview({
      authorName: "김지연",
      dogName: "콩이 (포메라니안)",
      content: "처음에는 사회성이 부족했던 콩이가 퍼피빌에서 지내면서 다른 강아지들과 잘 어울리게 되었어요. 특히 기다려 훈련이 정말 효과적이었습니다. 선생님들도 너무 친절하시고 항상 자세한 피드백을 주셔서 감사해요!",
      rating: 5,
      isAnonymous: false,
      imageUrl: "/images/reviews/kong.jpg"
    });
    
    this.createReview({
      authorName: "박현우",
      dogName: "몽이 (비숑)",
      content: "저희 몽이는 활동량이 많은 편인데, 피트니스 프로그램을 통해 건강하게 에너지를 소비할 수 있어서 좋아요. 집에 와서도 스트레스 받은 모습 없이 편안하게 지내요. 앞으로도 계속 이용할 계획입니다.",
      rating: 5,
      isAnonymous: false,
      imageUrl: "/images/reviews/mongyi.jpg"
    });
    
    this.createReview({
      authorName: "익명",
      dogName: "말티즈",
      content: "미용 서비스를 이용했는데 너무 만족스러웠어요. 강아지도 스트레스 받지 않고 편안하게 미용을 마쳤네요. 다음에도 또 이용할 예정입니다.",
      rating: 4,
      isAnonymous: true,
      imageUrl: null
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Announcement operations
  async getAnnouncement(id: number): Promise<Announcement | undefined> {
    return this.announcements.get(id);
  }

  async getActiveAnnouncements(): Promise<Announcement[]> {
    const today = new Date();
    return Array.from(this.announcements.values())
      .filter(announcement => 
        announcement.isActive && 
        announcement.startDate <= today && 
        (!announcement.endDate || announcement.endDate >= today)
      )
      .sort((a, b) => a.order || 0 - (b.order || 0));
  }

  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const id = this.currentAnnouncementId++;
    const newAnnouncement: Announcement = {
      ...announcement,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.announcements.set(id, newAnnouncement);
    return newAnnouncement;
  }

  async updateAnnouncement(id: number, announcementData: Partial<Announcement>): Promise<Announcement | undefined> {
    const announcement = await this.getAnnouncement(id);
    if (!announcement) return undefined;
    
    const updatedAnnouncement = { 
      ...announcement, 
      ...announcementData,
      updatedAt: new Date()
    };
    this.announcements.set(id, updatedAnnouncement);
    return updatedAnnouncement;
  }

  async deleteAnnouncement(id: number): Promise<boolean> {
    return this.announcements.delete(id);
  }

  // Program operations
  async getProgram(id: number): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async getAllPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values())
      .sort((a, b) => a.order - b.order);
  }

  async getProgramsByCategory(category: string): Promise<Program[]> {
    return Array.from(this.programs.values())
      .filter(program => program.category === category)
      .sort((a, b) => a.order - b.order);
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    const id = this.currentProgramId++;
    const newProgram: Program = {
      ...program,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.programs.set(id, newProgram);
    return newProgram;
  }

  async updateProgram(id: number, programData: Partial<Program>): Promise<Program | undefined> {
    const program = await this.getProgram(id);
    if (!program) return undefined;
    
    const updatedProgram = { 
      ...program, 
      ...programData,
      updatedAt: new Date()
    };
    this.programs.set(id, updatedProgram);
    return updatedProgram;
  }

  async deleteProgram(id: number): Promise<boolean> {
    return this.programs.delete(id);
  }

  // Schedule operations
  async getScheduleItem(id: number): Promise<ScheduleItem | undefined> {
    return this.scheduleItems.get(id);
  }

  async getAllScheduleItems(): Promise<ScheduleItem[]> {
    return Array.from(this.scheduleItems.values())
      .sort((a, b) => a.order - b.order);
  }

  async createScheduleItem(scheduleItem: InsertScheduleItem): Promise<ScheduleItem> {
    const id = this.currentScheduleItemId++;
    const newScheduleItem: ScheduleItem = {
      ...scheduleItem,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.scheduleItems.set(id, newScheduleItem);
    return newScheduleItem;
  }

  async updateScheduleItem(id: number, scheduleItemData: Partial<ScheduleItem>): Promise<ScheduleItem | undefined> {
    const scheduleItem = await this.getScheduleItem(id);
    if (!scheduleItem) return undefined;
    
    const updatedScheduleItem = { 
      ...scheduleItem, 
      ...scheduleItemData,
      updatedAt: new Date()
    };
    this.scheduleItems.set(id, updatedScheduleItem);
    return updatedScheduleItem;
  }

  async deleteScheduleItem(id: number): Promise<boolean> {
    return this.scheduleItems.delete(id);
  }

  // Monthly Program operations
  async getMonthlyProgram(id: number): Promise<MonthlyProgram | undefined> {
    return this.monthlyPrograms.get(id);
  }

  async getMonthlyProgramsByMonth(year: number, month: number): Promise<MonthlyProgram[]> {
    return Array.from(this.monthlyPrograms.values())
      .filter(program => {
        const date = program.date;
        return date.getFullYear() === year && date.getMonth() === month;
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async createMonthlyProgram(monthlyProgram: InsertMonthlyProgram): Promise<MonthlyProgram> {
    const id = this.currentMonthlyProgramId++;
    const newMonthlyProgram: MonthlyProgram = {
      ...monthlyProgram,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.monthlyPrograms.set(id, newMonthlyProgram);
    return newMonthlyProgram;
  }

  async updateMonthlyProgram(id: number, monthlyProgramData: Partial<MonthlyProgram>): Promise<MonthlyProgram | undefined> {
    const monthlyProgram = await this.getMonthlyProgram(id);
    if (!monthlyProgram) return undefined;
    
    const updatedMonthlyProgram = { 
      ...monthlyProgram, 
      ...monthlyProgramData,
      updatedAt: new Date()
    };
    this.monthlyPrograms.set(id, updatedMonthlyProgram);
    return updatedMonthlyProgram;
  }

  async deleteMonthlyProgram(id: number): Promise<boolean> {
    return this.monthlyPrograms.delete(id);
  }

  // Gallery operations
  async getGalleryImage(id: number): Promise<GalleryImage | undefined> {
    return this.galleryImages.get(id);
  }

  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values())
      .sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
  }

  async getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values())
      .filter(image => image.category === category)
      .sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
  }

  async createGalleryImage(galleryImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = this.currentGalleryImageId++;
    const newGalleryImage: GalleryImage = {
      ...galleryImage,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.galleryImages.set(id, newGalleryImage);
    return newGalleryImage;
  }

  async updateGalleryImage(id: number, galleryImageData: Partial<GalleryImage>): Promise<GalleryImage | undefined> {
    const galleryImage = await this.getGalleryImage(id);
    if (!galleryImage) return undefined;
    
    const updatedGalleryImage = { 
      ...galleryImage, 
      ...galleryImageData,
      updatedAt: new Date()
    };
    this.galleryImages.set(id, updatedGalleryImage);
    return updatedGalleryImage;
  }

  async deleteGalleryImage(id: number): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  // Price operations
  async getPriceItem(id: number): Promise<PriceItem | undefined> {
    return this.priceItems.get(id);
  }

  async getAllPriceItems(): Promise<PriceItem[]> {
    return Array.from(this.priceItems.values())
      .sort((a, b) => a.order - b.order);
  }

  async getPriceItemsByCategory(category: string): Promise<PriceItem[]> {
    return Array.from(this.priceItems.values())
      .filter(item => item.category === category)
      .sort((a, b) => a.order - b.order);
  }

  async createPriceItem(priceItem: InsertPriceItem): Promise<PriceItem> {
    const id = this.currentPriceItemId++;
    const newPriceItem: PriceItem = {
      ...priceItem,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.priceItems.set(id, newPriceItem);
    return newPriceItem;
  }

  async updatePriceItem(id: number, priceItemData: Partial<PriceItem>): Promise<PriceItem | undefined> {
    const priceItem = await this.getPriceItem(id);
    if (!priceItem) return undefined;
    
    const updatedPriceItem = { 
      ...priceItem, 
      ...priceItemData,
      updatedAt: new Date()
    };
    this.priceItems.set(id, updatedPriceItem);
    return updatedPriceItem;
  }

  async deletePriceItem(id: number): Promise<boolean> {
    return this.priceItems.delete(id);
  }

  // Grooming operations
  async getGroomingService(id: number): Promise<GroomingService | undefined> {
    return this.groomingServices.get(id);
  }

  async getAllGroomingServices(): Promise<GroomingService[]> {
    return Array.from(this.groomingServices.values())
      .sort((a, b) => a.order - b.order);
  }

  async createGroomingService(groomingService: InsertGroomingService): Promise<GroomingService> {
    const id = this.currentGroomingServiceId++;
    const newGroomingService: GroomingService = {
      ...groomingService,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.groomingServices.set(id, newGroomingService);
    return newGroomingService;
  }

  async updateGroomingService(id: number, groomingServiceData: Partial<GroomingService>): Promise<GroomingService | undefined> {
    const groomingService = await this.getGroomingService(id);
    if (!groomingService) return undefined;
    
    const updatedGroomingService = { 
      ...groomingService, 
      ...groomingServiceData,
      updatedAt: new Date()
    };
    this.groomingServices.set(id, updatedGroomingService);
    return updatedGroomingService;
  }

  async deleteGroomingService(id: number): Promise<boolean> {
    return this.groomingServices.delete(id);
  }

  // Cafe operations
  async getCafeItem(id: number): Promise<CafeItem | undefined> {
    return this.cafeItems.get(id);
  }

  async getAllCafeItems(): Promise<CafeItem[]> {
    return Array.from(this.cafeItems.values())
      .sort((a, b) => a.order - b.order);
  }

  async getCafeItemsByCategory(category: string): Promise<CafeItem[]> {
    return Array.from(this.cafeItems.values())
      .filter(item => item.category === category)
      .sort((a, b) => a.order - b.order);
  }

  async createCafeItem(cafeItem: InsertCafeItem): Promise<CafeItem> {
    const id = this.currentCafeItemId++;
    const newCafeItem: CafeItem = {
      ...cafeItem,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.cafeItems.set(id, newCafeItem);
    return newCafeItem;
  }

  async updateCafeItem(id: number, cafeItemData: Partial<CafeItem>): Promise<CafeItem | undefined> {
    const cafeItem = await this.getCafeItem(id);
    if (!cafeItem) return undefined;
    
    const updatedCafeItem = { 
      ...cafeItem, 
      ...cafeItemData,
      updatedAt: new Date()
    };
    this.cafeItems.set(id, updatedCafeItem);
    return updatedCafeItem;
  }

  async deleteCafeItem(id: number): Promise<boolean> {
    return this.cafeItems.delete(id);
  }

  // Admission operations
  async getAdmissionRequest(id: number): Promise<AdmissionRequest | undefined> {
    return this.admissionRequests.get(id);
  }

  async getAllAdmissionRequests(): Promise<AdmissionRequest[]> {
    return Array.from(this.admissionRequests.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getAdmissionRequestsByStatus(status: string): Promise<AdmissionRequest[]> {
    return Array.from(this.admissionRequests.values())
      .filter(request => request.status === status)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createAdmissionRequest(admissionRequest: InsertAdmissionRequest): Promise<AdmissionRequest> {
    const id = this.currentAdmissionRequestId++;
    const newAdmissionRequest: AdmissionRequest = {
      ...admissionRequest,
      id,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.admissionRequests.set(id, newAdmissionRequest);
    return newAdmissionRequest;
  }

  async updateAdmissionRequest(id: number, admissionRequestData: Partial<AdmissionRequest>): Promise<AdmissionRequest | undefined> {
    const admissionRequest = await this.getAdmissionRequest(id);
    if (!admissionRequest) return undefined;
    
    const updatedAdmissionRequest = { 
      ...admissionRequest, 
      ...admissionRequestData,
      updatedAt: new Date()
    };
    this.admissionRequests.set(id, updatedAdmissionRequest);
    return updatedAdmissionRequest;
  }

  async deleteAdmissionRequest(id: number): Promise<boolean> {
    return this.admissionRequests.delete(id);
  }

  // FAQ operations
  async getFaqItem(id: number): Promise<FaqItem | undefined> {
    return this.faqItems.get(id);
  }

  async getAllFaqItems(): Promise<FaqItem[]> {
    return Array.from(this.faqItems.values())
      .sort((a, b) => a.order - b.order);
  }

  async getFaqItemsByCategory(category: string): Promise<FaqItem[]> {
    return Array.from(this.faqItems.values())
      .filter(item => item.category === category)
      .sort((a, b) => a.order - b.order);
  }

  async createFaqItem(faqItem: InsertFaqItem): Promise<FaqItem> {
    const id = this.currentFaqItemId++;
    const newFaqItem: FaqItem = {
      ...faqItem,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.faqItems.set(id, newFaqItem);
    return newFaqItem;
  }

  async updateFaqItem(id: number, faqItemData: Partial<FaqItem>): Promise<FaqItem | undefined> {
    const faqItem = await this.getFaqItem(id);
    if (!faqItem) return undefined;
    
    const updatedFaqItem = { 
      ...faqItem, 
      ...faqItemData,
      updatedAt: new Date()
    };
    this.faqItems.set(id, updatedFaqItem);
    return updatedFaqItem;
  }

  async deleteFaqItem(id: number): Promise<boolean> {
    return this.faqItems.delete(id);
  }

  // Review operations
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getVerifiedReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.isVerified)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createReview(review: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const newReview: Review = {
      ...review,
      id,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.reviews.set(id, newReview);
    return newReview;
  }

  async updateReview(id: number, reviewData: Partial<Review>): Promise<Review | undefined> {
    const review = await this.getReview(id);
    if (!review) return undefined;
    
    const updatedReview = { 
      ...review, 
      ...reviewData,
      updatedAt: new Date()
    };
    this.reviews.set(id, updatedReview);
    return updatedReview;
  }

  async deleteReview(id: number): Promise<boolean> {
    return this.reviews.delete(id);
  }

  // Site settings operations
  async getSiteSettings(): Promise<SiteSetting | undefined> {
    // Always return the first site settings entry
    return Array.from(this.siteSettings.values())[0];
  }

  async createSiteSettings(siteSettings: InsertSiteSetting): Promise<SiteSetting> {
    const id = this.currentSiteSettingsId++;
    const newSiteSettings: SiteSetting = {
      ...siteSettings,
      id,
      updatedAt: new Date()
    };
    this.siteSettings.set(id, newSiteSettings);
    return newSiteSettings;
  }

  async updateSiteSettings(id: number, siteSettingsData: Partial<SiteSetting>): Promise<SiteSetting | undefined> {
    const siteSettings = await this.getSiteSettings();
    if (!siteSettings) return undefined;
    
    const updatedSiteSettings = { 
      ...siteSettings, 
      ...siteSettingsData,
      updatedAt: new Date()
    };
    this.siteSettings.set(siteSettings.id, updatedSiteSettings);
    return updatedSiteSettings;
  }
}

export const storage = new MemStorage();