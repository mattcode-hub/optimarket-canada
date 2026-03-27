'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const maxVisiblePages = 5;
  const pages = [];

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-lg border border-neutral-300 p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:border-primary-500 hover:enabled:bg-primary-50"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* First page and ellipsis */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="text-neutral-500">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-primary-600 text-white'
              : 'text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page and ellipsis */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-neutral-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-neutral-300 p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:border-primary-500 hover:enabled:bg-primary-50"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
