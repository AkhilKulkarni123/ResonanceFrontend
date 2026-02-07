export default function StreakCounter({ streak }) {
  return (
    <div className="p-4 bg-dark-card border border-dark-border rounded-xl text-center">
      <div className="text-3xl mb-1">{streak > 0 ? '🔥' : '💤'}</div>
      <div className="text-2xl font-bold text-primary">{streak}</div>
      <p className="text-xs text-gray-400">day streak</p>
    </div>
  );
}
