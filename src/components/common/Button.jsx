export default function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '', ...props }) {
  const base = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/25',
    secondary: 'bg-dark-surface hover:bg-dark-border text-gray-200 border border-dark-border',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'hover:bg-dark-surface text-gray-300',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
