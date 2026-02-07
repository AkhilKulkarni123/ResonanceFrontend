import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SleepChart({ sleepData }) {
  if (!sleepData || sleepData.length === 0) return null;

  const data = {
    labels: sleepData.map((d) => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Hours',
        data: sleepData.map((d) => d.hours),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: '#6366f1',
        borderWidth: 1,
      },
      {
        label: 'Quality',
        data: sleepData.map((d) => d.quality),
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: '#8b5cf6',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { labels: { color: '#9ca3af' } } },
    scales: {
      y: { ticks: { color: '#6b7280' }, grid: { color: '#2d2640' } },
      x: { ticks: { color: '#6b7280', maxTicksLimit: 10 }, grid: { color: '#2d2640' } },
    },
  };

  return (
    <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
      <h3 className="font-semibold mb-3">Sleep Tracking</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
