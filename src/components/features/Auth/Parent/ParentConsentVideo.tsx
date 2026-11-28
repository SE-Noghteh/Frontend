import {
  Camera,
  CircleStop,
  Play,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/Button";

interface ParentConsentVideoProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

const MAX_SECONDS = 20;

export function ParentConsentVideo({
  file,
  onChange,
  error,
}: ParentConsentVideoProps) {
  const inputId = useId();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef =
    useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [cameraError, setCameraError] =
    useState<string | null>(null);
  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) =>
      track.stop(),
    );
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOpen(false);
  };

  useEffect(() => {
    return () => stopStream();
  }, []);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!recording) return;

    const timer = window.setInterval(() => {
      setSeconds((current) => {
        const next = current + 1;

        if (next >= MAX_SECONDS) {
          recorderRef.current?.stop();
        }

        return Math.min(next, MAX_SECONDS);
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [recording]);

  const openCamera = async () => {
    setCameraError(null);

    if (
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setCameraError(
        "مرورگر این دستگاه ضبط ویدئو را پشتیبانی نمی‌کند؛ فایل ویدئو را بارگذاری کن.",
      );
      return;
    }

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      streamRef.current = stream;
      setCameraOpen(true);

      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      });
    } catch {
      setCameraError(
        "دسترسی دوربین یا میکروفن داده نشد.",
      );
    }
  };

  const startRecording = () => {
    const stream = streamRef.current;
    if (!stream) return;

    chunksRef.current = [];
    setSeconds(0);

    const recorder = new MediaRecorder(stream, {
      mimeType: MediaRecorder.isTypeSupported(
        "video/webm",
      )
        ? "video/webm"
        : undefined,
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const type =
        recorder.mimeType || "video/webm";

      const blob = new Blob(chunksRef.current, {
        type,
      });

      const recordedFile = new File(
        [blob],
        `parent-consent-${Date.now()}.webm`,
        { type },
      );

      onChange(recordedFile);
      setRecording(false);
      stopStream();
    };

    recorderRef.current = recorder;
    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    const recorder = recorderRef.current;
    if (recorder?.state === "recording") {
      recorder.stop();
    }
  };

  if (file && previewUrl) {
    return (
      <div className="space-y-2">
        <div>
          <p className="text-label font-medium text-text-primary">
            ویدئوی رضایت والد{" "}
            <span className="text-error">*</span>
          </p>
          <p className="mt-1 text-caption text-text-secondary">
            ویدئو باید بین ۱ تا ۲۰ ثانیه و حداکثر ۵۰
            مگابایت باشد.
          </p>
        </div>

        <div
          className={`overflow-hidden rounded-xl border ${
            error
              ? "border-error"
              : "border-ocean-7"
          }`}
        >
          <video
            src={previewUrl}
            controls
            className="aspect-video w-full bg-ocean-1 object-contain"
          />

          <div className="flex items-center justify-between gap-3 bg-white p-3">
            <div className="min-w-0">
              <p
                dir="ltr"
                className="truncate text-start text-caption font-bold text-text-primary"
              >
                {file.name}
              </p>
              <p className="text-caption text-text-secondary">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <Button
              type="button"
              size="icon"
              variant="text"
              color="error"
              aria-label="حذف ویدئو"
              onClick={() => onChange(null)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>

        {error ? (
          <p className="text-caption text-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div>
        <p className="text-label font-medium text-text-primary">
          ویدئوی رضایت والد{" "}
          <span className="text-error">*</span>
        </p>
        <p className="mt-1 text-caption leading-6 text-text-secondary">
          ۱ تا ۲۰ ثانیه؛ MP4/MOV/WebM تا ۵۰ مگابایت.
        </p>
      </div>

      {cameraOpen ? (
        <div className="overflow-hidden rounded-xl border border-ocean-7 bg-ocean-1">
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full -scale-x-100 object-cover"
            />

            {recording ? (
              <span className="absolute end-3 top-3 rounded-full bg-error px-3 py-1 text-caption font-bold text-white">
                در حال ضبط · {seconds} ثانیه
              </span>
            ) : null}
          </div>

          <div className="flex justify-center gap-2 bg-white p-3">
            {recording ? (
              <Button
                type="button"
                color="error"
                startIcon={<CircleStop size={17} />}
                onClick={stopRecording}
              >
                توقف و ذخیره
              </Button>
            ) : (
              <Button
                type="button"
                startIcon={<Camera size={17} />}
                onClick={startRecording}
              >
                شروع ضبط
              </Button>
            )}

            {!recording ? (
              <Button
                type="button"
                variant="secondary"
                onClick={stopStream}
              >
                بستن دوربین
              </Button>
            ) : null}
          </div>
        </div>
      ) : (
        <div
          className={`grid gap-2 rounded-xl border border-dashed p-4 sm:grid-cols-2 ${
            error
              ? "border-error bg-error-soft/30"
              : "border-ocean-blue"
          }`}
        >
          <label
            htmlFor={inputId}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-info-soft px-3 py-3 text-label font-bold text-action-primary transition hover:bg-ocean-8"
          >
            <Upload size={18} aria-hidden="true" />
            بارگذاری ویدئو
          </label>

          <button
            type="button"
            onClick={openCamera}
            className="flex items-center justify-center gap-2 rounded-lg border border-ocean-7 bg-white px-3 py-3 text-label font-bold text-action-primary transition hover:bg-info-soft"
          >
            <Video size={18} aria-hidden="true" />
            ضبط با دوربین
          </button>
        </div>
      )}

      <input
        id={inputId}
        hidden
        type="file"
        accept="video/mp4,video/quicktime,video/webm"
        onChange={(event) =>
          onChange(event.target.files?.[0] ?? null)
        }
      />

      {cameraError ? (
        <p className="text-caption text-error">
          {cameraError}
        </p>
      ) : null}

      {error ? (
        <p className="text-caption text-error">{error}</p>
      ) : null}
    </div>
  );
}
