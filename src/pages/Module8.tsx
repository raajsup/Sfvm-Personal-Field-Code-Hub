import React, { useState } from 'react';
import { useSFVM } from '../context/SFVMContext';
import { Music, Play, Pause, Volume2 } from 'lucide-react';

export const Module8 = () => {
  const { profile } = useSFVM();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!profile) return null;

  const masterFrequencies: Record<number, number> = {
    11: 1111, 22: 2222, 33: 3333, 44: 4444, 55: 5555, 66: 6666, 77: 7777, 88: 8888, 99: 9999
  };

  const frequencies = profile.digits.map(d => {
    if (masterFrequencies[d]) return masterFrequencies[d];
    return 432 + (d * 9);
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Sound Healing Studio</h1>
        <p className="text-slate-400">432Hz variations adapted to exact field code resonance.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 space-y-6">
          <h3 className="text-amber-500 font-bold uppercase tracking-wider flex items-center gap-2 border-b border-amber-500/20 pb-4">
            <Music size={18} />
            Your Resonance Frequencies
          </h3>
          
          <div className="space-y-4">
            {frequencies.map((freq, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">Layer {i + 1}</p>
                    <p className="text-xs text-slate-500 uppercase">SFVM Digit: {profile.digits[i]}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <p className="font-mono text-amber-400 text-xl">{freq} Hz</p>
                  <button className="p-2 bg-amber-500/20 text-amber-400 rounded-full hover:bg-amber-500/30">
                    <Play size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-amber-500 uppercase tracking-widest text-sm font-bold">Master Mix</h3>
            <div className={`w-48 h-48 rounded-full border-4 border-amber-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.2)] transition-all duration-1000 ${isPlaying ? 'scale-105 shadow-[0_0_80px_rgba(245,158,11,0.4)]' : ''}`}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-24 h-24 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                {isPlaying ? <Pause size={40} /> : <Play size={40} className="ml-2" />}
              </button>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="flex items-center gap-4">
              <Volume2 size={20} className="text-slate-400" />
              <input type="range" className="w-full accent-amber-500" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-500 uppercase">Binaural Beat</p>
                <p className="text-amber-400 font-mono">Theta (6Hz)</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-500 uppercase">Base</p>
                <p className="text-amber-400 font-mono">432 Hz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
