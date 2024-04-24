import React, { RefObject, useEffect, useState } from 'react';
export default function useScrollVisible(ref: RefObject<HTMLDivElement>) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setIsVisible(true);
          setHasBeenVisible(true); // 섹션이 한번 보이면 계속 true로 유지
        }
      },
      {
        threshold: 0.4,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
}
