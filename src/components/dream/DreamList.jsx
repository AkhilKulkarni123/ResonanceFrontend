import DreamCard from './DreamCard';
import Loader from '../common/Loader';

export default function DreamList({ dreams, loading, emptyMessage = 'No dreams yet. Record your first dream!' }) {
  if (loading) return <Loader text="Loading dreams..." />;

  if (!dreams || dreams.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">💭</p>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dreams.map((dream) => (
        <DreamCard key={dream.id} dream={dream} />
      ))}
    </div>
  );
}
