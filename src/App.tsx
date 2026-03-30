/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Trophy, Gamepad2, Music as MusicIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden font-mono">
      {/* Glitch Effects */}
      <div className="static-noise" />
      <div className="scanline" />
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/5 blur-[120px] rounded-full" />
      
      <header className="mb-12 text-center z-10">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center gap-3 mb-2"
        >
          <Gamepad2 className="text-neon-green animate-pulse" size={24} />
          <h1 
            className="text-6xl font-black tracking-tighter text-white italic uppercase glitch-text"
            data-text="NEON SNAKE"
          >
            Neon Snake
          </h1>
          <MusicIcon className="text-neon-pink animate-pulse" size={24} />
        </motion.div>
        <p className="text-neon-blue/40 tracking-[0.5em] text-[10px] uppercase font-bold">
          [ ERROR: SYSTEM_OVERRIDE_ACTIVE ]
        </p>
      </header>

      <main className="relative z-10 w-full max-w-6xl">
        <div className="absolute -inset-8 border-2 border-dashed border-neon-blue/20 pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Game Section */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-12 w-full justify-between px-6 py-2 border-l-2 border-neon-green bg-neon-green/5">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-neon-green/60 font-bold">Data_Stream_Score</span>
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-neon-green" />
                  <span className="text-4xl font-bold neon-text-green tabular-nums">{score.toString().padStart(4, '0')}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Record_Node</span>
                <span className="text-2xl text-white/40 tabular-nums">0850</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-neon-blue/20 blur-sm animate-pulse" />
              <SnakeGame onScoreChange={setScore} />
            </div>
            
            <div className="flex gap-6 text-[9px] text-neon-blue/40 uppercase tracking-[0.3em] font-bold">
              <span className="hover:text-neon-blue transition-colors cursor-default">DIR_INPUT: ARROWS</span>
              <span>|</span>
              <span className="hover:text-neon-blue transition-colors cursor-default">INT_BREAK: SPACE</span>
            </div>
          </div>

          {/* Music Section */}
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-neon-pink/20 blur-sm animate-pulse" />
              <MusicPlayer />
            </div>
            
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="p-5 rounded-none border-t border-l border-white/10 bg-white/5 backdrop-blur-sm">
                <h4 className="text-[9px] uppercase tracking-widest text-neon-blue/60 mb-3 font-bold">Signal_Visualizer</h4>
                <div className="flex items-end gap-1.5 h-10">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 32, 8, 24, 4] }}
                      transition={{ 
                        duration: 0.4 + Math.random() * 0.4, 
                        repeat: Infinity,
                        delay: i * 0.05
                      }}
                      className="w-1 bg-neon-blue/80 shadow-[0_0_8px_rgba(0,255,255,0.5)]"
                    />
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-none border-t border-r border-white/10 bg-white/5 backdrop-blur-sm">
                <h4 className="text-[9px] uppercase tracking-widest text-neon-green/60 mb-3 font-bold">Core_Status</h4>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-neon-green shadow-[0_0_5px_#39ff14]" />
                    <span className="text-[10px] text-neon-green font-bold">ENCRYPTED_LINK_STABLE</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <div className="w-1.5 h-1.5 bg-neon-pink" />
                    <span className="text-[10px] text-neon-pink font-bold">BUFFER_OVERFLOW_NULL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 text-white/10 text-[9px] uppercase tracking-[0.8em] z-10 font-bold">
        [ TERMINAL_ID: 0x7F9E2A ] [ SESSION_EXPIRES: 00:00:00 ]
      </footer>
    </div>
  );
}
