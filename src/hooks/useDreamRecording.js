import { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { dreamService } from '../services/dream.service';
import { DreamContext } from '../context/DreamContext';

export function useDreamRecording() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { setCurrentDream, setRecordingStep } = useContext(DreamContext);
  const navigate = useNavigate();

  const uploadRecording = useCallback(async (blob) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('media', blob, 'dream-recording.webm');
      const res = await dreamService.upload(formData);
      setCurrentDream(res.data);
      setRecordingStep('review');
      return res.data;
    } catch (err) {
      setUploadError(err.response?.data?.error || 'Upload failed');
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [setCurrentDream, setRecordingStep]);

  const createTextDream = useCallback(async (transcript, title, mood) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const res = await dreamService.create({ transcript, title, mood });
      setCurrentDream(res.data.dream);
      setRecordingStep('context');
      return res.data.dream;
    } catch (err) {
      setUploadError(err.response?.data?.error || 'Failed to create dream');
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [setCurrentDream, setRecordingStep]);

  return {
    isUploading,
    uploadError,
    uploadRecording,
    createTextDream,
  };
}
