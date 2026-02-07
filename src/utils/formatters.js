import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(date) {
  return format(new Date(date), 'MMM d, yyyy');
}

export function formatDateTime(date) {
  return format(new Date(date), 'MMM d, yyyy h:mm a');
}

export function formatRelative(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function truncate(str, length = 100) {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export function getMoodEmoji(mood) {
  const moodMap = {
    happy: '😊', sad: '😢', anxious: '😰', neutral: '😐',
    fearful: '😨', excited: '🤩', confused: '😵', peaceful: '😌',
  };
  return moodMap[mood] || '💭';
}
