import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#fb923c', '#9ca3af'];

export default function CategoryPieChart({ categories }) {
  if (!categories || categories.length === 0) return null;

  const data = {
    labels: categories.map((c) => c.category),
    datasets: [{
      data: categories.map((c) => c.count),
      backgroundColor: COLORS.slice(0, categories.length),
      borderWidth: 0,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#9ca3af', padding: 12, usePointStyle: true },
      },
    },
  };

  return (
    <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
      <h3 className="font-semibold mb-3">Dream Categories</h3>
      <div className="max-w-xs mx-auto">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
