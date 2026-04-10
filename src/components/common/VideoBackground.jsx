import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";

const VideoBackground = forwardRef(({ videoSrc, videoSrcMobile, poster, posterMobile, className = "", playOnHover = false, eager = false, rootMargin = "200px" }, ref) => {
  const isMobile = window.innerWidth < 768;
  const activePoster = posterMobile && isMobile ? posterMobile : poster;
  const activeVideoSrc = videoSrcMobile && isMobile ? videoSrcMobile : videoSrc;
  const [isPlaying, setIsPlaying] = useState(false);
  const [srcLoaded, setSrcLoaded] = useState(false);
  const videoRef = useRef(null);
  const divRef = useRef(null);

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

  // Lazy loading : charge le src uniquement quand l'élément est proche du viewport
  useEffect(() => {
    if (!videoSrc) return;

    if (eager) {
      setSrcLoaded(true);
      return;
    }

    const el = divRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrcLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [videoSrc, eager, rootMargin]);

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
      ref={divRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none bg-neutral-900 ${className}`}
      style={{
        willChange: "transform",
        ...(activePoster ? { backgroundImage: `url(${activePoster})`, backgroundSize: "cover", backgroundPosition: "center" } : {}),
      }}
    >
      <video
        ref={videoRef}
        src={srcLoaded ? activeVideoSrc : undefined}
        poster={activePoster}
        autoPlay={srcLoaded && !playOnHover}
        loop
        playsInline={true}
        muted
        preload={srcLoaded ? (playOnHover ? "metadata" : "auto") : "none"}
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
