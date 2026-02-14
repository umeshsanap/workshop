
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Image as ImageIcon, Video, ChevronLeft, ChevronRight, Film, Loader2, AlertCircle } from 'lucide-react';
import heic2any from 'heic2any';

type MediaEntry = {
  id: string;
  src: string;
  type: 'video' | 'image';
  title: string;
};

// Images and videos from public/media/. Place files in public/media/ folder.
const MEDIA_ITEMS: MediaEntry[] = [
  { id: '0', src: '/media/image-01.heic', type: 'image', title: 'Our Students' },
  { id: '1', src: '/media/video-01.mp4', type: 'video', title: 'Video 01' },
  { id: '2', src: '/media/video-02.mp4', type: 'video', title: 'Video 02' },
  { id: '3', src: '/media/video-03.mp4', type: 'video', title: 'Video 03' },
  { id: '4', src: '/media/video-04.mp4', type: 'video', title: 'Video 04' },
];

const isHeicOrHeif = (src: string) => /\.(heic|heif)$/i.test(src);

export const MediaPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const item = MEDIA_ITEMS[currentIndex];
  const total = MEDIA_ITEMS.length;

  const convertedUrlRef = useRef<string | null>(null);

  // Convert HEIC/HEIF to JPEG so all browsers can display it (used for fallback when native img fails)
  const loadAndConvertImage = useCallback(async (src: string) => {
    setImageError(false);
    setImageLoading(true);
    setConvertedImageUrl(null);
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error('Fetch failed');
      const blob = await res.blob();
      if (!blob.type || (!blob.type.includes('heic') && !blob.type.includes('heif'))) {
        const url = URL.createObjectURL(blob);
        if (convertedUrlRef.current) URL.revokeObjectURL(convertedUrlRef.current);
        convertedUrlRef.current = url;
        setConvertedImageUrl(url);
        setImageLoading(false);
        return;
      }
      const converted = await heic2any({ blob, toType: 'image/jpeg', quality: 0.9 });
      const resultBlob = Array.isArray(converted) ? converted[0] : converted;
      const url = URL.createObjectURL(resultBlob);
      if (convertedUrlRef.current) URL.revokeObjectURL(convertedUrlRef.current);
      convertedUrlRef.current = url;
      setConvertedImageUrl(url);
    } catch {
      setImageError(true);
    } finally {
      setImageLoading(false);
    }
  }, []);

  // When switching to an image, convert if HEIC/HEIF or use normal src
  useEffect(() => {
    if (item.type !== 'image') {
      if (convertedUrlRef.current) {
        URL.revokeObjectURL(convertedUrlRef.current);
        convertedUrlRef.current = null;
      }
      setConvertedImageUrl(null);
      setImageError(false);
      setImageLoading(false);
      return;
    }
    if (isHeicOrHeif(item.src)) {
      let cancelled = false;
      setImageError(false);
      setImageLoading(true);
      setConvertedImageUrl(null);
      (async () => {
        try {
          const res = await fetch(item.src);
          if (!res.ok) throw new Error('Fetch failed');
          const blob = await res.blob();
          if (cancelled) return;
          const converted = await heic2any({ blob, toType: 'image/jpeg', quality: 0.9 });
          const resultBlob = Array.isArray(converted) ? converted[0] : converted;
          const url = URL.createObjectURL(resultBlob);
          if (cancelled) {
            URL.revokeObjectURL(url);
            return;
          }
          if (convertedUrlRef.current) URL.revokeObjectURL(convertedUrlRef.current);
          convertedUrlRef.current = url;
          setConvertedImageUrl(url);
        } catch {
          if (!cancelled) setImageError(true);
        } finally {
          if (!cancelled) setImageLoading(false);
        }
      })();
      return () => {
        cancelled = true;
        if (convertedUrlRef.current) {
          URL.revokeObjectURL(convertedUrlRef.current);
          convertedUrlRef.current = null;
        }
      };
    }
    setConvertedImageUrl(null);
    setImageError(false);
    setImageLoading(false);
  }, [currentIndex, item.id, item.src, item.type]);

  // For non-HEIC images: try native display first; on error, try convert
  const handleImageError = useCallback(() => {
    if (imageLoading) return;
    setImageLoading(true);
    loadAndConvertImage(item.src).catch(() => setImageError(true));
  }, [item.src, loadAndConvertImage, imageLoading]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i === total - 1 ? 0 : i + 1));
  }, [total]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [goPrev, goNext]);

  // Reset video state when switching to a video
  useEffect(() => {
    if (item.type === 'video') {
      setVideoError(false);
      setVideoLoading(true);
    }
  }, [currentIndex, item.type]);

  if (MEDIA_ITEMS.length === 0) {
    return (
      <div className="max-w-5xl mx-auto relative z-10 min-h-[80vh] flex flex-col items-center justify-center">
        <p className="text-slate-500">Add media files to public/media/ and list them in MEDIA_ITEMS.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto relative z-10 min-h-[80vh] flex flex-col">
      <div className="text-center mb-6">
        <div
          className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
          style={{ background: 'rgba(245, 166, 35, 0.1)', border: '1px solid rgba(245, 166, 35, 0.3)', color: '#f5a623' }}
        >
          Gallery
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <span className="gradient-text">Images & Videos</span>
        </h2>
        <p className="text-slate-400 text-sm">One at a time — use arrows or dots to switch. HEIC images are converted to view in all browsers.</p>
      </div>

      <div className="flex-1 flex flex-col items-center gap-6">
        {/* Main viewer - larger for clear video playback */}
        <div
          className="w-full rounded-2xl overflow-hidden glass border border-[#00d4ff]/20 relative"
          style={{
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.2), 0 0 40px rgba(0, 212, 255, 0.1)',
            minHeight: '360px',
            aspectRatio: '16/10',
          }}
        >
          {item.type === 'video' ? (
            <>
              {videoLoading && !videoError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 z-10">
                  <Loader2 className="w-10 h-10 text-[#00d4ff] animate-spin" />
                  <span className="text-slate-400 text-sm">Loading video…</span>
                </div>
              )}
              {videoError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/90 z-10 p-6 text-center">
                  <AlertCircle className="w-12 h-12 text-amber-400" />
                  <p className="text-slate-300 font-medium">Video couldn’t load</p>
                  <p className="text-slate-500 text-sm max-w-sm">
                    Add <strong className="text-slate-400">video-01.mp4</strong>, <strong className="text-slate-400">video-02.mp4</strong>, <strong className="text-slate-400">video-03.mp4</strong>, <strong className="text-slate-400">video-04.mp4</strong> to <strong className="text-slate-400">public/media/</strong>. Use MP4 (H.264) for best compatibility.
                  </p>
                  <a
                    href={item.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00d4ff] text-sm hover:underline"
                  >
                    Open file link
                  </a>
                </div>
              )}
              <video
                ref={videoRef}
                key={item.id}
                src={item.src}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="w-full h-full object-contain bg-black"
                onCanPlay={() => setVideoLoading(false)}
                onError={() => setVideoError(true)}
                onLoadedData={() => setVideoLoading(false)}
              />
            </>
          ) : (
            <div className="w-full h-full bg-black flex items-center justify-center relative min-h-[320px]">
              {imageLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                  <Loader2 className="w-10 h-10 text-[#00d4ff] animate-spin" />
                  <span className="text-slate-400 text-sm">Converting image for display…</span>
                </div>
              )}
              {!imageLoading && (convertedImageUrl || !isHeicOrHeif(item.src)) && !imageError && (
                <>
                  <img
                    key={item.id}
                    src={convertedImageUrl || item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  {item.title === 'Our Students' && (
                    <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none">
                      <span
                        className="text-3xl md:text-4xl font-bold text-white tracking-wide"
                        style={{
                          fontFamily: 'Orbitron, sans-serif',
                          textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0, 212, 255, 0.3)',
                        }}
                      >
                        Our Students..
                      </span>
                    </div>
                  )}
                </>
              )}
              {!imageLoading && imageError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                  <ImageIcon className="w-12 h-12 text-[#00d4ff]/60" />
                  <p className="text-slate-400 text-sm">{item.title}</p>
                  <a href={item.src} download className="text-[#00d4ff] text-sm hover:underline">
                    Download original
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 w-full max-w-2xl">
          <button
            type="button"
            onClick={goPrev}
            className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-all hover:scale-105"
            style={{ background: 'rgba(0, 212, 255, 0.15)', border: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff' }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 flex items-center justify-center gap-2 flex-wrap">
            {MEDIA_ITEMS.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  i === currentIndex
                    ? 'bg-[#00d4ff]/25 text-[#00d4ff] border border-[#00d4ff]/50'
                    : 'bg-white/5 text-slate-400 border border-transparent hover:border-[#00d4ff]/30 hover:text-slate-300'
                }`}
              >
                {m.type === 'video' ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                <span className="hidden sm:inline">{i + 1}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-all hover:scale-105"
            style={{ background: 'rgba(0, 212, 255, 0.15)', border: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff' }}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Film className="w-4 h-4 text-[#f5a623]" />
          <span>{item.title}</span>
          <span className="text-slate-500">—</span>
          <span>{currentIndex + 1} / {total}</span>
        </div>
      </div>
    </div>
  );
};
