import { useState, useEffect } from 'react';
import { dreamService } from '../services/dream.service';
import DreamList from '../components/dream/DreamList';
import DreamTimeline from '../components/dream/DreamTimeline';
import Button from '../components/common/Button';
import { useDebounce } from '../hooks/useDebounce';
import { MOODS, DREAM_CATEGORIES } from '../utils/constants';

export default function DreamJournalPage() {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid'); // grid or timeline
  const [search, setSearch] = useState('');
  const [mood, setMood] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(search, 400);

  const loadDreams = () => {
    setLoading(true);
    const params = { page, limit: 20 };
    if (debouncedSearch) params.search = debouncedSearch;
    if (mood) params.mood = mood;
    if (category) params.category = category;

    dreamService.getAll(params)
      .then((res) => {
        setDreams(res.data.dreams);
        setTotalPages(res.data.pages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadDreams(); }, [page, debouncedSearch, mood, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dream Journal</h1>
        <div className="flex gap-2">
          <Button variant={view === 'grid' ? 'primary' : 'secondary'} onClick={() => setView('grid')} className="text-sm">Grid</Button>
          <Button variant={view === 'timeline' ? 'primary' : 'secondary'} onClick={() => setView('timeline')} className="text-sm">Timeline</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dreams..."
          className="px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary w-64"
        />
        <select value={mood} onChange={(e) => { setMood(e.target.value); setPage(1); }} className="px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">All moods</option>
          {MOODS.map((m) => <option key={m.value} value={m.value}>{m.emoji} {m.label}</option>)}
        </select>
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">All categories</option>
          {DREAM_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {(search || mood || category) && (
          <Button variant="ghost" onClick={() => { setSearch(''); setMood(''); setCategory(''); setPage(1); }} className="text-xs">Clear</Button>
        )}
      </div>

      {/* Dreams */}
      {view === 'grid' ? (
        <DreamList dreams={dreams} loading={loading} />
      ) : (
        <DreamTimeline dreams={dreams} />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button variant="secondary" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>Previous</Button>
          <span className="flex items-center text-sm text-gray-400">Page {page} of {totalPages}</span>
          <Button variant="secondary" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</Button>
        </div>
      )}
    </div>
  );
}
