import { useState, useEffect } from 'react';
import { sleepService } from '../../services/sleep.service';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { formatDate } from '../../utils/formatters';

export default function SleepLogger() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    quality: 3,
    hours: 7,
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const loadLogs = () => {
    sleepService.getAll()
      .then((res) => setLogs(res.data.logs))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadLogs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sleepService.create(form);
      setForm({ ...form, notes: '' });
      loadLogs();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const qualityColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-400', 'bg-green-600'];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="p-4 bg-dark-card border border-dark-border rounded-xl space-y-3">
        <h3 className="font-semibold">Log Sleep</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-400">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-2 py-1.5 bg-dark-surface border border-dark-border rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs text-gray-400">Quality (1-5)</label>
            <input type="number" min="1" max="5" value={form.quality} onChange={(e) => setForm({ ...form, quality: parseInt(e.target.value) })} className="w-full px-2 py-1.5 bg-dark-surface border border-dark-border rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs text-gray-400">Hours</label>
            <input type="number" min="0" max="24" step="0.5" value={form.hours} onChange={(e) => setForm({ ...form, hours: parseFloat(e.target.value) })} className="w-full px-2 py-1.5 bg-dark-surface border border-dark-border rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes (optional)" rows={2} className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
        <Button type="submit" disabled={submitting} className="w-full">{submitting ? 'Saving...' : 'Log Sleep'}</Button>
      </form>

      {loading ? <Loader /> : (
        <div className="space-y-2">
          <h3 className="font-semibold">Recent Logs</h3>
          {logs.length === 0 ? <p className="text-gray-400 text-sm">No sleep logs yet.</p> : (
            logs.slice(0, 14).map((log) => (
              <div key={log.id} className="flex items-center gap-3 p-2 bg-dark-card border border-dark-border rounded-lg text-sm">
                <span className="text-gray-400 w-24">{formatDate(log.date)}</span>
                <div className={`w-3 h-3 rounded-full ${qualityColors[log.quality]}`} />
                <span className="text-gray-300">{log.hours}h</span>
                {log.notes && <span className="text-xs text-gray-500 truncate flex-1">{log.notes}</span>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
