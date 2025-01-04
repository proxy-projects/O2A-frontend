interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
  }
  
  function Button({ className = '', size = 'md', children, ...props }: ButtonProps) {
    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
  
    return (
      <button
        className={`rounded-md font-medium ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

export default Button