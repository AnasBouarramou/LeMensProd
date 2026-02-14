import { useState, useRef, useEffect, useCallback } from "react";

// Registre global : garantit qu'une seule <video> est unmuted sur tout le DOM
const videoRegistry = new Set();

const VideoBackground = ({ videoSrc, className = "", isMuted = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

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

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none bg-black ${className}`}
      style={{ willChange: "transform" }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        playsInline
        muted={isMuted}
        preload="metadata"
        onPlaying={handlePlaying}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover transition-opacity duration-700 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default VideoBackground;
