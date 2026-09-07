import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollableOptionsBarProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  step?: number;
  idPrefix?: string;
  showAlwaysRightButton?: boolean;
}

export const ScrollableOptionsBar: React.FC<ScrollableOptionsBarProps> = ({
  children,
  className = '',
  containerClassName = '',
  step = 220,
  idPrefix = 'options-bar',
  showAlwaysRightButton = true
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check scroll positions
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    // Give a 6px threshold for floating point calculations
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();

    // Resize observer to re-check when viewport or items change
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });
      resizeObserver.observe(el);
    }

    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  // Working moving right scroll handler
  const handleScrollRight = () => {
    const el = scrollRef.current;
    if (!el) return;

    if (canScrollRight) {
      el.scrollBy({ left: step, behavior: 'smooth' });
    } else {
      // Loop back to start if reached the end so button always works!
      el.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Working moving left scroll handler
  const handleScrollLeft = () => {
    const el = scrollRef.current;
    if (!el) return;

    if (canScrollLeft) {
      el.scrollBy({ left: -step, behavior: 'smooth' });
    } else {
      // Jump to end
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={`relative flex items-center group/scroll ${containerClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Scroll Button (visible when scrolled or hovered) */}
      {canScrollLeft && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center pr-2 bg-gradient-to-r from-[#1e1c1a] via-[#1e1c1a]/90 to-transparent pl-0.5">
          <button
            id={`${idPrefix}-scroll-left-btn`}
            type="button"
            onClick={handleScrollLeft}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#242220] hover:bg-[#2d2a27] border border-[#383430] hover:border-[#8d7d70] text-[#c99c7b] hover:text-[#f5f2ed] shadow-lg flex items-center justify-center transition-all cursor-pointer active:scale-90"
            title="Scroll options left"
            aria-label="Scroll options left"
          >
            <ChevronLeft className="w-4 h-4 text-[#c99c7b]" />
          </button>
        </div>
      )}

      {/* Scrollable Track Container */}
      <div
        ref={scrollRef}
        className={`flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full transition-all ${
          canScrollLeft ? 'pl-9' : 'pl-1'
        } ${canScrollRight || showAlwaysRightButton ? 'pr-9' : 'pr-1'} ${className}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {/* Working Moving Right Scroll Button */}
      {(canScrollRight || showAlwaysRightButton) && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center pl-2 bg-gradient-to-l from-[#1e1c1a] via-[#1e1c1a]/90 to-transparent pr-0.5">
          <button
            id={`${idPrefix}-scroll-right-btn`}
            type="button"
            onClick={handleScrollRight}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#242220] hover:bg-[#2d2a27] border shadow-lg flex items-center justify-center transition-all cursor-pointer active:scale-90 group/btn ${
              canScrollRight 
                ? 'border-[#8d7d70] text-[#c99c7b] hover:text-[#f5f2ed] ring-1 ring-[#8d7d70]/30 hover:ring-[#8d7d70]' 
                : 'border-[#383430] text-[#a1958b] hover:text-[#f5f2ed]'
            }`}
            title={canScrollRight ? "Scroll options right" : "Scroll back to first option"}
            aria-label="Scroll options right"
          >
            <ChevronRight className="w-4 h-4 text-[#c99c7b] group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
