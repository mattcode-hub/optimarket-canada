interface BadgeProps {
  variant: 'condition' | 'category' | 'shipping' | 'verified' | 'featured';
  text: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Badge({ variant, text, size = 'md' }: BadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const variantClasses = {
    condition: 'bg-primary-100 text-primary-700 border border-primary-200',
    category: 'bg-accent-100 text-accent-700 border border-accent-200',
    shipping: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
    verified: 'bg-success bg-opacity-10 text-success border border-success border-opacity-20',
    featured: 'bg-secondary-500 text-white border border-secondary-600',
  };

  return (
    <span
      className={`inline-block rounded-full font-medium transition-colors ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {text}
    </span>
  );
}
