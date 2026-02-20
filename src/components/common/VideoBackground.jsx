import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";

const VideoBackground = forwardRef(({ videoSrc, poster, className = "", playOnHover = false }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Expose play/pause/fullscreen au parent via ref
  useImperativeHandle(ref, () => ({
    play: () => {
      const video = videoRef.current;
      if (!video) return;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    },
    pause: () => {
      const video = videoRef.current;
      if (!video) return;
      video.pause();
    },
  }));

  // Quand la source change, reset propre
  useEffect(() => {
    setIsPlaying(false);
  }, [videoSrc]);

  const handlePlaying = useCallback(() => {
    setIsPlaying(true);
  }, []);

  // Force la première frame sur iOS/Safari quand playOnHover est actif
  const handleLoadedMetadata = useCallback(() => {
    if (playOnHover && videoRef.current) {
      try {
        videoRef.current.currentTime = 0.1;
      } catch (_) {}
    }
  }, [playOnHover]);

  // Rend visible dès que la frame est peinte (pour playOnHover)
  const handleSeeked = useCallback(() => {
    if (playOnHover) {
      setIsPlaying(true);
    }
  }, [playOnHover]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none bg-neutral-900 ${className}`}
      style={{ willChange: "transform" }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        autoPlay={!playOnHover}
        loop
        playsInline={true}
        muted
        preload={playOnHover ? "metadata" : "auto"}
        onPlaying={handlePlaying}
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover transition-opacity duration-700 [&:fullscreen]:!object-contain [&:-webkit-full-screen]:!object-contain [&:fullscreen]:!w-full [&:-webkit-full-screen]:!w-full [&:fullscreen]:!h-full [&:-webkit-full-screen]:!h-full [&:fullscreen]:!bg-black [&:-webkit-full-screen]:!bg-black [&:fullscreen]:!static [&:-webkit-full-screen]:!static [&:fullscreen]:!translate-x-0 [&:-webkit-full-screen]:!translate-x-0 [&:fullscreen]:!translate-y-0 [&:-webkit-full-screen]:!translate-y-0 [&:fullscreen]:!min-w-0 [&:-webkit-full-screen]:!min-w-0 [&:fullscreen]:!min-h-0 [&:-webkit-full-screen]:!min-h-0 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
});

VideoBackground.displayName = "VideoBackground";

export default VideoBackground;
