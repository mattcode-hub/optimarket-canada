import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  listingCount: number;
  href: string;
}

export default function CategoryCard({
  name,
  icon: Icon,
  listingCount,
  href,
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="group rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary-50 p-3 transition-colors group-hover:bg-primary-100">
            <Icon className="h-6 w-6 text-primary-600 transition-colors group-hover:text-primary-700" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-neutral-600">
              {listingCount} {listingCount === 1 ? 'listing' : 'listings'}
            </p>
          </div>

          <div className="text-neutral-400 transition-transform group-hover:translate-x-1">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
