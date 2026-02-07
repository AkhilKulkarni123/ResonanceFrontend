export default function Loader({ text = 'Loading...', size = 'md' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizes[size]} border-2 border-dark-border border-t-primary rounded-full animate-spin`} />
      {text && <p className="mt-3 text-gray-400 text-sm">{text}</p>}
    </div>
  );
}
