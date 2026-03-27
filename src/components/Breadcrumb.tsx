import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1">
      <Link href="/" className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors">
        Home
      </Link>

      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 text-neutral-400" />
          {index === items.length - 1 ? (
            <span className="text-sm font-medium text-neutral-900">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
