import { useState } from 'react';
import Button from '../common/Button';
import { feedbackService } from '../../services/feedback.service';

export default function FeedbackForm({ dreamId, onSubmitted }) {
  const [accuracy, setAccuracy] = useState(3);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await feedbackService.create({
        dream_id: dreamId,
        prediction_accuracy: accuracy,
        outcome_description: description,
      });
      setSubmitted(true);
      onSubmitted?.();
    } catch (err) {
      console.error('Feedback submission failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-xl text-center">
        <p className="text-green-400 font-medium">Thanks for your feedback!</p>
        <p className="text-xs text-gray-400 mt-1">This helps Resonance improve future predictions.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-dark-surface rounded-xl border border-dark-border space-y-4">
      <h3 className="font-semibold">How accurate was the prediction?</h3>
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setAccuracy(star)}
            className={`text-2xl transition-transform ${star <= accuracy ? 'text-yellow-400 scale-110' : 'text-gray-600'}`}
          >
            ★
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-gray-400">
        {accuracy <= 2 ? 'Not very accurate' : accuracy === 3 ? 'Somewhat accurate' : 'Very accurate'}
      </p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What actually happened? (optional)"
        rows={3}
        className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
      />
      <Button onClick={handleSubmit} disabled={submitting} className="w-full">
        {submitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </div>
  );
}
