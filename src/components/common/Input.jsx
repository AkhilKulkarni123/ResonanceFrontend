export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}
      <input
        className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
