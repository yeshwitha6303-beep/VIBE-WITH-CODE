import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "Neon Nights",
    artist: "SYNTHWAVE AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "var(--color-neon-blue)"
  },
  {
    id: 2,
    title: "Cyber City",
    artist: "Future Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "var(--color-neon-pink)"
  },
  {
    id: 3,
    title: "Glitch Dream",
    artist: "Digital Soul",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "var(--color-neon-green)"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-black/60 backdrop-blur-xl border border-neon-purple/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-neon-blue/20" />
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
      
      <div className="flex items-center gap-6 mb-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-neon-blue/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-2 border-neon-blue flex items-center justify-center bg-black relative z-10"
          >
            <Music className="w-10 h-10 text-neon-blue" />
          </motion.div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <h3 className="text-2xl font-black truncate neon-text-blue uppercase glitch-text" data-text={currentTrack.title.toUpperCase()}>
            {currentTrack.title}
          </h3>
          <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
            SRC: {currentTrack.artist}
          </p>
        </div>
      </div>

      <div className="relative w-full h-2 bg-white/5 mb-10 border border-white/10">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-neon-pink shadow-[0_0_15px_#ff00ff]"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-[pulse_2s_infinite]" />
      </div>

      <div className="flex items-center justify-between px-4">
        <button onClick={prevTrack} className="text-white/40 hover:text-neon-blue transition-colors p-2 border border-transparent hover:border-neon-blue/30">
          <SkipBack size={28} />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-20 h-20 bg-neon-blue text-black flex items-center justify-center hover:bg-white transition-all shadow-[6px_6px_0_#ff00ff] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
        </button>

        <button onClick={nextTrack} className="text-white/40 hover:text-neon-blue transition-colors p-2 border border-transparent hover:border-neon-blue/30">
          <SkipForward size={28} />
        </button>
      </div>

      <div className="mt-10 flex items-center gap-3 text-white/20 text-[9px] font-bold uppercase tracking-[0.4em] justify-center border-t border-white/5 pt-6">
        <Volume2 size={14} />
        <span>SIGNAL_TYPE: AI_GENERATED_BEATS</span>
      </div>
    </div>
  );
}
