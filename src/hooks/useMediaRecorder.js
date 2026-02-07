import { useState, useRef, useCallback, useEffect } from 'react';

export function useMediaRecorder({ video = true, audio = true } = {}) {
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaBlob, setMediaBlob] = useState(null);
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState(0);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startStream = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video, audio });
      setStream(mediaStream);
      setError(null);
      return mediaStream;
    } catch (err) {
      setError('Could not access camera/microphone. Please check permissions.');
      return null;
    }
  }, [video, audio]);

  const startRecording = useCallback(async () => {
    let mediaStream = stream;
    if (!mediaStream) {
      mediaStream = await startStream();
      if (!mediaStream) return;
    }

    chunksRef.current = [];
    setMediaBlob(null);
    setDuration(0);

    const mimeType = video
      ? (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus' : 'video/webm')
      : 'audio/webm';

    const recorder = new MediaRecorder(mediaStream, { mimeType });
    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      setMediaBlob(blob);
      setIsRecording(false);
      clearInterval(timerRef.current);
    };

    recorder.start(1000);
    setIsRecording(true);
    timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
  }, [stream, startStream, video]);

  const stopRecording = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
  }, []);

  const cleanup = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setMediaBlob(null);
    setDuration(0);
    clearInterval(timerRef.current);
  }, [stream]);

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      clearInterval(timerRef.current);
    };
  }, [stream]);

  return {
    stream,
    isRecording,
    mediaBlob,
    error,
    duration,
    startStream,
    startRecording,
    stopRecording,
    cleanup,
  };
}
