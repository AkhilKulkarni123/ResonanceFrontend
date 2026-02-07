const ICONS = {
  star: '⭐', book: '📖', moon: '🌙', flame: '🔥',
  users: '👥', eye: '👁', palette: '🎨', bed: '🛏',
};

export default function BadgeIcon({ name, icon, earned, description, small = false }) {
  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg ${earned ? 'bg-primary/10 border border-primary/30' : 'bg-dark-surface border border-dark-border opacity-50'} ${small ? 'text-xs' : 'text-sm'}`}>
      <span className={small ? 'text-base' : 'text-xl'}>{ICONS[icon] || '🏆'}</span>
      <div>
        <p className="font-medium">{name}</p>
        {!small && description && <p className="text-xs text-gray-400">{description}</p>}
      </div>
    </div>
  );
}
