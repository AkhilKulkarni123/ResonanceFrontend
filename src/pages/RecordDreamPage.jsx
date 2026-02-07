import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DreamContext } from '../context/DreamContext';
import DreamRecorder from '../components/dream/DreamRecorder';
import TranscriptionPreview from '../components/dream/TranscriptionPreview';
import LifeContextForm from '../components/context/LifeContextForm';
import Loader from '../components/common/Loader';

export default function RecordDreamPage() {
  const { currentDream, setCurrentDream, recordingStep, setRecordingStep, resetSession } = useContext(DreamContext);
  const navigate = useNavigate();

  const handleRecordComplete = (data) => {
    setCurrentDream(data);
    if (data.transcript) {
      setRecordingStep('review');
    } else {
      setRecordingStep('context');
    }
  };

  const handleReviewComplete = (data) => {
    setCurrentDream(data);
    setRecordingStep('context');
  };

  const handleAnalysisComplete = (dream) => {
    resetSession();
    navigate(`/dream/${dream.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {['Record', 'Review', 'Life Context', 'Analysis'].map((step, i) => {
          const stepIndex = ['record', 'review', 'context', 'analyzing'].indexOf(recordingStep);
          return (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                i <= stepIndex ? 'bg-primary text-white' : 'bg-dark-border text-gray-500'
              }`}>
                {i + 1}
              </div>
              <span className={`text-xs ${i <= stepIndex ? 'text-gray-200' : 'text-gray-500'}`}>{step}</span>
              {i < 3 && <div className={`flex-1 h-0.5 ${i < stepIndex ? 'bg-primary' : 'bg-dark-border'}`} />}
            </div>
          );
        })}
      </div>

      {recordingStep === 'record' && (
        <>
          <h1 className="text-2xl font-bold mb-2">Record Your Dream</h1>
          <p className="text-gray-400 mb-6">Use your camera to describe your dream, or type it out below.</p>
          <DreamRecorder onComplete={handleRecordComplete} />
        </>
      )}

      {recordingStep === 'review' && currentDream && (
        <TranscriptionPreview dream={currentDream} onContinue={handleReviewComplete} />
      )}

      {recordingStep === 'context' && currentDream && (
        <>
          <h2 className="text-xl font-bold mb-2">Life Context</h2>
          <p className="text-gray-400 mb-6">Help Resonance understand your life situation for a more accurate analysis.</p>
          <LifeContextForm dreamId={currentDream.dream_id || currentDream.id} onComplete={handleAnalysisComplete} />
        </>
      )}

      {recordingStep === 'analyzing' && (
        <div className="text-center py-20">
          <Loader size="lg" text="" />
          <h2 className="text-xl font-bold mt-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Resonance is interpreting your dream...</h2>
          <p className="text-gray-400 mt-2">Analyzing symbols, emotions, and patterns</p>
        </div>
      )}
    </div>
  );
}
