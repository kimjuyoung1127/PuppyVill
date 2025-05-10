import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Set the initial value
      checkMobile();

      // Add event listener
      window.addEventListener('resize', checkMobile);

      // Clean up
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  return isMobile;
}