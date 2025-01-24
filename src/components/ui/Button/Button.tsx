interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'icon';
  variant?: 'default' | 'ghost';
}

function Button({ 
  className = '', 
  size = 'md', 
  variant = 'default',
  children, 
  ...props 
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2 h-9 w-9'
  };

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground'
  };

  return (
    <button
      className={`
        rounded-md 
        font-medium 
        inline-flex 
        items-center 
        justify-center 
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
