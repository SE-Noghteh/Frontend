import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface VideoRecorderProps {
  onClose: () => void;
  onRecordingComplete: (file: File) => void;
}

export function VideoRecorder({ onClose, onRecordingComplete }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chunks = useRef<Blob[]>([]);

  // باز کردن دوربین موقع mount شدن
  useEffect(() => {
    let mediaStream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 }, 
          audio: true 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("دسترسی به دوربین امکان‌پذیر نیست. لطفاً مجوز دوربین را بررسی کنید.");
      }
    };
    
    startCamera();

    // پاکسازی وقتی کامپوننت unmount میشه
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (!stream) return;
    
    chunks.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.current.push(e.data);
    };
    
    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });
      const file = new File([blob], `recorded-video-${Date.now()}.webm`, { type: "video/webm" });
      onRecordingComplete(file);
      onClose();
    };
    
    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" dir="rtl">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 left-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">✕</button>
        <h2 className="text-label font-bold text-black mb-4 mt-2">ضبط ویدیو</h2>
        
        {error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <>
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  در حال ضبط...
                </div>
              )}
            </div>
            
            <div className="flex gap-3 justify-center mt-4">
              {!isRecording ? (
                <Button type="button" onClick={startRecording} className="bg-action-primary hover:bg-action-hover text-white px-8 py-2.5 rounded-lg font-bold">
                  شروع ضبط
                </Button>
              ) : (
                <Button type="button" onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white px-8 py-2.5 rounded-lg font-bold">
                  توقف و ذخیره
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}