import { useRef, useState, useEffect } from "react";

interface VideoUploadBoxProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
}

export function VideoUploadBox({ value, onChange }: VideoUploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert("حجم فایل نباید بیشتر از ۵۰ مگابایت باشد.");
        return;
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onChange?.(file);
    }
  };


  const startCamera = async () => {
    try {
      setCameraError(null);
      setIsRecordingModalOpen(true); 
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
    } catch (err) {
      setCameraError("دسترسی به دوربین امکان‌پذیر نیست. لطفاً دسترسی‌ها را بررسی کنید.");
      setIsRecordingModalOpen(true);
    }
  };

  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream, isRecordingModalOpen]);

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setIsRecordingModalOpen(false);
  };

  const startRecording = () => {
    if (!mediaStream) return;
    setRecordedChunks([]);
    const recorder = new MediaRecorder(mediaStream);
    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const file = new File([blob], "recorded-video.webm", { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      
      setPreviewUrl(url);
      onChange?.(file);
      stopCamera();
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaStream]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className={`relative flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-colors ${
        value ? "border-border-decorative bg-surface-card" : "border-dashed border-border-decorative bg-surface-card"
      }`}>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="video/mp4,video/x-m4v,video/*"
          onChange={handleFileChange}
        />

        {value && previewUrl ? (
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex items-center gap-4 w-full justify-center">
              <div className="w-32 h-24 rounded-md overflow-hidden border border-border-decorative bg-black relative flex-shrink-0">
                <video src={previewUrl} className="w-full h-full object-cover" controls />
              </div>
              
              <div className="flex flex-col text-right">
                <span className="text-label text-text-primary font-medium truncate max-w-[200px]">
                  {value.name}
                </span>
                <span className="text-caption text-text-secondary">
                  {(value.size / (1024 * 1024)).toFixed(1)} مگابایت
                </span>
                <span className="text-caption text-status-success flex items-center gap-1 mt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  بارگذاری شد. در انتظار بررسی هویت
                </span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-md border border-border-decorative px-8 py-2 text-label text-text-primary hover:bg-surface-hover transition-colors"
            >
              جایگزین ویدیو
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="text-text-secondary bg-surface-hover p-3 rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
            </div>
            <div className="text-center">
              <p className="text-label text-text-primary font-medium">ضبط کن یا فایل ویدیو را اینجا بینداز</p>
              <p className="text-caption text-text-secondary mt-1">فرمت مجاز: MP4 یا MOV - بین ۵ تا ۲۰ ثانیه - حداکثر ۵۰ مگابایت</p>
            </div>
            
            <div className="flex gap-2 w-full mt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 rounded-md border border-action-primary text-action-primary py-2 text-label font-medium hover:bg-surface-hover transition-colors"
              >
                آپلود فایل ویدیو
              </button>
              <button
                type="button"
                onClick={startCamera}
                className="flex-1 rounded-md bg-action-primary text-white py-2 text-label font-medium hover:bg-action-hover transition-colors"
              >
                ضبط با دوربین
              </button>
            </div>
          </div>
        )}
      </div>

      {isRecordingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-card rounded-xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-border-decorative pb-3">
              <h3 className="text-card-title font-bold text-text-primary">ضبط ویدیو</h3>
              <button onClick={stopCamera} className="text-text-secondary hover:text-status-error">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {cameraError ? (
              <div className="bg-surface-error text-status-error p-4 rounded-md text-label text-center">
                {cameraError}
              </div>
            ) : (
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover mirror" 
                  style={{ transform: "scaleX(-1)" }} // آینه‌ای کردن برای راحتی کاربر
                />
                {isRecording && (
                  <div className="absolute top-4 right-4 bg-status-error text-white px-3 py-1 rounded-full text-caption animate-pulse flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    در حال ضبط...
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-center gap-4 mt-2">
              {!cameraError && (
                !isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="rounded-full bg-status-error text-white px-8 py-3 text-label font-bold shadow-lg hover:bg-error-hover transition-colors flex items-center gap-2"
                  >
                    <div className="w-3 h-3 bg-white rounded-full" />
                    شروع ضبط
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="rounded-full bg-text-primary text-white px-8 py-3 text-label font-bold shadow-lg hover:bg-black transition-colors flex items-center gap-2"
                  >
                    <div className="w-3 h-3 bg-white rounded-sm" />
                    توقف و ذخیره
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}