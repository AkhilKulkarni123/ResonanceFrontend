import { useState } from 'react';
import Button from '../common/Button';
import { contextService } from '../../services/context.service';

const STEPS = [
  {
    title: 'Emotional State',
    questions: [
      { key: 'current_mood', label: 'How are you feeling today? (1-10)', type: 'range', min: 1, max: 10 },
      { key: 'mood_duration', label: 'How long have you felt this way?', type: 'select', options: ['Just today', 'A few days', 'About a week', 'Weeks', 'Months'] },
      { key: 'dominant_emotions', label: 'Select your dominant emotions', type: 'multiselect', options: ['anxious', 'happy', 'sad', 'angry', 'confused', 'hopeful', 'nostalgic', 'fearful', 'excited', 'numb'] },
    ],
  },
  {
    title: 'Recent Events',
    questions: [
      { key: 'recent_significant_event', label: 'Has anything significant happened recently?', type: 'textarea' },
      { key: 'life_changes', label: 'Any recent life changes?', type: 'multiselect', options: ['new job', 'relationship change', 'loss', 'move', 'health issue', 'financial change', 'none'] },
      { key: 'stress_level', label: 'Current stress level (1-10)', type: 'range', min: 1, max: 10 },
    ],
  },
  {
    title: 'Relationships',
    questions: [
      { key: 'relationship_status', label: 'Relationship status', type: 'select', options: ['Single', 'In a relationship', 'Married', 'Complicated', 'Prefer not to say'] },
      { key: 'relationship_concern', label: 'Any relationship on your mind?', type: 'textarea', optional: true },
      { key: 'social_satisfaction', label: 'Social life satisfaction (1-5)', type: 'range', min: 1, max: 5 },
    ],
  },
  {
    title: 'Goals & Concerns',
    questions: [
      { key: 'current_goals', label: 'What are you working toward?', type: 'textarea' },
      { key: 'biggest_worry', label: 'What worries you most right now?', type: 'textarea' },
      { key: 'sleep_quality_lately', label: 'Recent sleep quality (1-5)', type: 'range', min: 1, max: 5 },
    ],
  },
];

export default function LifeContextForm({ dreamId, onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const currentStep = STEPS[step];

  const updateAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMultiselect = (key, option) => {
    const current = answers[key] || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    updateAnswer(key, updated);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await contextService.create({ dream_id: dreamId, questionnaire_answers: answers });
      onComplete?.(res.data.dream);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-4">
        {STEPS.map((s, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-dark-border'}`} />
        ))}
      </div>

      <h3 className="text-lg font-semibold">{currentStep.title}</h3>
      <p className="text-sm text-gray-400">Step {step + 1} of {STEPS.length}</p>

      <div className="space-y-4">
        {currentStep.questions.map((q) => (
          <div key={q.key}>
            <label className="block text-sm font-medium text-gray-300 mb-2">{q.label}</label>
            {q.type === 'range' && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{q.min}</span>
                <input
                  type="range"
                  min={q.min}
                  max={q.max}
                  value={answers[q.key] || Math.ceil((q.min + q.max) / 2)}
                  onChange={(e) => updateAnswer(q.key, parseInt(e.target.value))}
                  className="flex-1 accent-primary"
                />
                <span className="text-sm font-semibold text-primary w-6 text-center">{answers[q.key] || Math.ceil((q.min + q.max) / 2)}</span>
              </div>
            )}
            {q.type === 'select' && (
              <select
                value={answers[q.key] || ''}
                onChange={(e) => updateAnswer(q.key, e.target.value)}
                className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select...</option>
                {q.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            )}
            {q.type === 'textarea' && (
              <textarea
                value={answers[q.key] || ''}
                onChange={(e) => updateAnswer(q.key, e.target.value)}
                rows={3}
                placeholder={q.optional ? 'Optional...' : 'Type your answer...'}
                className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            )}
            {q.type === 'multiselect' && (
              <div className="flex flex-wrap gap-2">
                {q.options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => toggleMultiselect(q.key, o)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      (answers[q.key] || []).includes(o)
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-dark-surface border-dark-border text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3">
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>Back</Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep(step + 1)} className="flex-1">Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting} className="flex-1">
            {submitting ? 'Analyzing your dream...' : 'Get Dream Analysis'}
          </Button>
        )}
      </div>
    </div>
  );
}
