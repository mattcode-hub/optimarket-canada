import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {Icon && (
        <div className="mb-4 rounded-full bg-neutral-100 p-4">
          <Icon className="h-12 w-12 text-neutral-400" />
        </div>
      )}

      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
        {title}
      </h3>

      <p className="max-w-md text-center text-neutral-600 mb-6">
        {description}
      </p>

      {action && (
        <Link
          href={action.href}
          className="rounded-lg bg-primary-600 px-6 py-2 font-medium text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
