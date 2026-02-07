import { useState } from 'react';
import Button from '../common/Button';
import { dreamService } from '../../services/dream.service';

export default function TranscriptionPreview({ dream, onContinue }) {
  const [transcript, setTranscript] = useState(dream?.transcript || '');
  const [title, setTitle] = useState(dream?.title || '');
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    setSaving(true);
    try {
      if (dream?.dream_id || dream?.id) {
        await dreamService.update(dream.dream_id || dream.id, { transcript, title });
      }
      onContinue({ ...dream, transcript, title });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Review Your Dream</h3>
      <p className="text-sm text-gray-400">Review and edit the transcription if needed.</p>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Give your dream a title..."
        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={8}
        className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      />

      <div className="flex gap-3">
        <Button onClick={handleContinue} disabled={!transcript.trim() || saving} className="flex-1">
          {saving ? 'Saving...' : 'Continue to Life Questions'}
        </Button>
      </div>
    </div>
  );
}
