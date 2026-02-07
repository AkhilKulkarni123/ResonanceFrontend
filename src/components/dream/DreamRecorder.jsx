import { useRef, useEffect, useState } from 'react';
import { useMediaRecorder } from '../../hooks/useMediaRecorder';
import { useDreamRecording } from '../../hooks/useDreamRecording';
import Button from '../common/Button';
import { formatDuration } from '../../utils/formatters';

export default function DreamRecorder({ onComplete }) {
  const videoRef = useRef(null);
  const { stream, isRecording, mediaBlob, error, duration, startStream, startRecording, stopRecording, cleanup } = useMediaRecorder();
  const { isUploading, uploadError, uploadRecording, createTextDream } = useDreamRecording();
  const [mode, setMode] = useState('video'); // video or text
  const [textDream, setTextDream] = useState('');
  const [textTitle, setTextTitle] = useState('');

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (mediaBlob) {
      uploadRecording(mediaBlob).then((data) => {
        if (data) {
          cleanup();
          onComplete?.(data);
        }
      });
    }
  }, [mediaBlob]);

  const handleTextSubmit = async () => {
    if (!textDream.trim()) return;
    const dream = await createTextDream(textDream, textTitle);
    if (dream) onComplete?.(dream);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center">
        <Button variant={mode === 'video' ? 'primary' : 'secondary'} onClick={() => setMode('video')}>Record Video</Button>
        <Button variant={mode === 'text' ? 'primary' : 'secondary'} onClick={() => setMode('text')}>Type Dream</Button>
      </div>

      {mode === 'video' ? (
        <div className="space-y-4">
          <div className="relative aspect-video bg-dark-surface rounded-xl overflow-hidden border border-dark-border">
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {formatDuration(duration)}
              </div>
            )}
            {!stream && !isRecording && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <p>Click "Start Camera" to begin</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-3">
            {!stream && !isRecording && (
              <Button onClick={startStream}>Start Camera</Button>
            )}
            {stream && !isRecording && (
              <Button onClick={startRecording} className="bg-red-600 hover:bg-red-700">Start Recording</Button>
            )}
            {isRecording && (
              <Button onClick={stopRecording} variant="danger">Stop Recording</Button>
            )}
          </div>

          {isUploading && <p className="text-center text-primary animate-pulse">Uploading and transcribing your dream...</p>}
          {(error || uploadError) && <p className="text-center text-red-400">{error || uploadError}</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            value={textTitle}
            onChange={(e) => setTextTitle(e.target.value)}
            placeholder="Dream title (optional)"
            className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            value={textDream}
            onChange={(e) => setTextDream(e.target.value)}
            placeholder="Describe your dream in as much detail as you can remember..."
            rows={8}
            className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <Button onClick={handleTextSubmit} disabled={!textDream.trim() || isUploading} className="w-full">
            {isUploading ? 'Saving...' : 'Continue to Questions'}
          </Button>
          {uploadError && <p className="text-center text-red-400">{uploadError}</p>}
        </div>
      )}
    </div>
  );
}
