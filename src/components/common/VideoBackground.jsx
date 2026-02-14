import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";

// Registre global : garantit qu'une seule <video> est unmuted sur tout le DOM
const videoRegistry = new Set();

const VideoBackground = forwardRef(({ videoSrc, className = "", isMuted = true, playOnHover = false }, ref) => {
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
    requestFullscreen: () => {
      const video = videoRef.current;
      if (!video) return;
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    },
  }));

  // Enregistrement / désenregistrement dans le registre global
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      videoRegistry.add(video);
    }
    return () => {
      if (video) {
        videoRegistry.delete(video);
        // Nettoyage complet au démontage : stop audio + pause
        video.muted = true;
        video.pause();
      }
    };
  }, []);

  // Quand la source change, reset propre
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsPlaying(false);

    return () => {
      video.muted = true;
    };
  }, [videoSrc]);

  // Synchronisation mute/unmute avec garantie d'exclusivité globale
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isMuted) {
      // NUCLEAR : mute TOUTES les autres vidéos du registre d'abord
      videoRegistry.forEach((v) => {
        if (v !== video) {
          v.muted = true;
        }
      });
      // Puis unmute celle-ci
      video.muted = false;
    } else {
      video.muted = true;
    }
  }, [isMuted]);

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
        autoPlay={!playOnHover}
        loop
        playsInline={true}
        muted={isMuted}
        preload={playOnHover ? "metadata" : "auto"}
        onPlaying={handlePlaying}
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover transition-opacity duration-700 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
});

VideoBackground.displayName = "VideoBackground";

export default VideoBackground;
