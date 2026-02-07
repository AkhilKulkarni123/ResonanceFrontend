export default function Avatar({ src, name, size = 'md', isAnonymous = false }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };
  const initial = isAnonymous ? '?' : (name?.charAt(0)?.toUpperCase() || '?');

  if (src && !isAnonymous) {
    return <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover`} />;
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold`}>
      {initial}
    </div>
  );
}
