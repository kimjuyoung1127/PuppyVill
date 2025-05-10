import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: '홈' },
  { href: '/programs', label: '프로그램' },
  { href: '/schedule', label: '일과 & 프로그램' },
  { href: '/gallery', label: '사진첩' },
  { href: '/pricing', label: '이용요금' },
  { href: '/grooming', label: '미용' },
  { href: '/cafe', label: '카페' },
  { href: '/admission', label: '입학/상담' },
  { href: '/faq', label: 'FAQ & 후기' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [location] = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' 
          : 'bg-[#FFF9F5] py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
                퍼피빌
              </span>
              <span className="hidden md:inline-block text-sm font-medium text-gray-600">
                애견 유치원
              </span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a 
                  className={`text-sm font-medium transition-colors hover:text-pink-500 ${
                    location === item.href ? 'text-pink-600 font-semibold' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] max-w-sm bg-white p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>
                    <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
                      퍼피빌
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col p-4">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a
                        className={`py-2 px-4 text-base my-1 rounded-md transition-colors ${
                          location === item.href
                            ? 'bg-pink-100 text-pink-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t">
                    <Link href="/admission">
                      <a className="w-full">
                        <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
                          입학 상담 예약
                        </Button>
                      </a>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* CTA Button (desktop only) */}
          <div className="hidden md:block">
            <Link href="/admission">
              <a>
                <Button className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500">
                  입학 상담 예약
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}