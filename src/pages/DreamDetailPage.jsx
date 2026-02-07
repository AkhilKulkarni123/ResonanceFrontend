import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dreamService } from '../services/dream.service';
import { artService } from '../services/art.service';
import AnalysisPanel from '../components/analysis/AnalysisPanel';
import FeedbackForm from '../components/feedback/FeedbackForm';
import DreamArtGallery from '../components/creative/DreamArtGallery';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { formatDateTime, getMoodEmoji } from '../utils/formatters';
import { ART_STYLES } from '../utils/constants';

export default function DreamDetailPage() {
  const { id } = useParams();
  const [dream, setDream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artworks, setArtworks] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('surrealist');

  useEffect(() => {
    dreamService.getOne(id)
      .then((res) => {
        setDream(res.data.dream);
        setArtworks(res.data.dream.DreamArts || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const generateArt = async () => {
    setGenerating(true);
    try {
      const res = await artService.generate({ dream_id: id, style: selectedStyle });
      setArtworks((prev) => [res.data.art, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <Loader text="Loading dream..." />;
  if (!dream) return <div className="text-center py-12"><p className="text-gray-400">Dream not found.</p><Link to="/journal" className="text-primary">Back to journal</Link></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <Link to="/journal" className="text-sm text-gray-400 hover:text-primary mb-2 inline-block">&larr; Back to Journal</Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{dream.title || 'Untitled Dream'} {dream.mood && getMoodEmoji(dream.mood)}</h1>
            <p className="text-sm text-gray-500">{formatDateTime(dream.created_at || dream.createdAt)}</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            {dream.categories?.map((c) => <span key={c} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{c}</span>)}
            {dream.tags?.map((t) => <span key={t} className="text-xs px-2 py-0.5 bg-dark-surface text-gray-400 rounded-full">{t}</span>)}
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Dream Transcript</h3>
        <p className="text-gray-200 whitespace-pre-line">{dream.transcript}</p>
      </div>

      {/* Media playback */}
      {dream.video_url && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Recording</h3>
          <video src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${dream.video_url}`} controls className="w-full rounded-xl max-h-96" />
        </div>
      )}
      {!dream.video_url && dream.audio_url && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Recording</h3>
          <audio src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${dream.audio_url}`} controls className="w-full" />
        </div>
      )}

      {/* Life Context Summary */}
      {dream.LifeContext?.questionnaire_answers && (
        <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Life Context</h3>
          <div className="grid gap-2 text-sm">
            {Object.entries(dream.LifeContext.questionnaire_answers).map(([key, val]) => (
              <div key={key} className="flex gap-2">
                <span className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}:</span>
                <span className="text-gray-300">{Array.isArray(val) ? val.join(', ') : String(val)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis */}
      {dream.analysis && <AnalysisPanel analysis={dream.analysis} prediction={dream.prediction} />}

      {/* Feedback */}
      {dream.prediction && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Prediction Feedback</h3>
          {dream.Feedbacks?.length > 0 ? (
            <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
              <p className="text-sm">Rating: <span className="text-yellow-400">{'★'.repeat(dream.Feedbacks[0].prediction_accuracy)}{'☆'.repeat(5 - dream.Feedbacks[0].prediction_accuracy)}</span></p>
              {dream.Feedbacks[0].outcome_description && <p className="text-sm text-gray-400 mt-1">{dream.Feedbacks[0].outcome_description}</p>}
            </div>
          ) : (
            <FeedbackForm dreamId={dream.id} />
          )}
        </div>
      )}

      {/* Dream Art */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-400">Dream Art</h3>
          <div className="flex items-center gap-2">
            <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)} className="px-2 py-1 bg-dark-surface border border-dark-border rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
              {ART_STYLES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <Button onClick={generateArt} disabled={generating} className="text-sm">
              {generating ? 'Generating...' : 'Generate Art'}
            </Button>
          </div>
        </div>
        <DreamArtGallery artworks={artworks} />
      </div>
    </div>
  );
}
