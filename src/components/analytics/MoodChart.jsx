import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const MOOD_VALUES = { happy: 5, excited: 4.5, peaceful: 4, neutral: 3, confused: 2.5, sad: 2, anxious: 1.5, fearful: 1 };

export default function MoodChart({ moodOverTime }) {
  if (!moodOverTime || moodOverTime.length === 0) return null;

  const data = {
    labels: moodOverTime.map((d) => new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [{
      label: 'Mood',
      data: moodOverTime.map((d) => MOOD_VALUES[d.mood] || 3),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: '#6366f1',
    }],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, max: 5.5, ticks: { color: '#6b7280', callback: (v) => Object.entries(MOOD_VALUES).find(([, val]) => val === v)?.[0] || '' }, grid: { color: '#2d2640' } },
      x: { ticks: { color: '#6b7280', maxTicksLimit: 8 }, grid: { color: '#2d2640' } },
    },
  };

  return (
    <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
      <h3 className="font-semibold mb-3">Mood Over Time</h3>
      <Line data={data} options={options} />
    </div>
  );
}
