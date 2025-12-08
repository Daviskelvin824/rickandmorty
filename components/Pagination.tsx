'use client';

import { useEffect, useRef } from 'react';
import { useCharacterStore } from '@/store/useCharacterStore';
import gsap from 'gsap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paginationRef.current) {
      const buttons = paginationRef.current.querySelectorAll('button');
      buttons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.1,
            duration: 0.2,
            ease: 'power2.out',
          });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          });
        });
      });
    }
  }, [currentPage, totalPages]);
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div ref={paginationRef} className="flex items-center justify-center gap-3 flex-wrap py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#1a1f3a] border-2 border-gray-300 dark:border-[#00ff88]/30 text-gray-800 dark:text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#00ff88] hover:bg-[#00ff88]/10 hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all duration-300 disabled:hover:border-gray-300 dark:disabled:hover:border-[#00ff88]/30 disabled:hover:bg-white dark:disabled:hover:bg-[#1a1f3a] disabled:hover:shadow-none"
      >
        ← Previous
      </button>

      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-3 text-gray-600 dark:text-[#00ff88] font-bold">
              ...
            </span>
          );
        }

        const isActive = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-white shadow-[0_0_20px_rgba(0,255,136,0.5)] scale-110'
                : 'bg-white dark:bg-[#1a1f3a] border-2 border-gray-300 dark:border-[#00ff88]/20 text-gray-800 dark:text-white hover:border-[#00ff88] hover:bg-[#00ff88]/10 hover:shadow-[0_0_15px_rgba(0,255,136,0.3)]'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#1a1f3a] border-2 border-gray-300 dark:border-[#00ff88]/30 text-gray-800 dark:text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#00ff88] hover:bg-[#00ff88]/10 hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all duration-300 disabled:hover:border-gray-300 dark:disabled:hover:border-[#00ff88]/30 disabled:hover:bg-white dark:disabled:hover:bg-[#1a1f3a] disabled:hover:shadow-none"
      >
        Next →
      </button>
    </div>
  );
}

